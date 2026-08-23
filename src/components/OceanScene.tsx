import { useEffect, useRef } from "react";
import * as THREE from "three";

const WAVE_VERT = /* glsl */ `
uniform float uTime;
varying float vElev;
varying float vDist;
varying vec3 vNormal;
varying vec3 vViewDir;

float waveH(vec2 p) {
  float t = uTime;
  float e = 0.0;
  e += sin(p.x * 0.11 + t * 0.55) * 1.05;
  e += sin(p.y * 0.14 - t * 0.42) * 0.85;
  e += sin((p.x + p.y) * 0.06 + t * 0.28) * 1.35;
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
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
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
varying float vElev;
varying float vDist;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  float up = smoothstep(-2.4, 2.2, vElev);
  vec3 col = mix(uDeep, uShallow, up);

  // warm sun glitter
  vec3 L = normalize(uSunDir);
  vec3 R = reflect(-V, N);
  float spec = pow(max(dot(R, L), 0.0), 46.0);
  col += uSunTint * spec * 0.9;

  // soft fresnel lightening toward horizon
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  col = mix(col, uFog, fres * 0.35);

  // foam on crests
  float foam = smoothstep(1.25, 2.1, vElev);
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
  // warm bloom around the sun
  float sun = pow(max(dot(d, normalize(uSunDir)), 0.0), 6.0);
  col += uWarm * sun * 0.55;
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
  scene.fog = new THREE.Fog(0xd8ece4, 60, 160);

  const camera = new THREE.PerspectiveCamera(52, W() / H(), 0.1, 400);
  const CAM_BASE = new THREE.Vector3(0, 3.6, 15.5);
  camera.position.copy(CAM_BASE);
  camera.lookAt(0, 1.6, -8);

  const sunDir = new THREE.Vector3(0.08, 0.16, -1).normalize();

  // ---- sky dome ----
  const skyGeo = new THREE.SphereGeometry(180, 32, 20);
  const skyMat = new THREE.ShaderMaterial({
    vertexShader: SKY_VERT,
    fragmentShader: SKY_FRAG,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color("#8fd0c6") },
      uMid: { value: new THREE.Color("#dff0e4") },
      uHorizon: { value: new THREE.Color("#ffd9b0") },
      uWarm: { value: new THREE.Color("#ffbf8e") },
      uSunDir: { value: sunDir.clone() },
    },
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);

  // ---- sun + glow ----
  const sunGroup = new THREE.Group();
  const sunGeo = new THREE.CircleGeometry(8.5, 48);
  const sunMat = new THREE.MeshBasicMaterial({ color: "#ffe3b0", fog: false });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.set(10, 9.5, -120);
  sun.lookAt(camera.position);
  const glowTex = makeGlowTexture();
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.9,
    fog: false,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.scale.set(64, 64, 1);
  glow.position.copy(sun.position);
  sunGroup.add(sun, glow);
  scene.add(sunGroup);

  // ---- ocean ----
  const oceanGeo = new THREE.PlaneGeometry(340, 340, 150, 150);
  oceanGeo.rotateX(-Math.PI / 2);
  const oceanMat = new THREE.ShaderMaterial({
    vertexShader: WAVE_VERT,
    fragmentShader: WAVE_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#0b6b70") },
      uShallow: { value: new THREE.Color("#52c6b4") },
      uFoam: { value: new THREE.Color("#fff3e0") },
      uFog: { value: new THREE.Color("#d8ece4") },
      uSunTint: { value: new THREE.Color("#ffd9a0") },
      uSunDir: { value: sunDir.clone() },
    },
  });
  const ocean = new THREE.Mesh(oceanGeo, oceanMat);
  scene.add(ocean);

  // ---- glacier data shards ----
  const shardGroup = new THREE.Group();
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
    shardGroup.add(mesh);
    shards.push({ mesh, baseY: y, phase: Math.random() * Math.PI * 2, spin: 0.12 + Math.random() * 0.2 });
  });
  scene.add(shardGroup);

  // ---- plankton / light motes ----
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
  const motes = new THREE.Points(moteGeo, moteMat);
  scene.add(motes);

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
  let raf = 0;
  let disposed = false;

  const animate = () => {
    if (disposed) return;
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    oceanMat.uniforms.uTime.value = t;

    mouse.x += (mouse.tx - mouse.x) * 0.045;
    mouse.y += (mouse.ty - mouse.y) * 0.045;

    // cinematic scroll ascent: sea level → gull's-eye view
    const rise = scrollP * 11;
    camera.position.x = CAM_BASE.x + mouse.x * 1.5;
    camera.position.y = CAM_BASE.y + rise - mouse.y * 0.7 + Math.sin(t * 0.5) * 0.18;
    camera.position.z = CAM_BASE.z - scrollP * 4;
    camera.lookAt(0, 1.6 + rise * 0.55, -8 - scrollP * 10);

    shards.forEach((s) => {
      s.mesh.position.y = s.baseY + Math.sin(t * 0.6 + s.phase) * 0.55;
      s.mesh.rotation.y += s.spin * 0.008;
      s.mesh.rotation.x += s.spin * 0.005;
    });

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
