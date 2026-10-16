# Cinematic Portfolio Website — Reusable Prompt

Use this prompt to build a cinematic, scroll-driven portfolio website for any profile.
Replace the placeholders at the bottom with the new profile's data.

---

## Tech Stack

- React + TypeScript
- Vite (build tool)
- Tailwind CSS v4 (styling)
- Three.js (cinematic background scene)
- Google Fonts (Bricolage Grotesque, Instrument Sans, IBM Plex Mono)
- @vercel/analytics (production tracking)

---

## Visual Direction

**Color palette — warm, inviting, not corporate:**
- Deep teal: #0f7d7c
- Aqua: #35b3a6
- Coral: #ff7a68
- Peach: #ffb489
- Gold: #f2b544
- Mist (light bg): #e9f5f0
- Shell (card bg): #f7fbf8
- Ink (text): #0d3b40
- Abyss (dark sections): #072327

**Typography:**
- Display: Bricolage Grotesque (bold, tight tracking)
- Body: Instrument Sans (clean, readable)
- Data/code: IBM Plex Mono (small caps, uppercase tracking)

**Cinematic elements:**
- Three.js ocean scene with warm sunlit sea, shader-driven waves, sun glitter path, drifting clouds, glacier shards, plankton motes
- Camera performs opening crane shot on load, then scroll-driven choreography (rise + FOV push-in)
- Vignette + film grain/flicker overlay
- Scene stamps that crossfade on scroll (SC.01 → SC.08)
- Optional letterbox bars that retract on scroll

**Reveal animations:**
- Scroll-triggered fade-up (IntersectionObserver, fire once)
- Line-mask headings (each line slides up from under a mask)
- Bar fills (width animates from 0 to target when visible)
- Count-up numbers (animate from 0 to target with easing)
- Respect `prefers-reduced-motion` everywhere

---

## Content Architecture (12 sections, in order)

### 1. Hero
- Opening credit line (e.g., "Kousthubhee Krishna Kotte")
- Large tracking-in title (two lines, second line in accent color)
- Intro paragraph with 2–3 highlighted phrases (colored underlines)
- Credits line: "starring X · Y · Z — from the enterprises of A & the classrooms of B — directed by curiosity"
- Two CTAs: primary (filled) + secondary (outlined)
- Coordinates/status line at the bottom

### 2. Skills Marquee
- Horizontal scrolling band of key technologies
- Dark background, tilted slightly, pauses on hover
- Wave separators between items

### 3. About / Journey
- Sticky "Route Card" on the left (boarding-pass style):
  - Location codes (e.g., HYD, FR, OPEN)
  - Years + notes per leg
  - Dashed perforation line
  - Languages with progress bars
- Right side: intro paragraph + 4–5 numbered chapter cards
  - Each card: org label, bold title, body paragraphs, optional highlight quote
  - Final chapter = "through-line" (adaptability / personal brand)

### 4. Career Timeline
- Vertical timeline with gradient line
- Nodes for each role + education
- Each node: period, place, title, org, description
- Final node = "What's Next?" with dashed border + blinking dot

### 5. Experience Logbook
- Split cards: dark rail (org/role/place/period) + bullet list + focus tags
- Wave pattern in the dark rail background
- Each bullet prefixed with a small wave SVG

### 6. Numbers Band
- Dark contrast section with wave-cut top/bottom edges
- 4 animated counters with large numbers
- Subtle background circles for depth

### 7. Projects
- 5 stacked sticky cards (stack as you scroll)
- Each card: generated artwork on one side, content on the other
- Content: field label, name, tagline, objective, approach points, KPI chips, outcome callout, stack tags, skills label
- Alternating layout (image left/right)

### 8. Skills Grid
- 8 skill groups in a 2-column grid
- Each group: custom SVG icon, name, chip list
- Hover: icon rotates, chips highlight
- Below: certifications grid with badge icons

### 9. Philosophy Quote Band
- Large pull quote (centered, display font)
- Underline decoration on key phrase
- Chain of values (Curiosity → Build → Learn → Improve) as pills
- Body paragraph explaining the philosophy

### 10. Next Chapter
- Target roles as chip list
- Merged "Open to" card: working model (Remote/Hybrid/On-site) + locations side by side
- Relocation note
- "Honest line" callout (border-left, coral) — candid statement about learning/adapting

### 11. Contact
- Availability panel (dark gradient, large heading, pillars)
- Channel links (email, LinkedIn, GitHub, WhatsApp) as cards with hover effects

### 12. Footer
- Film sprocket strip at top
- Name, headline, contact links, closing route line

---

## Technical Requirements

1. **All content in a single `src/lib/data.ts` file** with typed interfaces for every section
2. **Scroll reveal hook** — `useInView` using IntersectionObserver, fires once
3. **Count-up hook** — `useCountUp` with easing, respects reduced motion
4. **Reduced motion support** — all animations freeze, static fallbacks
5. **Responsive** — mobile-first, works from 320px up
6. **Export full dataset** as `public/data/website-content.json` (downloadable)
7. **Open Graph + Twitter card meta** in `index.html` for social sharing
8. **@vercel/analytics** installed and rendered in `main.tsx`
9. **Custom SVG icons** — no icon library, hand-drawn feel
10. **Three.js scene** — fixed behind everything, depth veil for readability

