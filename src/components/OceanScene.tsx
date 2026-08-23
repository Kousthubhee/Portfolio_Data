import { useEffect, useRef } from "react";
import * as THREE from "three";

const WAVE_VERT = /* glsl */ `
uniform float uTime;
varying float vElev;
varying float vDist;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorld;

float waveH(vec2 p) {
  float t = uTime;
  float e = 0.0;
  e += sin(p.x * 0.045 - t * 0.21) * 1.55;              // long ground swell
  e += sin(p.x * 0.11 + t * 0.55) * 1.05;
  e += sin(p.y * 0.14 - t * 0.42) * 0.85;
  e += sin((p.x + p.y) * 0.06 + t * 0.28) * 1.45;
  e += sin(p.x * 0.21 - p.y * 0.16 + t * 0.8) * 0.42;
  e += sin(p.y * 0.31 + p.x * 0.05 - t * 1.1) * 0.22;
  return e;
}

void main() {
  vec3 pos = position;
  vec2 p = pos.xz;
  float eps = 0.6;
  float h  = waveH(p);
  float hx = waveH(p + vec2(eps, 0.0));
  float hz = waveH(p + vec2(0.0, eps));
  vec3 n = normalize(vec3(h - hx, eps, h - hz));
  pos.y += h;
  vElev = h;
  vNormal = normalize(normalMatrix * n);
  vec4 w = modelMatrix * vec4(pos, 1.0);
  vWorld = w.xyz;
  vec4 mv = viewMatrix * w;
  vDist = -mv.z;
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const WAVE_FRAG = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uShallow;
uniform vec3 uFoam;
uniform vec3 uFog;
uniform vec3 uSunTint;
uniform vec3 uSunDir;
uniform float uTime;
varying float vElev;
varying float vDist;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorld;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  float up = smoothstep(-2.6, 2.4, vElev);
  vec3 col = mix(uDeep, uShallow, up);

  // warm sun glitter (specular)
  vec3 L = normalize(uSunDir);
  vec3 R = reflect(-V, N);
  float spec = pow(max(dot(R, L), 0.0), 46.0);
  col += uSunTint * spec * 0.9;

  // sun-path shimmer column on the water toward the sun
  float dev = vWorld.x + 0.0833 * vWorld.z;
  float band = exp(-dev * dev / 46.0);
  float farFade = smoothstep(2.0, 70.0, -vWorld.z);
  float sparkle = 0.55 + 0.45 * sin(vWorld.x * 2.9 + uTime * 2.3) * sin(vWorld.z * 2.3 - uTime * 1.7);
  col += uSunTint * band * farFade * sparkle * 0.6;

  // fresnel lightening toward horizon
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  col = mix(col, uFog, fres * 0.35);

  // foam on crests
  float foam = smoothstep(1.55, 2.5, vElev);
  col = mix(col, uFoam, foam * 0.85);

  // distance fog into warm haze
  float fogF = smoothstep(42.0, 150.0, vDist);
  col = mix(col, uFog, fogF);

  gl_FragColor = vec4(col, 1.0);
}
`;

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SKY_FRAG = /* glsl */ `
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uHorizon;
uniform vec3 uWarm;
uniform vec3 uSunDir;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(uHorizon, uMid, smoothstep(0.42, 0.62, h));
  col = mix(col, uTop, smoothstep(0.6, 0.95, h));
  float sun = pow(max(dot(d, normalize(uSunDir)), 0.0), 6.0);
  col += uWarm * sun * 0.6;
  gl_FragColor = vec4(col, 1.0);
}
`;

