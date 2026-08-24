import OceanScene from "./components/OceanScene";
import { Nav, NoiseOverlay, SkillMarquee } from "./components/Chrome";
import { SceneStamp, Vignette } from "./components/Cinematic";
import Hero from "./sections/Hero";
import { About, Skills } from "./sections/About";
import { NumbersBand, Projects } from "./sections/Projects";
import { Contact, Experience, Footer, Journey, NextChapter, QuoteBand } from "./sections/Closing";
import { usePrefersReducedMotion } from "./lib/hooks";
import FreeModelsRadar from "./components/FreeModelsRadar";

export default function App() {
  const reduced = usePrefersReducedMotion();
  const radar = new URLSearchParams(window.location.search).has("radar");
  if (radar) return <FreeModelsRadar reduced={reduced} />;
  return (
    <div className="relative min-h-screen font-body text-ink antialiased">
      {/* the ocean — one continuous shot behind everything */}
      <OceanScene reduced={reduced} />

      {/* depth veil: sea stays vivid up top, content readable below */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[88vh] bottom-0 z-[1] bg-gradient-to-b from-transparent via-mist/88 to-mist/[0.985]"
        aria-hidden
      />

      {/* cinematic chrome */}
      <Vignette />
      <NoiseOverlay />
      <SceneStamp />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <SkillMarquee />
        <About />
        <Journey />
        <Experience />
        <NumbersBand />
        <Projects />
        <Skills />
        <QuoteBand />
        <NextChapter />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
