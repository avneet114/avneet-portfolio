# CLAUDE.md — Avneet's Portfolio Website

## ⚠️ CRITICAL RULES — READ BEFORE EVERY RESPONSE

1. **NEVER rewrite entire files.** Make surgical changes only.
2. **ALWAYS show me the current code BEFORE changing it.**
3. **ONE change at a time.** Show me the result before continuing.
4. **If something breaks, STOP and tell me. Do not try to fix
   it by making more changes.**
5. **Recovery = revert to the last good commit** (see Task 0.2). Avneet
   verifies every change on localhost and commits it herself. Agents never
   `git commit` and never hotfix a broken tree.

---

## Portfolio Purpose & Vision

This portfolio is a one-stop digital home that aggregates all of Avneet's
projects, work, and presence from Instagram, YouTube, LinkedIn, and GitHub into
a single interactive experience. The goal is to make visitors feel something —
to tell the story of who Avneet is and what she values through an immersive,
creative interface.

### Core Concept: The Globe

The portfolio uses an interactive 3D globe as its central metaphor. It presents
**six** pivotal chapters of Avneet's life across different continents, each a
transformative phase:

- **Punjab, India** — Birthplace and origins
- **Cape Town, South Africa** — Three-month life-changing experience working
  with 52 individuals from 28 countries and interning at Cape Town TV
- **Bethlehem, Pennsylvania, USA** — Bachelor's degree at Lehigh University
  (current phase)
- **London & Scotland, UK** — University travel and exploration
- **Santiago, Chile** — First international adventure to Latin America without
  knowing Spanish
- **Canada** — Montreal with school for 5 days, then a solo return to visit
  cousins in Toronto for 2 weeks

> Navigation is **guided, not exploratory** — see the "🧭 NAVIGATION MODEL"
> section below. The globe is led via Next/Prev and opens locked on Bethlehem.

### How It Works

Each globe pin opens a dedicated chapter page with two toggles:

1. **Personal Story** — Authentic, detailed narrative about that phase of life,
   values, growth, and experiences
2. **Projects & Work** — Resume-style showcase of relevant projects, skills,
   and professional accomplishments from that period

### Target Audience

- **Recruiters & Hiring Managers** — routed to `recap.html`, a fast lane that
  bypasses the globe (see NAVIGATION MODEL). They want speed + proof + contact.
- **Friends & Family** — the guided globe tour; story and feeling.
- **New Connections** — discover who Avneet is and what drives her.

### Design Philosophy

Intentionally creative and interactive — not static. Demonstrates technical
skill, design thinking, and the ability to use modern tools (AI, web
development) to bring ideas to life.

## 🏗️ PROJECT STRUCTURE
```
portfolio/
├── index.html            # Main homepage — globe
├── style.css             # All styles
├── script.js             # Globe logic
├── Kaur_B26_Resume.pdf   # ✅ added Aug 1 — linked from the header
├── CNAME                 # www.avneetgrewal114.com (GitHub Pages)
├── _archive/             # ⚠️ removed-but-saved markup. Leading underscore
│   └── removed-intro-2026-08-01.html   # keeps Jekyll from publishing it
├── recap.html            # Recruiter dossier / category view (Task 1.4)
├── chapters/
│   ├── chapter.css
│   ├── punjab.html
│   ├── cape-town.html
│   ├── bethlehem.html
│   ├── london.html
│   ├── santiago.html
│   ├── canada.html
│   ├── germany.html      # Task 1.6
│   └── passport.html     # Travel stops (Task 1.7)
└── assets/               # Images go here
```

---

## 🌍 THE GLOBE — DO NOT TOUCH

The globe is built with Globe.gl loaded via CDN.
It uses earth-blue-marble.jpg texture.
It has an orange atmospheric glow.
It auto-rotates slowly. User can drag and spin.

**NEVER touch:**
- Globe initialization code
- Globe texture or glow
- Pin/marker data or coordinates
- Tooltip hover logic

**One authorised exception, added Aug 2026:** the guided-tour work
(NAVIGATION MODEL section) may change the **camera target** (`pointOfView`) and
add Next/Prev + progress UI, and Tasks 1.6/1.7 may **APPEND** new pins. Nothing
else above is in scope. Camera/pin changes require Avneet's explicit approval
per-task and must never alter init, textures, glow, or tooltip logic.

---

## 📍 PIN LOCATIONS — EXACT COORDINATES

| Location | Lat | Lng | Emoji |
|----------|-----|-----|-------|
| Punjab, India | 31.1471 | 75.3412 | 🌱 |
| Cape Town, South Africa | -33.9249 | 18.4241 | 🌍 |
| Bethlehem, Pennsylvania | 40.6259 | -75.3705 | 🎓 |
| London & Scotland, UK | 51.5074 | -0.1278 | 🏰 |
| Santiago, Chile | -33.4489 | -70.6693 | 🌶️ |
| Montreal & Toronto, Canada | 43.6532 | -79.3832 | 🍁 |

Pin tooltip: small card, max-width 280px, dark navy `#0a0a1f` background,
periwinkle `#7c8ff7` border. "Explore This Chapter →" button is small and
inline — NEVER full width.