function makeGlowTexture(): THREE.Texture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,231,190,1)");
  g.addColorStop(0.25, "rgba(255,196,140,0.55)");
  g.addColorStop(0.6, "rgba(255,170,120,0.16)");
  g.addColorStop(1, "rgba(255,170,120,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

interface SceneHandles {
  dispose: () => void;
}

function buildScene(mount: HTMLElement, reduced: boolean): SceneHandles | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  } catch {
    mount.style.background =
      "linear-gradient(180deg,#a8ded4 0%,#dff0e6 38%,#ffd9b3 58%,#35b3a6 62%,#0f7d7c 100%)";
    return { dispose: () => undefined };
  }

  const W = () => mount.clientWidth || window.innerWidth;
  const H = () => mount.clientHeight || window.innerHeight;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.domElement.style.display = "block";
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xdcece2, 60, 165);

  const camera = new THREE.PerspectiveCamera(58, W() / H(), 0.1, 500);
  const CAM_START = new THREE.Vector3(30, 17, 50); // opening crane position
  const CAM_BASE = new THREE.Vector3(0, 3.6, 15.5);
  camera.position.copy(CAM_START);
  camera.lookAt(0, 2, -10);

  const sunDir = new THREE.Vector3(0.08, 0.16, -1).normalize();

  // ---- sky dome ----
  const skyGeo = new THREE.SphereGeometry(220, 32, 20);
  const skyMat = new THREE.ShaderMaterial({
    vertexShader: SKY_VERT,
    fragmentShader: SKY_FRAG,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color("#8fd0c6") },
      uMid: { value: new THREE.Color("#dff0e4") },
      uHorizon: { value: new THREE.Color("#ffd9b0") },
      uWarm: { value: new THREE.Color("#ffc193") },
      uSunDir: { value: sunDir.clone() },
    },
  });
  scene.add(new THREE.Mesh(skyGeo, skyMat));

  // ---- sun + layered glow ----
  const sunGeo = new THREE.CircleGeometry(8.5, 48);
  const sunMat = new THREE.MeshBasicMaterial({ color: "#ffe3b0", fog: false });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.set(12, 10.5, -140);
  sun.lookAt(camera.position);
  scene.add(sun);

  const glowTex = makeGlowTexture();
  const mkGlow = (scale: number, opacity: number) => {
    const m = new THREE.SpriteMaterial({
      map: glowTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity,
      fog: false,
    });
    const s = new THREE.Sprite(m);
    s.scale.set(scale, scale, 1);
    s.position.copy(sun.position);
    scene.add(s);
    return s;
  };
  const glowInner = mkGlow(70, 0.95);
  const glowOuter = mkGlow(150, 0.4);

  // ---- drifting clouds ----
  const clouds: { s: THREE.Sprite; speed: number }[] = [];
  const cloudDefs: [number, number, number, number, number][] = [
    [-70, 30, -110, 90, 0.16],
    [-18, 38, -150, 120, 0.13],
    [38, 27, -95, 70, 0.18],
    [85, 34, -130, 100, 0.12],
    [-105, 26, -80, 60, 0.17],
    [12, 44, -170, 150, 0.1],
    [62, 40, -160, 110, 0.11],
  ];
  cloudDefs.forEach(([x, y, z, sc, op]) => {
    const mat = new THREE.SpriteMaterial({
      map: glowTex,
      color: "#fff6ea",
      transparent: true,
      opacity: op,
      depthWrite: false,
      fog: true,
    });
    const s = new THREE.Sprite(mat);
    s.position.set(x, y, z);
    s.scale.set(sc * 2.1, sc * 0.62, 1);
    scene.add(s);
    clouds.push({ s, speed: 0.25 + Math.random() * 0.55 });
  });

  // ---- ocean ----
  const oceanGeo = new THREE.PlaneGeometry(360, 360, 150, 150);
  oceanGeo.rotateX(-Math.PI / 2);
  const oceanMat = new THREE.ShaderMaterial({
    vertexShader: WAVE_VERT,
    fragmentShader: WAVE_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#0b6b70") },
      uShallow: { value: new THREE.Color("#52c6b4") },
      uFoam: { value: new THREE.Color("#fff3e0") },
      uFog: { value: new THREE.Color("#dcece2") },
      uSunTint: { value: new THREE.Color("#ffd9a0") },
      uSunDir: { value: sunDir.clone() },
    },
  });
  scene.add(new THREE.Mesh(oceanGeo, oceanMat));

  // ---- glacier data shards ----
  const shardMat = (color: string, emissive: string) =>
    new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: 0.16,
      flatShading: true,
      roughness: 0.38,
      metalness: 0.08,
    });
  const shardDefs: [number, number, number, number, string, string][] = [
    [-26, 2.4, -26, 2.6, "#e8f7f1", "#0f7d7c"],
    [-14, 1.6, -12, 1.4, "#ffe9d8", "#ff7a68"],
    [16, 2.9, -30, 3.1, "#dff2ec", "#35b3a6"],
    [24, 1.8, -14, 1.7, "#fdf0d8", "#f2b544"],
    [6, 3.6, -44, 4.0, "#eefaf5", "#0f7d7c"],
    [-34, 3.2, -48, 3.4, "#e2f4ee", "#35b3a6"],
    [34, 2.6, -42, 2.8, "#ffe4d2", "#ff7a68"],
  ];
  const shards: { mesh: THREE.Mesh; baseY: number; phase: number; spin: number }[] = [];
  shardDefs.forEach(([x, y, z, s, c, e], i) => {
    const geo = i % 2 === 0 ? new THREE.OctahedronGeometry(s, 0) : new THREE.IcosahedronGeometry(s, 0);
    const mesh = new THREE.Mesh(geo, shardMat(c, e));
    mesh.position.set(x, y, z);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random());
    scene.add(mesh);
    shards.push({ mesh, baseY: y, phase: Math.random() * Math.PI * 2, spin: 0.12 + Math.random() * 0.2 });
  });

  // ---- plankton motes ----
  const COUNT = 280;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 130;
    positions[i * 3 + 1] = 0.4 + Math.random() * 15;
    positions[i * 3 + 2] = -85 + Math.random() * 100;
    speeds[i] = 0.12 + Math.random() * 0.4;
  }
  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const moteMat = new THREE.PointsMaterial({
    color: "#fff2dc",
    size: 0.32,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(moteGeo, moteMat));

  // ---- lights ----
  scene.add(new THREE.HemisphereLight("#fff1dc", "#0b6b70", 1.05));
  const key = new THREE.DirectionalLight("#ffd9a3", 1.35);
  key.position.set(8, 14, -30);
  scene.add(key);

  // ---- interaction state ----
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMouse = (e: MouseEvent) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  let scrollP = 0;
  const onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollP = Math.min(1, window.scrollY / max);
  };
  const onResize = () => {
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
    if (reduced) renderer.render(scene, camera);
  };
  window.addEventListener("mousemove", onMouse, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll();

  const clock = new THREE.Clock();
  const INTRO = 5.8; // seconds for the opening crane shot
  let raf = 0;
  let disposed = false;

  const animate = () => {
    if (disposed) return;
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    oceanMat.uniforms.uTime.value = t;

    mouse.x += (mouse.tx - mouse.x) * 0.045;
    mouse.y += (mouse.ty - mouse.y) * 0.045;

    // opening crane: sweep in from far/high, then hand over to scroll choreography
    const k = reduced ? 1 : 1 - Math.pow(1 - Math.min(1, t / INTRO), 4);

    const rise = scrollP * 11;
    const breatheY = Math.sin(t * 0.42) * 0.22 + Math.sin(t * 0.13) * 0.1;
    const breatheX = Math.sin(t * 0.31) * 0.18;

    const targetX = CAM_BASE.x + mouse.x * 1.5 + breatheX;
    const targetY = CAM_BASE.y + rise - mouse.y * 0.7 + breatheY;
    const targetZ = CAM_BASE.z - scrollP * 4;

    camera.position.set(
      CAM_START.x + (targetX - CAM_START.x) * k,
      CAM_START.y + (targetY - CAM_START.y) * k,
      CAM_START.z + (targetZ - CAM_START.z) * k
    );
    const lookY = 1.8 + rise * 0.55;
    camera.lookAt(0, lookY - (1 - k) * 1.5, -9 - scrollP * 10);

    // slow push-in on scroll: 58° → 52° → 45°
    camera.fov = 58 - 6 * k - 7 * scrollP * k;
    camera.updateProjectionMatrix();

    shards.forEach((s) => {
      s.mesh.position.y = s.baseY + Math.sin(t * 0.6 + s.phase) * 0.55;
      s.mesh.rotation.y += s.spin * 0.008;
      s.mesh.rotation.x += s.spin * 0.005;
    });

    clouds.forEach((c) => {
      c.s.position.x += c.speed * 0.016;
      if (c.s.position.x > 150) c.s.position.x = -150;
    });

    glowInner.material.opacity = 0.9 + Math.sin(t * 1.7) * 0.06;
    glowOuter.material.opacity = 0.36 + Math.sin(t * 1.1 + 1) * 0.05;

    const pos = moteGeo.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speeds[i] * 0.02;
      if (y > 16) y = 0.4;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
  };

  if (reduced) {
    oceanMat.uniforms.uTime.value = 3.2;
    camera.position.set(CAM_BASE.x, CAM_BASE.y + 6, CAM_BASE.z - 2);
    camera.fov = 50;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 3.5, -12);
    renderer.render(scene, camera);
  } else {
    animate();
  }

  return {
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
          else m.dispose();
        }
        if (obj instanceof THREE.Sprite) obj.material.dispose();
      });
      glowTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    },
  };
}

export default function OceanScene({ reduced }: { reduced: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const handles = buildScene(mount, reduced);
    return () => handles?.dispose();
  }, [reduced]);
  return <div ref={mountRef} aria-hidden className="fixed inset-0 z-0" />;
}
