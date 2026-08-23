import OceanScene from "./components/OceanScene";
import { Nav, NoiseOverlay, SkillMarquee } from "./components/Chrome";
import Hero from "./sections/Hero";
import { About, Skills } from "./sections/About";
import { Expeditions, NumbersBand } from "./sections/Projects";
import { Contact, FieldNotes, Footer, Process } from "./sections/Closing";
import { usePrefersReducedMotion } from "./lib/hooks";

export default function App() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative min-h-screen font-body text-ink antialiased">
      {/* cinematic warm ocean — fixed behind everything */}
      <OceanScene reduced={reduced} />

      {/* depth veil: sea stays vivid up top, content gets readable below */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[88vh] bottom-0 z-[1] bg-gradient-to-b from-transparent via-mist/75 to-mist/95"
        aria-hidden
      />

      <NoiseOverlay />
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

      <Footer />
    </div>
  );
}