---

## 🎨 DESIGN SYSTEM — IN MIGRATION (updated Aug 1, 2026)

> ⚠️ **NOT FINALISED.** Avneet has said explicitly that fonts and colours are
> not locked until she says so. Propose, show on localhost, iterate. Do not
> treat either palette below as law.

The site currently runs **two palettes side by side**, mid-migration:

### A. Poster palette — NEW, used by the site header + globe stage
Direction chosen Aug 1: *vintage travel poster + neobrutalism*. Flat colour,
hard edges, solid offset shadows with no blur, no gradients, no glassmorphism.
```css
--poster-navy:   #0d1b2a;  /* header bar, ink on light fills */
--poster-cream:  #f4f1de;  /* paper — name, light text */
--poster-teal:   #218380;  /* borders, separators, globe frame */
--poster-mustard:#f4d35e;  /* ⚠️ currently UNUSED — see note below */
--poster-tomato: #e94f37;  /* icon hover only */
```
Rules learned the hard way:
- **No saturated yellow anywhere on the night header.** Rejected twice: first
  as the bottom border, then as the RESUME button fill. Yellow is a near
  complement of both the navy bar and the teal border, so it fights everything
  around it. Mustard is currently unused — it may find a home on the light
  theme (Task 2.5) or the globe stage, but do not reintroduce it to the night
  header without asking.
- **RESUME is cream, and stays the brightest block on the bar.** Prominence
  comes from luminance contrast, not hue. That is how it leads the eye without
  clashing.
- **Teal is the structural colour** — border, separators, globe frame, button
  shadow. Same blue family as the navy bar, so it separates without shouting.
- **Amber `#f4a261` was tried and rejected** — it is the globe's
  `atmosphereColor`, but sampling one thin glow ring made the whole bar orange.
- **Cream backgrounds were tried and rejected** for now: too light against the
  night globe. Cream becomes the LIGHT theme if the day/night toggle ships
  (Task 2.5).

### B. Legacy periwinkle/lavender — everything not yet migrated
Still live in the pin tooltip, chapter pages, and `style.css` `:root`. Leave it
alone until a task explicitly migrates that surface.

### Fonts
- **`Space Mono`** (400/700) — the header. This is the *identity* font, the
  departure-board answer to Zaki's pixel font. Loaded in `index.html`.
- **`Playfair Display`** — chapter headings. Still loaded, no longer used in
  the header.
- **`DM Sans`** — body/UI on legacy surfaces.
- Sentence case, **not** ALL CAPS, for anything meant to be read.

### Legacy colours (kept for reference — surfaces not yet migrated)
```css
--bg-dark: #000000;
--bg-card: #0a0a1f;
--accent-primary: #7c8ff7;    /* soft periwinkle blue */
--accent-secondary: #b8a9f7;  /* lavender purple */
--accent-silver: #c8d0e8;     /* cool silver */
--text-primary: #ffffff;
--text-secondary: #8892b0;
--border: rgba(124, 143, 247, 0.2);
--glow: rgba(184, 169, 247, 0.15);
```
### Font loading (in `index.html` `<head>`)
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```
(`DM Sans` arrives via an `@import` at the top of `style.css`, not a `<link>`.)

### Rules
- Accent colours used sparingly — only for important UI elements
- Cards: `border: 1px solid var(--border)` on legacy surfaces
- Border radius: `12px` on cards, `999px` on buttons — **superseded on poster
  surfaces**, where brutalism wants square-ish (3–4px). The RESUME button
  breaks the 999px rule deliberately.
- No drop shadows on text unless explicitly asked. Solid *offset* shadows on
  boxes are correct for the poster/brutalist surfaces (`3px 3px 0`, no blur).

---

## 🧹 HOMEPAGE STRIPPED BACK — Aug 1, 2026 (READ BEFORE EDITING index.html)

Avneet deliberately cleared the homepage to rebuild it. **`index.html` now
contains only:** the star background, the site header, the letterboxed globe
stage, the pin tooltip, and the star cursor. 25.6 KB → 16.2 KB.

**Removed (nothing was deleted — all of it is saved):**

| Removed | Archive piece |
|---|---|
| Intro words "hi i am avneet welcome to my world" | PIECE 1 |
| 14 photo `<img>` tags (`assets/1–10`, ~7.7 MB) | PIECE 1 |
| Scroll spacer + scroll-away script | PIECE 2, 3 |
| Confetti CDN | PIECE 4a |
| Guess-the-destination game (markup + logic) | PIECE 4b, 4c |
| Newsletter card + `follow.mp3` script | PIECE 5 |
| Floating social icon script | PIECE 7 |
| Social bar (LinkedIn / YouTube / 2× Instagram) | PIECE 8 |

➡️ **Restore path: `_archive/removed-intro-2026-08-01.html`.** Byte-exact
copies with per-piece notes. Never rewrite this markup from scratch — copy it.

**⚠️ Traps when restoring.** `#guess-game`, `#newsletter-float` and
`#social-bar a` all start hidden in `style.css` (opacity 0 / pointer-events
none). Something must add `.visible` / `.floating-visible` or they sit in the
DOM invisibly with no error. PIECE 4c also calls `confetti()`, so PIECE 4a must
come back with it.

