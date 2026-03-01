# CLAUDE.md — Avneet's Portfolio Website

## ⚠️ CRITICAL RULES — READ BEFORE EVERY RESPONSE

1. **NEVER rewrite entire files.** Make surgical changes only.
2. **ALWAYS show me the current code BEFORE changing it.**
4. **ONE change at a time.** Show me the result before continuing.
5. **If something breaks, STOP and tell me. Do not try to fix 
   it by making more changes.**

---

## Portfolio Purpose & Vision

This portfolio is a one-stop digital home that aggregates all of Avneet's projects, work, and presence from Instagram, YouTube, LinkedIn, and GitHub into a single interactive experience. The goal is to make visitors feel something — to tell the story of who Avneet is and what she values through an immersive, creative interface.

### Core Concept: The Globe

The portfolio uses an interactive 3D globe as its central metaphor, allowing visitors to explore five pivotal chapters of Avneet's life across different continents. Each location represents a transformative phase:

- **Punjab, India** — Birthplace and origins
- **Cape Town, South Africa** — Three-month life-changing experience working with 52 individuals from 28 countries and interning at Cape Town TV
- **Bethlehem, Pennsylvania, USA** — Four-year bachelor's degree at Lehigh University
- **London/Scotland, UK** — University travel and exploration
- **Santiago, Chile** — First international adventure to Latin America without knowing Spanish

### How It Works

Clicking on each globe pin opens a dedicated chapter page with two toggles:

1. **Personal Story** — Authentic, detailed narrative about that phase of life, values, growth, and experiences
2. **Projects & Work** — Resume-style showcase of relevant projects, skills, and professional accomplishments from that period

### Target Audience

- **Recruiters & Hiring Managers** — See creative thinking, technical ability, and personality beyond a resume
- **Friends & Family** — Connect with Avneet's journey and growth
- **New Connections** — Discover who Avneet is and what drives her

### Design Philosophy

The portfolio is intentionally creative and interactive — not static. It demonstrates technical skill, design thinking, and the ability to use modern tools (AI, web development) to bring ideas to life.

## 🏗️ PROJECT STRUCTURE
```
portfolio/
├── index.html        # Main homepage — globe
├── style.css         # All styles
├── script.js         # Globe logic 
├── chapters/
│   ├── punjab.html
│   ├── cape-town.html
│   ├── bethlehem.html
│   ├── london-scotland.html
│   └── santiago.html
└── assets/           # Images go here
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

---

## 📍 PIN LOCATIONS — EXACT COORDINATES

| Location | Lat | Lng | Emoji |
|----------|-----|-----|-------|
| Punjab, India | 31.1471 | 75.3412 | 🌱 |
| Cape Town, South Africa | -33.9249 | 18.4241 | 🌍 |
| Bethlehem, Pennsylvania | 40.6259 | -75.3705 | 🎓 |
| London & Scotland, UK | 51.5074 | -0.1278 | 🏰 |
| Santiago, Chile | -33.4489 | -70.6693 | 🌶️ |

Pin tooltip: small card, max-width 280px, dark navy 
#ffffff background, gold #001d85 border.
"Explore This Chapter →" button is small and inline — 
NEVER full width.

---

## 🎨 DESIGN SYSTEM — NEVER DEVIATE FROM THIS

### Colors
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
### Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```
- Headings + overlay words: `Playfair Display`
- Accent/UI: Outfit — modern, geometric, slightly futuristic. Perfect contrast to Playfair's elegance.

### Rules
- No harsh whites — use `#ffffff` only for overlay words
- Gold accents sparingly — only for important UI elements
- Cards: `border: 1px solid rgba(244, 162, 97, 0.2)`
- Border radius: `12px` on cards, `999px` on buttons
- No drop shadows on text unless explicitly asked

---

## 📬 NEWSLETTER

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

## 🗺️ GUESS THE DESTINATION GAME

Located in the contact section.
Answer is: **"Germany"** (also accept "Deutschland", 
case-insensitive).

Wrong guess — rotate randomly through:
- "Nope! But good guess 🤪"
- "I wish"
- "Not even close... or are you? 👀"
- "Interesting guess! Try again ✈️"

Correct guess — trigger confetti + show modal:
```
🎉 YOU GOT IT!
Deutschland, here I come! 🇩🇪
"Next stop: Germany. Follow along for the journey."
[Follow on Instagram] [Close]
```

Confetti via CDN:
`https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`

---

## 📱 SOCIAL LINKS — PLACEHOLDERS

Replace with real URLs when ready:
- LinkedIn: `https://www.linkedin.com/in/avneetkaur777/`
- Instagram: `https://www.instagram.com/avneeet_slays/`
- YouTube: `https://www.youtube.com/@avneetgrewal114`

Style: rounded square dark cards, gold glow on hover,
`transform: scale(1.1)` on hover.

---

## 📖 CHAPTER PAGES — SHARED TEMPLATE

Each chapter page has:
1. Back button: `← Back to the Globe`
2. Chapter emoji + title + location + year
3. Toggle bar: `[ 🏠 Personal Story ]  [ 💼 Work & Projects ]`
   - Smooth CSS fade between sections
   - Default: Personal Story open
4. Personal section: narrative text + photo placeholders + 
   YouTube embed placeholder
5. Work section: role, company, bullet points, skill pill tags

---

## ⚙️ ENVIRONMENT
```bash
# If you hit token limit error:
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=64000
```