---

## Tone & Voice

- Professional but warm, never corporate
- Story-driven, not a resume dump
- Honest — include a candid line about skills/growth
- Cinematic language throughout (film credits, scene stamps, route card)
- Short sentences, active voice
- Highlight key phrases with colored underlines, not bold walls of text

---

## Placeholders to Fill

```
{{NAME}}                    — Full name
{{HEADLINE}}                — One-line role description
{{TAGLINE}}                 — Two-line title for hero
{{INTRO_PARAGRAPH}}         — 2–3 sentence career summary
{{CREDITS_LINE}}            — "starring X · Y — from A & B — directed by curiosity"
{{JOURNEY_CHAPTERS}}        — 4–5 numbered story beats
{{ROUTE_CARD}}              — Geographic journey with codes + years
{{LANGUAGES}}               — Name + level (Native/C2/C1/B2/A2)
{{TIMELINE}}                — Chronological career nodes
{{EDUCATION}}               — Schools + degrees + areas
{{EXPERIENCE}}              — Roles + bullets + focus tags
{{PROJECTS}}                — 5 projects with images, KPIs, stack
{{SKILLS}}                  — 8 groups of skills
{{CERTIFICATIONS}}          — Name + issuer + date
{{PHILOSOPHY_QUOTE}}        — One-liner + chain of values
{{TARGET_ROLES}}            — Job titles you're targeting
{{WORKING_MODELS}}          — Remote / Hybrid / On-site
{{LOCATIONS}}               — Geographic preferences
{{CONTACT}}                 — Email, LinkedIn, GitHub, WhatsApp
```

---

## Key Design Decisions

1. **Generated artwork for project cards** — not stock photos, not screenshots. Use AI image generation with consistent warm palette.
2. **Sticky cards stack as you scroll** through projects — creates a "deck of cards" feel.
3. **Route card shows geographic journey** with airport-style codes (HYD, FR, OPEN).
4. **Scene stamps update as you scroll** (SC.01 → SC.08) — reinforces the film metaphor.
5. **Numbers band uses dark background** for contrast against the light content.
6. **Honest line about learning/adapting** builds trust with recruiters.
7. **Merged "Open to" card** (working model + locations) reduces visual clutter.
8. **No "presents" in the opening credit** — just the name, clean.
9. **No letterbox bars with text** — they're visually noisy. Keep the film feel through scene stamps + vignette + grain instead.
10. **Export the full dataset as JSON** — useful for templates, ATS parsers, or rebuilding the site.

---

## Build Checklist

- [ ] Install: three, @types/three, @vercel/analytics
- [ ] Set up Tailwind v4 with custom theme (colors, fonts)
- [ ] Build Three.js ocean scene with crane shot + scroll choreography
- [ ] Create all 12 sections with reveal animations
- [ ] Add cinematic chrome (vignette, grain, scene stamps)
- [ ] Generate 5 project artworks with consistent palette
- [ ] Export data.ts content to public/data/website-content.json
- [ ] Add OG + Twitter meta tags to index.html
- [ ] Add @vercel/analytics to main.tsx
- [ ] Test on mobile (320px–428px)
- [ ] Test with prefers-reduced-motion enabled
- [ ] Deploy to Vercel, verify analytics

---

## Example Output Structure

```
src/
├── App.tsx                  — Main app, renders all sections
├── main.tsx                 — Entry point with Analytics
├── index.css                — Tailwind + custom animations
├── lib/
│   ├── data.ts              — All content (typed interfaces)
│   └── hooks.ts             — useInView, useCountUp, usePrefersReducedMotion
├── components/
│   ├── OceanScene.tsx       — Three.js background
│   ├── Chrome.tsx           — Nav, marquee, icons, section heading
│   └── Cinematic.tsx        — Scene stamps, vignette, flicker
└── sections/
    ├── Hero.tsx
    ├── About.tsx
    ├── Projects.tsx
    └── Closing.tsx          — Timeline, experience, next chapter, contact, footer

public/
└── data/
    └── website-content.json — Full dataset export
```

---

## Final Notes

- This prompt produces a **complete, production-ready portfolio** in one shot.
- The cinematic feel comes from the **combination** of elements (scene + stamps + grain + reveals), not any single piece.
- Keep the color palette warm — teal/coral/gold on mist/shell. Avoid dark themes.
- The honest line about learning/adapting is **critical** — it builds trust.
- Test the Three.js scene on low-end devices — add a reduced-motion fallback.
- The JSON export is a nice touch for recruiters who want to parse the data.

---

**That's it. Replace the placeholders, generate the artwork, and you have a cinematic portfolio.**