**Consequences already absorbed into the plan below:** Task 3.4 (stray
`console.log`) is done; Task 3.1 no longer affects the homepage; Task 1.5's
social-bar problem is moot; Task 1.8 is moot (the game is gone). Task 4.1 gets
*more* urgent — the homepage now has no text at all outside the header, so the
header is the natural `<h1>`.

**Still present but inert:** the ~200-line photo-stack interaction script in
`index.html` (guards `if (!stack) return;`), and these unused `style.css`
rules — `#intro-overlay`, `.intro-word`, `.intro-photo`, `.mobile-photo`,
`.stack-photo`, `#photo-stack`, `#intro-scroll-spacer`, plus `#guess-game`,
`#newsletter-float` and `#social-bar` styling. **Do not delete any of it while
the archive is the restore path.**

---

## 🖼️ THE GLOBE STAGE — LETTERBOXED (Aug 1, 2026)

The globe is no longer full-bleed. `#globe-container` is a framed stage:
centred, `max-width: 1240px`, inset below the 56px header, 3px teal border and
a `10px 10px 0` offset shadow. The page's star background shows through the
surrounding margin.

**Done in CSS only — `script.js` was not touched.** The globe sizes itself from
`container.clientWidth/clientHeight` (`script.js` 260–261 at init, 361–362 on
resize), so resizing the container is enough. `index.html` also fires one
`resize` on `window.load` so the globe re-measures the settled layout.

⚠️ Centre the box with **auto margins, not `transform: translateX(-50%)`** — a
transform creates a new containing block around the globe's HTML pin layer.

Still open: `pointOfView({lat: 15, lng: 55, altitude: 2.2})` (`script.js` ~367)
was tuned to push the earth right to balance the intro text that no longer
exists. Re-framing it is camera-only and needs Avneet's approval.

---

## 🧭 NAVIGATION MODEL — GUIDED, NOT EXPLORATORY (decided Aug 1, 2026)

A deliberate design decision: the site is a **guided tour**, not a
free-exploration globe. This does NOT replace "🌍 THE GLOBE — DO NOT TOUCH" —
only the camera target moves and Next/Prev + progress UI are added.

### The decision
Rejected: multiple planets for skills/education. The Earth maps to *places*
(real coordinates = a life told through geography); skills/education are
categories, not places, so planets would lose what makes the globe meaningful.
The category view is served by `recap.html` instead.
Kept: ONE Earth, navigation linear and led — not spin-to-explore.

### Two audiences, two paths (core principle)
- **Friends / family / new connections → the globe.** Guided emotional tour.
- **Recruiters → `recap.html`.** A fast lane that BYPASSES the globe. A
  recruiter will not click Next 7 times to reassemble a resume. Give them a
  better door and label it for them.

### Behaviour 1 — Locked start on Bethlehem
- On load the globe opens already framed on **Bethlehem, PA** (current phase),
  with a small "you are here — current chapter" marker.
- It does NOT auto-rotate away on load; it holds on Bethlehem so the visitor
  lands somewhere intentional, not mid-spin over an ocean.
- ⚠️ Sets the initial `pointOfView` (Bethlehem 40.6259, -75.3705). Camera
  target/altitude only — not init, texture, glow, or pins.

### Behaviour 2 — Guided tour (Next / Prev)
- Persistent **Next ▸ / ◂ Prev** controls fly the globe chapter to chapter in a
  fixed narrative order, then open/reveal that chapter.
- **⚠️ CONFIRM TOUR ORDER (Avneet decides):** proposed —
  Bethlehem (now) → Punjab (origin) → Cape Town → Santiago → London → Canada →
  Germany → [Europe stops / passport]. Opening on "now" then flashing back to
  the origin is a strong hook, but the sequence is Avneet's call.
- Clicking a pin directly still flies there; the DEFAULT guided path is
  Next/Prev so nobody has to know to spin.
- **Progress indicator:** "Chapter 3 of 7 · Cape Town · 2024" — bounded, not
  endless.
- Uses `pointOfView({lat, lng, altitude}, ms)`. ⚠️ Camera only; approval
  required (same rule as Task 3.3).

### Behaviour 3 — `recap.html` = recruiter dossier (category view)
Where Work / Skills / Education live FLAT, replacing the planets idea. Top to
bottom:
1. One-line identity + a **"Currently:"** line (role, grad date, what she
   seeks) — recruiters filter on timing; give it without a click.
2. Experience (chronological, each: role · org · the one impressive thing)
3. Projects (with real links / repos)
4. Skills
5. Education
6. Resume button + email + LinkedIn repeated at the bottom.

Must be real crawlable HTML with real `<a>` links to each chapter (satisfies
Task 1.4 + the SEO gap in Phase 2).

### Recruiter-friendly checklist (site-wide)
- [ ] Header link labels the audience: "Recruiter? Start here →" not "Recap".
- [ ] RESUME is the most prominent header element, one click from every page.
- [ ] Email + LinkedIn reachable from every page (Tasks 1.2/1.3, mobile 1.5).
- [ ] Each chapter opens with a "What I did here:" résumé line before the story.
- [ ] Optional: a persistent "show work sections" toggle so the tour flips from
      story-mode to work-history-mode and sticks.
