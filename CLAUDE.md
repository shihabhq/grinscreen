@AGENTS.md

# Grinscreen Digital Website

Marketing agency website. Dark, media-forward, animated, fully responsive. Built with the existing Next.js 16 + React 19 + Tailwind v4 project in this repo. **No backend.**

---

## 0. Non-negotiable rules (read before writing any code)

1. **This is Next.js 16 not the version in your training data.** Before writing any Next-specific code (routing, metadata, `params`/`searchParams`, `next/image`, `next/font`, caching, config), read the relevant guide in `node_modules/next/dist/docs/`. Do not assume APIs from memory. Heed every deprecation notice.
2. **No backend, ever.** No API routes that hold secrets, no database, no server actions that need a runtime service. The contact form posts to a third-party form endpoint (see §8). Everything is static-exportable / Vercel-friendly.
3. **Every reel plays muted, always.** Videos must never emit sound while the user browses. `muted` is set on every `<video>` and is never removed programmatically. (A deliberate, optional user-triggered unmute control is allowed only if explicitly asked for later default is silent.)
4. **Bandwidth is the #1 performance concern.** 15 reels, ~94 MB total. Never let a video download until it's needed. `preload="none"` everywhere, lazy mount, play only when in view, pause when out. See §7 this is the most important section.
5. **Confirm before destructive or irreversible actions.** Don't delete assets, force-push, or rewrite git history. Renaming asset files (§6) is fine but do it with a script and keep it reversible.
6. Keep it **truthful**. Only claim what's given: services listed below, "reels that generate millions of views," and the real client logos in `/public/clients` (~29 brands). Do **not** invent revenue figures, fake testimonials, staff bios, or awards.

---

## 1. About the client

**Grinscreen Digital** a 360° digital marketing agency (Bangladesh-based; clients include Pathao and many Dhaka F&B/lifestyle brands). They handle the full spectrum of digital marketing and are especially known for short-form **reels that rack up millions of views.**

Services to feature:

- **Reel Making** short-form 9:16 video that goes viral
- **Static Design** scroll-stopping social creatives
- **Social Media Campaigns** end-to-end campaign strategy & execution
- **Ad Services** paid media / performance ads
- **Photoshoots** product, food & brand photography
- **360° Support** full-service brand management (positioning, content calendars, etc.)

Socials (use in nav/footer/contact):

- Facebook: https://www.facebook.com/GrinScreenDigital
- Instagram: https://www.instagram.com/grinscreen.digital/
- LinkedIn: https://www.linkedin.com/company/grinscreendigital/

Live URL target: `grinscreen.vercel.app` (Vercel).

---

## 2. Tech stack (already installed do not downgrade)

- **Next.js 16.2.9** (App Router, `src/app`, TypeScript)
- **React 19.2.4**
- **Tailwind CSS v4** CSS-first config via `@theme` in `src/app/globals.css`. **There is no `tailwind.config.js`** and you should not create one; define tokens in `@theme`.
- PostCSS via `@tailwindcss/postcss`
- ESLint (`eslint-config-next`)

**Add these (and only these) for animation/UX:**

