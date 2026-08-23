import OceanScene from "./components/OceanScene";
import { Nav, NoiseOverlay, SkillMarquee } from "./components/Chrome";
import { CinemaChrome, FilmFlicker, SceneStamp, Sprockets, Vignette } from "./components/Cinematic";
import Hero from "./sections/Hero";
import { About, Skills } from "./sections/About";
import { Expeditions, NumbersBand } from "./sections/Projects";
import { Contact, FieldNotes, Footer, Process } from "./sections/Closing";
import { usePrefersReducedMotion } from "./lib/hooks";

export default function App() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative min-h-screen font-body text-ink antialiased">
      {/* the picture: warm sunlit ocean, crane shot + scroll choreography */}
      <OceanScene reduced={reduced} />

      {/* depth veil: sea stays vivid up top, content gets readable below */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[94vh] bottom-0 z-[1] bg-gradient-to-b from-transparent via-mist/72 to-mist/95"
        aria-hidden
      />

      {/* cinema chrome */}
      <FilmFlicker />
      <Vignette />
      <NoiseOverlay />
      <CinemaChrome />
      <SceneStamp />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <SkillMarquee />
        <About />
        <Skills />
        <Expeditions />
        <NumbersBand />
        <Process />
        <FieldNotes />
        <Contact />
      </main>

      <Sprockets />
      <Footer />
    </div>
  );
}