- [ ] Concrete proof over adjectives (numbers, links, artifacts) per chapter.

---

## 📬 NEWSLETTER — REMOVED FROM THE HOMEPAGE Aug 1, 2026

⚠️ The floating "💌 letters from avneet" card is no longer on `index.html`
(archive PIECE 5). Spec below is retained for when it is placed again — likely
on `recap.html` or a footer rather than floating over the globe.

Using Beehiiv. Embed code is locked — do not regenerate:
```html
<script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
<iframe
  src="https://subscribe-forms.beehiiv.com/f81b2276-3730-4e1c-92ea-a74ae71c46eb"
  class="beehiiv-embed"
  frameborder="0"
  scrolling="no"
  style="width:560px;height:291px;margin:0;background-color:transparent;max-width:100%;">
</iframe>
```
Heading above it: `"letters from avneet 💌"`
Subtext: `"lifetime access to my travel, work, and life updates"`
Note: embed only works on deployed URL, not localhost.

---

## 🗺️ GUESS THE DESTINATION GAME — REMOVED Aug 1, 2026

⚠️ **No longer on the site.** Markup and logic are archive PIECE 4b/4c, the
confetti CDN is PIECE 4a. Spec kept below as the restore reference.

This also **closes Task 1.8** (the 🇩🇪 pin from Task 1.6 could have leaked the
answer) — there is no game left to spoil. And it changes Task 5.1: the flag
quiz would now be net-new, not a replacement.

Answer was **"Germany"** (also accepted "Deutschland", case-insensitive).

Wrong guess — rotate randomly through:
- "Nope! But good guess 🤪"
- "I wish"
- "Not even close... or are you? 👀"
- "Interesting guess! Try again ✈️"

Correct guess — confetti + modal:
```
🎉 YOU GOT IT!
Deutschland, here I come! 🇩🇪
"Next stop: Germany. Follow along for the journey."
[Follow on Instagram] [Close]
```
Confetti via CDN:
`https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`

---

## 📱 SOCIAL LINKS (live URLs)

⚠️ **Aug 1, 2026 — the floating social bar was removed** from `index.html`
(archive PIECE 8). Where each link lives now:

| Link | Status |
|---|---|
| LinkedIn | ✅ in `#site-header` |
| GitHub `github.com/avneet114` | ✅ in `#site-header` (added Aug 1, from the résumé) |
| Email `avk328@lehigh.edu` | ✅ in `#site-header` |
| YouTube | ❌ **no home on the site** |
| Instagram (both accounts) | ❌ **no home on the site** |

Finding a place for YouTube + Instagram is open work — `recap.html` (Task 1.4)
or a footer are the obvious candidates. Relevant because Avneet's résumé lists
Content Creator with 5,300+ community and 3M+ views; those links are evidence.


- LinkedIn: `https://www.linkedin.com/in/avneetkaur777/`
- Instagram (work): `https://www.instagram.com/avneeet.mp4/`
- Instagram (personal): `https://www.instagram.com/avneetgrewal114/`
  > ⚠️ **Resolved Aug 1, 2026.** This file previously listed
  > `avneeet_slays`, which appears **nowhere** in the repo. The two URLs above
  > are what `index.html` (lines 407, 413) actually links to, labelled "work"
  > and "personal". If `avneeet_slays` is a renamed account, the fix belongs in
  > `index.html` — not here. **Avneet: confirm all three handles are live.**
- YouTube: `https://www.youtube.com/@avneetgrewal114`

Style: rounded square dark cards, glow on hover, `transform: scale(1.1)` on
hover.

---

## 📖 CHAPTER PAGES — SHARED TEMPLATE

Each chapter page has:
1. Back button: `← Back to the Globe`
2. Chapter emoji + title + location + year
3. Toggle bar: `[ 🏠 Personal Story ]  [ 💼 Work & Projects ]`
   - Smooth CSS fade between sections; default Personal Story open
4. Personal section: narrative text + photo placeholders + YouTube embed
   placeholder
5. Work section: role, company, bullet points, skill pill tags
6. (Per NAVIGATION MODEL) opens with a "What I did here:" résumé line.

---

## ⚙️ ENVIRONMENT
```bash
# If you hit token limit error:
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=64000
```

### 🚀 DEPLOY & ROLLBACK (Task 0.2 — verified from the repo, Aug 1, 2026)

**Host: GitHub Pages.** Confirmed, not assumed:
- Repo: `https://github.com/avneet114/avneet-portfolio.git` (remote `origin`)
- Branch: `main` — the only branch; `origin/HEAD → origin/main`
- Custom domain: `CNAME` file contains `www.avneetgrewal114.com`
- **No** `netlify.toml`, `vercel.json`, or `.github/workflows/` — there is no
  CI step. **A push to `main` IS the deploy.** Nothing else runs.

**The loop — one change at a time:**
1. Agent makes ONE surgical change. Agent does **not** commit.
2. Avneet previews on localhost: `python3 -m http.server 8000` → open
   `http://localhost:8000`. (Note: the Beehiiv newsletter embed only works on
   the deployed URL, never on localhost — that is expected, not a bug.)