- `motion` (Framer Motion; import from `motion/react`) scroll reveals, page transitions, hover states. Any component using it needs `"use client"`.
- `lenis` (smooth scroll; `lenis/react` → `ReactLenis`) gives the smooth, editorial scroll feel of the reference sites.
- `clsx` + `tailwind-merge` conditional classNames.
- `embla-carousel-react` lightweight, dependency-free, accessible carousel for the static-image sliders (§7b). (If you'd rather not add it, a `motion` drag-based carousel is an acceptable alternative but Embla is the default.)

Install: `npm i motion lenis clsx tailwind-merge embla-carousel-react`
Keep the dependency list lean. Do not add GSAP, a UI kit, a CMS, or a form library unless a task truly needs it.

---

## 3. Design direction

Dark, premium, "creative studio" aesthetic. Big media, generous whitespace, confident type, restrained motion. Think of the reference sites the client liked: full-bleed reels/statics, smooth scroll, content that reveals as you go. The green brand mark should feel like a glowing accent against near-black not a flat green background.

**Reference feel:** scratchboard.xyz (full-bleed media slideshow, scroll-driven) + limedhk.com (animation polish). Media is the hero; text is minimal and punchy.

### Color tokens (define in `globals.css` `@theme`, dark theme only)

Brand green sampled from the logo is `#0E8616`. Use a slightly brighter green for accents/glow on dark so it reads well.

```
--color-bg:            #0A0B0A;   /* page background, near-black */
--color-surface:       #101311;   /* cards / elevated panels */
--color-surface-2:     #161A17;   /* hover / nested surfaces */
--color-border:        #22271F;   /* hairline borders, low contrast */
--color-brand:         #0E8616;   /* logo green  marks, solid fills */
--color-brand-bright:  #16C138;   /* vivid accent  CTAs, active, links */
--color-brand-glow:    #2BE862;   /* glows, focus rings, gradients only */
--color-deep:          #06210E;   /* deep green for gradient bases */
--color-fg:            #E9EDE8;   /* primary text */
--color-fg-muted:      #9AA69A;   /* secondary text, captions */
```

Use green as a **20% accent**, not the whole page. Body copy stays neutral (`--color-fg`/`--color-fg-muted`); green is reserved for logo, CTAs, active states, key numbers, hovers, and subtle radial glows behind media.

### Typography (use `next/font/google`, follow the Next 16 font docs)

- **Display / headings:** `Space Grotesk` bold, geometric, characterful for big statements.
- **Body / UI:** `Inter` clean, highly legible.
- **Eyebrows / labels / stats:** `Geist Mono` (already available) small uppercase mono labels are a nice editorial touch.

Type scale: large, confident headings (clamp-based, e.g. `clamp(2.5rem, 6vw, 6rem)` for hero). Tight leading on display, comfortable on body. Set font CSS variables in `layout.tsx` and wire them into `@theme` (`--font-display`, `--font-sans`, `--font-mono`).

### Motion principles

- Subtle and purposeful: fade-up + slight translate on scroll-in, staggered children, smooth hover scale/underline. Ease like `[0.22, 1, 0.36, 1]`, durations 0.5–0.8s.
- One signature moment per page max (e.g., hero reel reveal). Don't over-animate.
- **Respect `prefers-reduced-motion`:** disable Lenis smooth scroll, disable autoplay (show poster + play control), and reduce transforms to simple fades. Every animated component checks this.

---

## 4. Site structure

App Router pages (server components by default; mark interactive/animated pieces `"use client"`):

```
/            Home (landing)
/about       About
/portfolio   Portfolio (reels + statics + clients)
/contact     Contact
```

Suggested file layout (create as needed don't over-engineer):

```
src/
  app/
    layout.tsx            # fonts, metadata, <Navbar>, <Footer>, smooth-scroll provider
    page.tsx              # Home  (REPLACE the current coming-soon placeholder entirely)
    about/page.tsx
    portfolio/page.tsx
    contact/page.tsx
    globals.css           # @theme tokens, base styles
  components/
    layout/   Navbar.tsx  Footer.tsx  SmoothScroll.tsx
    media/    LazyVideo.tsx            # THE reusable video component (see §7)
    ui/       Reveal.tsx  Marquee.tsx  Carousel.tsx  Button.tsx  SectionHeading.tsx
    home/     Hero.tsx  Services.tsx  ReelShowcase.tsx  ClientMarquee.tsx  Stats.tsx  CTA.tsx
    portfolio/ ReelGrid.tsx  StaticGrid.tsx  Lightbox.tsx
  data/       site.ts  services.ts  reels.ts  statics.ts  clients.ts
  lib/        cn.ts  motion.ts        # shared class + variant helpers
```

Keep all copy and asset lists in `src/data/*` so content is edited in one place, not hard-coded in JSX.

### Page briefs

**Home** replace `src/app/page.tsx` (currently a coming-soon placeholder referencing images that don't exist).

- Hero: bold headline about turning brands into scroll-stopping content, one muted looping reel (pick a strong one, e.g. `compilation.mp4` or `zuhrah.mp4`) or a subtle grid of reels behind/beside the type. Clear CTA → Contact.
- Services grid: the 6 services from §1, each a card with hover motion.
- Reel showcase: horizontal-scroll or grid strip of 4–6 reels (9:16), muted autoplay-in-view.
- Client marquee: infinite scrolling logo strip from `/public/clients` (grayscale → color on hover).
- Stats / proof band: e.g. "Millions of views", "29+ brands" (count real logos don't inflate), qualitative wins. Keep truthful.
- Closing CTA section → Contact.

**About**

- Who they are: 360° agency, reels that hit millions of views, full-service.
- What they do (services expanded) + how they work (simple 3–4 step process: brief → create → publish → grow).
- Brand-led visuals; sprinkle a couple of statics/reels.

**Portfolio** the media showcase, the heart of the site.

- Reels grid: all 15 reels in 9:16 cards, muted, play-in-view, lazy. Optional click → lightbox (still muted by default).
- Statics: the 10 webp designs presented as **carousels** (see §7b) related images grouped into swipeable multi-slide projects, plus single-slide cards for standalones. Click a slide → lightbox.
- Clients section: full logo wall (not just the marquee).
- This page has the most media §7 rules matter most here (cap concurrent playback, generous lazy margins).

**Contact**

- Headline + short pitch.
- Contact form (name, email, brand/company, message) → third-party endpoint (§8). No backend.
- Direct details: email/phone (ask client for these leave clearly-marked placeholders if unknown) + the three social links.
- Optional embedded location/CTA. Keep it clean.

---

## 5. Asset inventory (already in `/public`)

Do not re-download or regenerate assets; they're committed. Reference them from `/` (public root).

### `/public/grinscreen/`

- `logo.png` (1000×1000, transparent) primary logo/mark
- `grinscreen-alt.png` (1000×1000) alt

### `/public/reels/` 15 × 9:16 `.mp4`, muted playback, ~94 MB total

| file               | size |
| ------------------ | ---- |
| cnb-teaser.mp4     | 1.4M |
| reel-1.mp4         | 1.6M |
| reel-1-2.mp4       | 2.6M |
| compilation.mp4    | 3.8M |
| desert1.mp4        | 4.2M |
| thumb.mp4          | 4.6M |
| Interior.mp4       | 5.2M |
| ghibli-art.mp4     | 5.3M |
| reel-2-3.mp4       | 5.9M |
| food.mp4           | 6.0M |
| aug-reel.mp4       | 8.8M |
| outlet-opening.mp4 | 8.8M |
| ambience.mp4       | 9.5M |
| outlet.mp4         | 11M  |
| zuhrah.mp4         | 16M  |

### `/public/statics/` 10 × `.webp`

artboard-1v1, artboard-2v1, artboard-3v1, artboard-4v1, cnb1, the-bowl, wooking, wooking-2, wooking-3, wooking-4

### `/public/clients/` 29 logos (mixed jpeg/jpg/png)

antipodean, arabika bakery, arabika coffee, aseaz, cnb, cnb expres, doslocos, hotbox, hotcha, hua, la vita, little italy, local coffee, munch station, pan chini, pathao, pcb, pizzaburg, ray bd, royal multsports arena, seenjoy, the bowl, tinds, ws, zuhra

> ⚠️ **Filename hazard:** many client files contain **spaces**, and `vim .jpeg` has a **trailing space** before the extension. This breaks easily. See §6 normalize filenames first, then reference clean paths.

---

## 6. Asset prep (do this first, before building pages)

### 6a. Normalize filenames (recommended)

Rename client logos (and any spaced files) to kebab-case, lowercase, no spaces (`arabika bakery.png` → `arabika-bakery.png`, `vim .jpeg` → `vim.jpeg`). Do it with a small reversible script, `git add` the renames, and drive everything from a `clients.ts` manifest so paths are never typed by hand.

### 6b. Generate reel poster frames (strongly recommended for bandwidth)

`ffmpeg` is available in this environment. Generate a small first-frame poster per reel so a card shows an instant image and downloads **zero** video bytes until it's actually played. Example:

```bash
for f in public/reels/*.mp4; do
  name=$(basename "$f" .mp4)
  ffmpeg -y -i "$f" -vframes 1 -vf "scale=540:-1" -q:v 6 "public/reels/posters/$name.jpg"
done
```

Wire each poster to its `<video poster="...">`. Confirm before running batch ffmpeg jobs.

### 6c. Build data manifests

Create `src/data/reels.ts`, `statics.ts`, `clients.ts` with typed arrays. Reels: `{ slug, title, src, poster? }` with human titles derived from filenames (`cnb-teaser` → "CNB Teaser"). **Statics: model as projects** `{ slug, title, images: string[] }` so a project's `images` array drives a carousel when it has more than one image (`artboard-1v1…4v1` = one project, `wooking…wooking-4` = one project, `cnb1` and `the-bowl` = single-image projects). This decouples content from components.

---

## 7. Video handling the core performance contract

**This governs every `<video>` on the site.** Build one `LazyVideo` (client) component and use it everywhere; never drop a raw autoplaying `<video>` into a page.

Rules:

1. **Muted, always.** `muted` + `playsInline` + `loop`. No audio track ever plays. (Browsers also require `muted` for autoplay to work at all.)
2. **`preload="none"`.** Never preload metadata or data for off-screen videos.
3. **Play only when in view.** Use `IntersectionObserver` (or motion's `useInView`): when a card enters the viewport (with a small `rootMargin` buffer, e.g. `200px`), `.play()`; when it leaves, `.pause()`. Do **not** use the bare HTML `autoPlay` attribute for off-screen videos.
4. **Lazy-mount the source.** Ideally don't attach the `<source>`/`src` until the card is near the viewport (wider `rootMargin`, e.g. `400px`), so the file isn't fetched for content far down the page. Show the `poster` image until then.
5. **Cap concurrent playback.** On media-heavy pages (Portfolio), don't play more than ~2–3 reels at once. Pause videos that scroll away immediately to free bandwidth/decode.
6. **Poster first.** Every video has a lightweight `poster` (§6b) so layout is stable and something shows instantly with no video download.
7. **`prefers-reduced-motion`:** don't autoplay; render poster + a play button, and only load/play on user click.
8. Set explicit dimensions / aspect-ratio (`aspect-[9/16]`) to prevent layout shift.
9. Consider `disableRemotePlayback` and no download UI; hide native controls on ambient reels (they're decorative, muted loops).

`LazyVideo` prop sketch: `src`, `poster`, `className`, optional `priority` (eager-mount for the hero), optional `playWhenVisible` (default true).

> **Scaling note (mention to the user, don't block on it):** ~94 MB of video in `/public` is fine to ship but heavy on repeat traffic. If bandwidth/cost becomes a problem in production, migrating reels to a video CDN / Vercel Blob / Bunny / Cloudflare Stream (with HLS) is the next step. Not required for v1.

### 7b. Static-image carousel

Static designs are shown in a **carousel** (Embla by default see §2). Build one reusable `Carousel` component and reuse it wherever statics appear (Portfolio, plus any About/Home usage).

Content model: statics are grouped into **projects**, where a project holds one or more images. The existing files fall into natural sets treat `artboard-1v1…4v1` as one multi-slide project and `wooking…wooking-4` as another, with `cnb1` and `the-bowl` as single-image projects. A project with one image renders as a plain card; a project with several renders as a swipeable carousel. Drive this from `statics.ts` (see §6c).

Rules:

1. **Touch/drag + keyboard.** Swipeable on touch and draggable on desktop; arrow keys move slides; visible focus states. This is a core control, so no hover-only navigation.
2. **Controls:** prev/next arrows (hidden/disabled at ends unless looping) **and** dot indicators / a slide counter (e.g. `2 / 4`). Arrows and dots have `aria-label`s.
3. **Auto-advance is optional and off by default.** If enabled, pause on hover, focus, and page-hidden; and **disable it entirely under `prefers-reduced-motion`** (user swipes manually instead). Never auto-advance a single-image project.
4. **Lazy images.** Use `next/image` with lazy loading; only the active (and immediately adjacent) slides should be high priority. Don't eager-load every slide.
5. **No layout shift.** Fixed aspect ratio per slide (statics here are 4:5 / portrait-ish set the real ratio and letterbox if mixed). Match Embla's container to avoid reflow.
6. **Accessible semantics:** `role="group"`/`aria-roledescription="carousel"`, slides labelled (e.g. `aria-label="Slide 2 of 4"`), `aria-live="polite"` on the active region, and it must be fully usable by keyboard and screen reader.
7. **Loop** is fine for multi-slide projects; keep transitions smooth (~300–500ms) and honor reduced motion (snap without animation).
8. Optional click-to-expand into the same lightbox used by reels.

---

## 8. Contact form (no backend)

Use a **third-party form endpoint** so nothing server-side is needed and no secrets live in the repo:

- Recommended: **Web3Forms** (`https://api.web3forms.com/submit`, free, needs a public `access_key`) or **Formspree**.
- The access key / endpoint is a **placeholder the user must supply** mark it clearly (e.g. `NEXT_PUBLIC_WEB3FORMS_KEY`) and never invent one.
- Client-side validation, a hidden honeypot field for spam, and clear success/error UI.
- Graceful fallback: even if the key isn't set, show a working `mailto:` and the social links so the page is never a dead end.
- Do **not** use `<form>` server actions that require a backend; this is a static/JAMstack contact form.

---

## 9. Responsiveness & accessibility

- Mobile-first. Test 360px, 768px, 1024px, 1440px. Reels are 9:16 on mobile show 1–2 per row, on desktop 3–4.
- Real mobile nav (hamburger → drawer), touch-friendly targets (≥44px), no hover-only affordances for critical actions.
- Semantic HTML, keyboard-navigable, visible focus states (use `--color-brand-glow` focus ring), meaningful `alt` on every image (client name for logos), `aria-label`s on icon buttons.
- Muted decorative videos need no captions; if any narrative video ever gets sound (not in v1), it must have captions.
- Color contrast ≥ WCAG AA against the dark background.
- Per-page `metadata` (title, description, Open Graph). Replace the current `"Create Next App"` / coming-soon metadata. Add `favicon`/OG using the logo.

---

## 10. Commands

```bash
npm run dev     # dev server → http://localhost:3000
npm run build   # production build  must pass before you consider a page done
npm run lint    # eslint
npm start       # serve production build
```

Definition of done for any page: it builds (`npm run build`), lints clean, is responsive at the four breakpoints above, all videos are muted + lazy + play-in-view, and no console errors.

---

## 11. Working style

- Read `node_modules/next/dist/docs/` for anything Next-specific before coding (see §0.1). Prefer the docs over your priors.
- Build in this order: (1) asset prep §6 → (2) tokens + fonts + layout/nav/footer + smooth scroll → (3) `LazyVideo` §7 → (4) Home → (5) Portfolio → (6) About → (7) Contact → (8) polish, a11y, `build`.
- Small, reviewable commits with clear messages. Show a plan before large changes.
- Reuse components; keep content in `src/data`. Don't hard-code asset paths in JSX.
- When unsure about client-specific facts (email, phone, exact stats), use a clearly-marked placeholder and flag it never fabricate.