3. **Good?** Avneet runs `git add <files>` + `git commit` herself. That commit
   is the new known-good state.
4. **Bad?** `git restore .` to discard uncommitted work, or
   `git reset --hard HEAD` to return to the last commit.
5. Live only when Avneet runs `git push`. Pages redeploys in ~1 minute; hard
   refresh, since favicons and CSS cache aggressively.

**Recovery is always one line:** revert to the last good commit. Never hotfix a
broken tree — see Critical Rule #5.

⚠️ **Uncommitted work already in the tree** (predates this plan): `script.js`,
`style.css`, `.DS_Store`. Avneet should review and commit or discard these so
"last good commit" means something. Also worth adding `.DS_Store` to
`.gitignore` — it is macOS junk that should never have been tracked.

---

# 🗓️ IMPROVEMENT PLAN — reordered Aug 1, 2026

Audit of the live site (https://www.avneetgrewal114.com/) plus a comparison
against a peer portfolio (https://zaki-khan.com/) that solves the same problem
well. Work through this list **in order**, one task at a time.

## 🧭 THE GUIDING IDEA — TWO LAYERS
- **Layer 1 — always exists.** Plain HTML in the file. Renders before any JS,
  survives a JS error, visible to Google. Holds: name, what Avneet does,
  resume, email, links to all chapters.
- **Layer 2 — enhancement.** The globe, sounds, star cursor, photo stack,
  guess game. Delightful, but nothing critical may live *only* here.

Today ~100% of the site is Layer 2. Chapter URLs exist only inside `LOCATIONS`
in `script.js` — Google can't see them and they vanish if a CDN fails. Every
task adds a sibling layer beside the globe; the globe itself does not change.

## 📏 HOW TO WORK THIS PLAN
1. Pick the lowest-numbered unchecked task. Do not batch tasks.
2. Show Avneet the current code before editing it (Critical Rule #2).
3. Make the change; **Avneet verifies on localhost, then git adds + commits
   herself** (Task 0.2). Only then mark the box `- [x]`.
4. If something breaks, STOP and say so. Do not pile on more changes; recovery
   is a revert to the last good commit.
5. Never touch globe init, textures, pin data, or tooltip logic (one authorised
   exception: the camera/pin work noted above).

## ❓ DECISIONS NEEDED FROM AVNEET (blocking)
- **Resume PDF** — blocks Task 1.1. Avneet exports/provides the file. Do this
  first regardless of order — it's a 5-minute errand gating the biggest task.
- **Public email** — blocks Task 1.3. Lehigh (avk328@lehigh.edu) vs a dedicated
  portfolio address. Recommend dedicated so it survives graduation.
- **One-line identity** — blocks Task 1.2. Draft: "CS & Business @ Lehigh
  University". Should say what she does and what she's looking for.
- **"Currently:" line** — blocks recap.html. Current role/status, grad date,
  what she's seeking. Highest-value recruiter sentence on the site.
- **Tour order** — blocks the guided tour (NAVIGATION MODEL Behaviour 2).
- **Hosting** — GitHub Pages vs Netlify/Vercel? Needed to complete Task 0.2.

## ✅ ALREADY DONE (July 31, 2026)
- [x] Real favicon — `assets/favicon.svg` (🌍) + `assets/favicon.png` fallback,
      linked from all pages. Live and verified.
- [x] Page title changed from "My Personal Portfolio" to "Avneet Kaur".

---

## PHASE 0 — HYGIENE (do first; changes nothing live, makes the plan safe)

### 0.1 — Documentation is trustworthy
- **Why:** An agent reads the top of this file as truth. This merge already
  corrected the known drift (six chapters not five; `london.html` not
  `london-scotland.html`; `canada.html` + `chapter.css` added to structure;
  periwinkle palette not gold; tooltip colours reconciled; game section
  cross-referenced to 1.8/5.1). Remaining item: **confirm the real Instagram
  handle** and Canada's blurb + coordinates, then update above.
- **Done when:** every factual claim in this file matches the actual repo.

### 0.2 — Deploy + rollback workflow written down
- **Why:** Strong surgical-edit discipline needs a known-good-state story.
  Avneet already works this way by hand; make it a rule.
- **The loop:** agent makes ONE change → Avneet views it on **localhost** →
  if good she `git add` + `git commit` herself → if bad she `git restore .` /
  reverts to the last commit. No agent commits, no hotfixes on a broken tree.
- **Do:** record the hosting target (confirm Pages vs Netlify/Vercel and how a
  push goes live) so recovery is one line: "revert to last good commit."
- **Done when:** this file names the host and states the loop.

---

## PHASE 1 — RECRUITER ESSENTIALS (highest impact)

A recruiter currently cannot contact Avneet or read her resume. Nothing else
matters as much.

### 1.1 — Add `resume.pdf`
- Place `resume.pdf` in repo root. No build step.
- **Done when:** `https://www.avneetgrewal114.com/resume.pdf` returns 200.

### 1.2 — Static site header on all pages
- **Why:** The Layer-1 core — name, identity, resume, email present before any
  JS. Also a permanent "back home" control so visitors never get lost.
- **Contents:** name (links to `/`) · one-line identity · "Recruiter? Start
  here →" (→ recap.html) · RESUME button (most prominent) · email icon ·
  LinkedIn.
- **Placement:** immediately after `<body>`, BEFORE `#stars-container` (the
  star-cursor script then picks up its links automatically).
- **Z-index 200** (stack: stars 0, globe 1, intro overlay 5, floating cards
  100, tooltip 1000, star cursor 99999) — above globe/cards, below tooltip.
- **Height ~56px**, fixed top, translucent dark + `backdrop-filter: blur`. Only
  the top strip, so the globe stays draggable.
- **Exempt from click sound:** add `if (e.target.closest('#site-header'))
  return;` to the document click handler in `index.html` (~line 347).
- **⚠️ Same edit in multiple files** (all HTML pages + `style.css` +
  `chapters/chapter.css`) — highest drift risk in the plan. Verify page by
  page. Layer-1 forbids a JS-only header, so hand-copying into each HTML file
  is acceptable.
- **Done when (per-page):** index · punjab · cape-town · bethlehem · london ·
  santiago · canada (· germany once it exists) — header visible on each, globe
  still spins/drags, no click sound on RESUME.

### 1.3 — Real contact email
- Add to the header as a real `mailto:`. Blocked by the email decision above.

### 1.4 — Build `recap.html` (recruiter dossier / "Quick Recap")
- The recruiter fast lane + a crawlable path to all chapters + a globe-failure
  fallback. Structure per NAVIGATION MODEL Behaviour 3 (identity + "Currently:"
  → Experience → Projects → Skills → Education → resume/email/LinkedIn).
- Per chapter: emoji, title, location, year, one-line blurb (reuse `LOCATIONS`
  text), and a **real `<a>`** to that chapter.
- **Rule:** links genuinely visible — never `display:none` a link list to feed
  crawlers.
- **Done when:** every chapter reachable from `recap.html` with JS disabled.

### 1.5 — Keep the conversion path on mobile — ✅ MOSTLY DONE
- Original problem (`#social-bar a` hidden below 768px) is moot: the social bar
  was removed entirely Aug 1.
- **Now handled by the header:** below 768px both identity lines hide while
  RESUME, email, LinkedIn and GitHub all stay. Rule to keep following — on
  mobile cut decoration, never the conversion path.
- **Remaining:** verify at 375px, and this only holds on `index.html` until the
  header ships to the chapter pages (Task 1.2).

### 1.6 — Add Germany as a FULL chapter 🇩🇪
- Summer 2026 internship = real work experience, currently missing. Full
  chapter page, same template. **New file:** `chapters/germany.html`.
- **Pin data to APPEND** to `LOCATIONS`: flag `🇩🇪`, emoji `🥨`, year
  `Summer 2026`. **Confirm city:** Berlin 52.5200,13.4050 · Munich
  48.1351,11.5820 · Frankfurt 50.1109,8.6821.
- **⚠️ Edits pin data** (authorised). APPEND only — never modify/reorder the
  existing chapters, never touch init/textures/glow/tooltip.

### 1.7 — Travel stops as a lighter SECOND TIER 🎒
- **Countries:** Belgium, Netherlands, France, Switzerland, Italy — travel, not
  work. Same weight as real chapters would dilute the signal.
- **Build ONE shared page** `chapters/passport.html`, a section per country;
  pins link to anchors (`passport.html#belgium`). One file to maintain, real
  crawlable page, photos get room.
- **Per-country template:** 1–3 photos · when/how long · why she went / how she
  got there · one thing she loved · one thing that surprised her.
- **⚠️ PRE-DECIDED to avoid the cluster:** six pins inside Western Europe at
  `altitude: 2.2` will overlap unreadably. **Start with ONE "Europe trip" pin →
  `passport.html`,** not five. Only split into per-country pins later if you
  verify on a real screen they don't collide. Per-country data retained for if
  you split:
  | Country | Flag | Emoji | Lat | Lng |
  |---------|------|-------|-----|-----|
  | Belgium | 🇧🇪 | 🧇 | 50.8503 | 4.3517 |
  | Netherlands | 🇳🇱 | 🌷 | 52.3676 | 4.9041 |
  | France | 🇫🇷 | 🥐 | 48.8566 | 2.3522 |
  | Switzerland | 🇨🇭 | 🏔️ | 46.9480 | 7.4474 |
  | Italy | 🇮🇹 | 🍝 | 41.9028 | 12.4964 |
- If split later: `tier: 'stop'` field, smaller pins (~26px vs 40px
  `.pin-flag`, `style.css` ~line 225), branch in `createPinElement()`
  (`script.js` ~line 381).

### 1.8 — ~~Stop the Germany pin from spoiling the guess game~~ ✅ CLOSED
- **No longer applicable.** The guess game was removed from the site on
  Aug 1, 2026 (archive PIECE 4b/4c), so there is no answer left to leak.
- If the game is ever restored, this trap comes back: the answer is hardcoded
  "Germany" and Task 1.6 puts a 🇩🇪 pin on the globe. The fix was to reword the
  header to "guess where i went this summer ✈️" so the pin reads as the reveal.

---

## PHASE 2 — REACH & SHARING

### 2.1 — Open Graph + Twitter card tags
- No `og:`/`twitter:` tags exist, so LinkedIn renders a blank card. Add
  `og:title/description/url/image/image:alt/type` + `twitter:card=
  summary_large_image` and matching tags. `index.html` first, then chapters.
- **Image:** 1200×630 PNG, **under ~300KB** (peer site's 1.3MB is the mistake
  not to copy).

### 2.2 — `robots.txt` + `sitemap.xml`
- Both 404 today. Sitemap lists homepage, `recap.html`, all chapters, and
  `passport.html`. Only meaningful after 1.4 gives crawlers real links.

### 2.3 — Reconsider the page title
- Currently "Avneet Kaur" (Avneet's explicit choice — ask before changing).
  Name + hook previews better: "Avneet Kaur — CS & Business @ Lehigh".

### 2.4 — Privacy-light analytics
- **Why:** Phase 1 optimizes a recruiter funnel with zero measurement. "Did
  anyone click RESUME" is the metric that says the plan worked.
- **Do:** a cookie-less snippet (Plausible or Cloudflare Web Analytics — no
  consent banner). Track RESUME clicks + recap.html views.
- **Done when:** resume-button clicks show in a dashboard.

---

### 2.5 — Day / night mode 🌍🌓 (Avneet's idea, Aug 1)
- **Why it earns its place:** most portfolios have a moon icon that means
  nothing. Earth actually *has* a day side and a night side, so on a globe
  portfolio the toggle IS the subject matter. It also resolves the cream-vs-
  navy header argument — cream stops being "too light" once the planet is in
  daylight. Both palettes get used instead of one being discarded.
- **Best version:** default to the **visitor's local time** — 9am gets a
  daylit earth and cream UI, 11pm gets city lights and navy. Roughly three
  lines beyond a plain toggle, and the default then means something.
- **Verified feasible:** `earth-night.jpg` exists on the same CDN path already
  in use (715KB, vs 1.4MB for `earth-blue-marble.jpg`).
- **⚠️ NEEDS AN EXPLICIT RULE CHANGE FROM AVNEET.** Swapping the texture means
  touching `globeImageUrl`, and "🌍 THE GLOBE — DO NOT TOUCH" forbids texture
  changes. The authorised exception currently covers camera position and
  appending pins ONLY. Do not proceed without her extending it in writing.
- **Real cost — this is a phase, not an afternoon.** Every colour needs two
  values, plus a toggle control, `localStorage` persistence, and
  `prefers-color-scheme` as the first guess. In practice it means restructuring
  `style.css` around CSS custom properties, i.e. **Task 4.6 arriving early**.
  Cheaper to do 4.6 first, then this.
- **Don't forget the star cursor.** It is `#c8d0e8` (pale silver) and vanishes
  on any light background. `index.html` has a comment marking where this needs
  to key off the active theme — it bit us once already on the cream header.

---

## PHASE 3 — PERFORMANCE

### 3.1 — Compress the photos — ⚠️ SCOPE CHANGED
- **No longer a homepage problem.** The 14 intro `<img>` tags were removed
  Aug 1, so `assets/1–10` (~7.7MB) are not requested by `index.html` at all.
- **Still required** before those images are used anywhere again — chapter
  pages, `passport.html`, or if archive PIECE 1 is restored. `1/5/6.png` are
  ~2MB EACH and were rendered at 120×120px.
- **Do:** resize to ~300px long edge, WebP + JPEG fallback (~7.7MB → under
  300KB). Keep the originals somewhere safe.

### 3.2 — `loading="lazy"` + explicit `width`/`height` on images.

### 3.3 — Pin globe.gl version + self-host globe textures
- `index.html` line 19 loads `unpkg.com/globe.gl` with NO version; `script.js`
  269–271 hotlink `three-globe` **example** textures. Pin a version, download
  the 4 textures into `assets/`. ⚠️ URL change only — approval first, no init/
  glow/pin/tooltip changes.

### 3.4 — ~~Remove debug logging + throttle scroll handler~~ ✅ DONE Aug 1
- Both resolved by deleting the scroll-away handler entirely. The stray
  `console.log('scrollY:', scrollY)` and the unthrottled layout writes went
  with it. `index.html` has zero `console.log` calls now.
- ⚠️ If archive PIECE 3 is ever restored, the `console.log` comes back with it
  — it was archived verbatim. Delete that line on restore.

---

## PHASE 4 — ACCESSIBILITY & CODE HEALTH

### 4.1 — Real `<h1>` — ⬆️ MORE URGENT AFTER AUG 1
- The old problem (`#intro-overlay` was `aria-hidden`, hiding the only text)
  is gone with the overlay. The new problem is worse: **the homepage has no
  text at all outside the header, and still no `<h1>`.** To a screen reader or
  a search crawler the page is now nearly empty.
- **Do:** promote the header's name + identity to a real `<h1>`. It is already
  the only text on the page, so this is mostly a tag change, not a redesign.
- Pins already have role/tabindex/aria-label (`script.js` 385–387) — leave that.

### 4.2 — Respect `prefers-reduced-motion`
- Disable twinkle, icon shuffle, globe auto-rotation, parallax under
  `@media (prefers-reduced-motion: reduce)`.

### 4.3 — Sound mute toggle, default OFF
- The document-wide click sound is still live. The `follow.mp3` and
  `confetti-pop.mp3` sounds left with the newsletter/game; `pokemon.mp3` is
  inert (its script no longer runs). Persistent mute in `localStorage`; keep
  the sounds but make them opt-in.

### 4.4 — Scope `cursor: none`
- `style.css` applies `cursor:none !important` to EVERY element. Scope it to
  the globe/stage; restore a normal cursor over inputs, buttons and the header.
- Related: the star cursor is pale silver and disappears on light backgrounds
  — see the warning in Task 2.5.

### 4.5 — ~~Delete dead `.mobile-photo` markup~~ ✅ SUPERSEDED
- Those 4 `<img>` tags went with the whole intro overlay on Aug 1.
- **Replaced by a bigger cleanup, blocked on Avneet:** a pile of now-unused CSS
  (`#intro-overlay`, `.intro-word`, `.intro-photo`, `.mobile-photo`,
  `.stack-photo`, `#photo-stack`, `#intro-scroll-spacer`, `#guess-game`,
  `#newsletter-float`, `#social-bar`) plus the inert ~200-line photo-stack
  script in `index.html`. **Do NOT delete any of it while `_archive/` is the
  restore path** — deleting the CSS would make a restore look broken.
  Only clear it once Avneet confirms those features are not coming back.

### 4.6 — One palette, defined once as tokens
- `:root` still defines legacy gold/amber (`--accent-gold:#f4a261`) that
  nothing uses, while the new header hardcodes poster hexes inline and the
  legacy surfaces use periwinkle. Three palettes, none of them tokenised.
- **Do:** settle the palette (Avneet has NOT finalised it), define it once as
  custom properties, and convert both the poster and legacy surfaces to use
  them. **Prerequisite for Task 2.5** — day/night needs two values per token.

---

## PHASE 5 — LATER / NICE TO HAVE

**Low priority. Do not start until Phases 1–2 are done.** 5.1 is a small
application, not a checkbox — respect the gate; don't let it cut ahead of
resume.pdf.

### 5.1 — Flag quiz game 🚩 (all ~195 countries)
- ⚠️ **Status changed Aug 1:** the old guess game was removed from the site, so
  this is now a **net-new build**, not a replacement. Nothing is waiting to be
  swapped out and the homepage has no game at all. Decide whether a game
  belongs on the rebuilt homepage before building this.
- Original framing (kept for reference): replaced the "guess where i'm going
  next" game (rewrite the GUESS THE DESTINATION section if this ships).
- **ALL ~195 countries** (Avneet's choice, not just her 12).
- **Flow:** flag → type country → wrong rotates joke messages → hint every 2
  misses → correct fires confetti → auto-advance → endless.
- **Do NOT hand-author 195 entries.** Store a compact table, derive the rest:
  ```js
  { code: 'BE', name: 'Belgium', continent: 'Europe', capital: 'Brussels' }
  ```
  - Flag emoji computed from ISO code: `0x1F1E6 + (charCode - 65)`.
  - Hints generated: continent → capital → "starts with a B…".
- **Answer matching:** normalise (lowercase, trim, strip accents/punctuation/
  leading "the") + alias list — Netherlands/Holland, UK/Britain/England,
  USA/America, Czechia/Czech Republic, Myanmar/Burma, Eswatini/Swaziland,
  Côte d'Ivoire/Ivory Coast, Cabo Verde/Cape Verde, Timor-Leste/East Timor,
  DR Congo/DRC, South Korea/Korea, UAE/Emirates. Allow edit distance 1–2.
- **⚠️ Near-identical flags** (Chad/Romania, Indonesia/Monaco, Netherlands/
  Luxembourg, Ireland/Ivory Coast, Australia/NZ) — accept both or exclude.
- **⚠️ Difficulty curve** — tier the table (`1|2|3`) and ramp; a uniform draw
  serves Kiribati early and players quit. Or easy/hard toggle / continent
  filter.
- **Hybrid personal touch:** when the answer is one of her 12 countries, show
  an "I've been here ✈️" badge + one-liner + link to that chapter/passport
  section.
- **Reuse:** hint-every-2-misses (`wrongCount % 2`), existing joke messages,
  `canvas-confetti` (loaded), `confetti-pop.mp3` (behind the 4.3 mute, OFF by
  default), Twemoji flag SVG rendering (needs its own larger rule).
- **Must include:** Skip button, score counter, shuffle-without-repeats, bigger
  card (`#guess-game` is 260px `style.css` ~326 — widen, re-check mobile ~422).
- **⚠️ Accessibility trap:** flag `<img>` alt must be `alt="Mystery flag"`,
  never `alt="Flag of Belgium"`, or screen readers get the answer.
- **Data:** static local JS/JSON table. No API — the site is static.
