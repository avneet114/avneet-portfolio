/* =====================================================
   SCRIPT.JS — Globe logic, pins, tooltips, game, stars
   Personal Portfolio — Avneet Kaur
   ===================================================== */

/* =====================================================
   1. STAR BACKGROUND GENERATOR
   Creates tiny CSS-animated stars scattered across the
   fixed background layer (#stars-container).
   ===================================================== */

(function generateStars() {
  const container = document.getElementById('stars-container');
  const STAR_COUNT = 150;

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random size: 1–3 px
    const size = Math.random() * 2 + 1;
    // Random position anywhere on the page
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    // Random animation duration and delay
    const duration = (Math.random() * 4 + 2).toFixed(1); // 2–6 s
    const delay    = (Math.random() * 6).toFixed(1);       // 0–6 s
    const opacity  = (Math.random() * 0.5 + 0.2).toFixed(2); // 0.2–0.7

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      --duration: ${duration}s;
      --delay: ${delay}s;
      --max-opacity: ${opacity};
    `;

    container.appendChild(star);
  }
})();

/* =====================================================
   2. GLOBE LOCATION DATA
   Each object represents a pin on the globe.
   Coordinates are in decimal degrees (lat, lng).
   ===================================================== */

const LOCATIONS = [
  {
    id: 'punjab',
    name: 'Punjab, India',
    lat: 31.1471,
    lng: 75.3412,
    flag: '🇮🇳',
    emoji: '🌱', // used in tooltip card
    year: '2005 – 2024',
    blurb: 'Punjab is where I grew up, messed up, learned a lot, and slowly started dreaming bigger.',
    url: 'chapters/punjab.html'
  },
  {
    id: 'cape-town',
    name: 'Cape Town, South Africa',
    lat: -33.9249,
    lng: 18.4241,
    flag: '🇿🇦',
    emoji: '🌍',
    year: 'March 2024 - May 2024',
    blurb: 'My first living alone. Three months in CPT changed how I see the world AND how I see myself.',
    url: 'chapters/cape-town.html'
  },
  {
    id: 'bethlehem',
    name: 'Bethlehem, Pennsylvania',
    lat: 40.6259,
    lng: -75.3705,
    flag: '🇺🇸',
    emoji: '🎓',
    year: 'August 2024 - 2028?',
    blurb: 'Moved here for my bachelors in CS & Business @ Lehigh University.',
    url: 'chapters/bethlehem.html'
  },
  {
    id: 'london-scotland',
    name: 'England & Scotland, UK',
    lat: 51.5074,
    lng: -0.1278,
    flag: '🇬🇧',
    emoji: '🏰',
    year: 'January 2025',
    blurb: 'A real estate winter study abroad program in London and Edinburgh.',
    url: 'chapters/london.html'
  },
  {
    id: 'santiago',
    name: 'Santiago, Chile',
    lat: -33.4489,
    lng: -70.6693,
    flag: '🇨🇱',
    emoji: '🌶️',
    year: 'June 2025 - July 2025',
    blurb: 'Interned @ WatGen, a climate tech startup. Found a chilean mother ❤️',
    url: 'chapters/santiago.html'
  },
  {
    id: 'canada',
    name: 'Montreal & Toronto, Canada',
    lat: 43.6532,
    lng: -79.3832,
    flag: '🇨🇦',
    emoji: '🍁',
    year: '2025 - 2026',
    blurb: 'Visited Montreal with school in summer for 5 days, then returned solo to visit cousins for 2 weeks.',
    url: 'chapters/canada.html'
  },
  {
    // Task 1.6 — appended pin, approved Aug 2026. Coordinates are Essen,
    // Germany, matching the same 51.4556°N 7.0116°E already published on
    // recap.html's "Currently" line.
    id: 'germany',
    name: 'Essen, Germany',
    lat: 51.4556,
    lng: 7.0116,
    flag: '🇩🇪',
    emoji: '🥨',
    year: 'June 2026 - July 2026',
    blurb: 'Software Engineer / PM Intern at Place Beyond Bytes, University of Duisburg-Essen.',
    url: 'chapters/germany.html'
  },
  {
    // Task 1.7 — appended pin, approved Aug 2026. ONE combined pin for the
    // Europe trip rather than five separate country pins, per the existing
    // pre-decision in claude.md (avoids unreadable pin clustering in
    // Western Europe at this altitude). Coordinates are Brussels, Belgium
    // as a reasonably central point for the group.
    id: 'europe-trip',
    name: "Euro Summer",
    lat: 50.8503,
    lng: 4.3517,
    flag: '🇪🇺',
    emoji: '🇧🇪🇳🇱🇫🇷🇨🇭🇮🇹',
    year: 'June 2026 - July 2026',
    blurb: 'Backpacked across Europe every weekend.',
    url: 'chapters/passport.html'
  }
];

// Guided tour order — chronological, ending on Euro Summer before the
// hand-off to recap.html. The full loop is Punjab -> ... -> Germany ->
// Euro Summer -> Quick Recap -> (back to) Punjab, closed by the "back
// to the journey" link on recap.html.
const TOUR_ORDER = [
  'punjab', 'cape-town', 'bethlehem', 'london-scotland',
  'santiago', 'canada', 'germany', 'europe-trip'
];

/* =====================================================
   3. TOOLTIP MANAGEMENT
   A single tooltip div is reused for all pins.
   Position is calculated to avoid going off-screen.
   ===================================================== */

const exploreClickSound = new Audio('assets/fahhh.mp3');
exploreClickSound.preload = 'auto';
const americaYeahSound = new Audio('assets/america-yeah.mp3');
americaYeahSound.preload = 'auto';

const tooltip     = document.getElementById('globe-tooltip');
const ttEmoji     = document.getElementById('tt-emoji');
const ttLocation  = document.getElementById('tt-location');
const ttYear      = document.getElementById('tt-year');
const ttBlurb     = document.getElementById('tt-blurb');
const ttLink      = document.getElementById('tt-link');

let tooltipHideTimer = null;

/**
 * Show the tooltip near a given DOM element (the pin marker).
 * Checks viewport edges and flips position as needed.
 *
 * @param {Object} data - Location data object from LOCATIONS array
 * @param {HTMLElement} pinEl - The pin DOM element on the globe
 */
function showTooltip(data, pinEl) {
  // Cancel any pending hide
  if (tooltipHideTimer) {
    clearTimeout(tooltipHideTimer);
    tooltipHideTimer = null;
  }

  // Populate tooltip content
  ttEmoji.textContent    = data.emoji;
  ttLocation.textContent = data.name;
  ttYear.textContent     = data.year;
  ttBlurb.textContent    = data.blurb;
  ttLink.href            = data.url;
  ttLink.textContent     = 'Explore This Chapter →';

  // On mobile, let CSS handle positioning (fixed bottom)
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    positionTooltipNearPin(pinEl);
  }

  tooltip.classList.add('visible');
}

/**
 * Position tooltip near the pin, flipping left/right to stay on screen.
 * @param {HTMLElement} pinEl
 */
function positionTooltipNearPin(pinEl) {
  const rect        = pinEl.getBoundingClientRect();
  const vw          = window.innerWidth;
  const vh          = window.innerHeight;
  const TT_W        = 280; // approximate tooltip width
  const TT_H        = 220; // approximate tooltip height
  const OFFSET      = 16;  // gap between pin and tooltip

  // Reset inline styles
  tooltip.style.left   = '';
  tooltip.style.right  = '';
  tooltip.style.top    = '';
  tooltip.style.bottom = '';
  tooltip.style.transform = '';

  const pinCenterX = rect.left + rect.width / 2;
  const pinCenterY = rect.top  + rect.height / 2;

  // Horizontal: prefer right side, flip to left if near right edge
  let left;
  if (pinCenterX + OFFSET + TT_W < vw - 16) {
    left = pinCenterX + OFFSET;
  } else {
    left = pinCenterX - OFFSET - TT_W;
  }

  // Vertical: center on pin, clamp to viewport
  let top = pinCenterY - TT_H / 2;
  top = Math.max(16, Math.min(top, vh - TT_H - 16));

  tooltip.style.left = `${left}px`;
  tooltip.style.top  = `${top}px`;
}

/**
 * Hide the tooltip after a short delay (lets user move from pin to tooltip).
 */
function hideTooltip() {
  tooltipHideTimer = setTimeout(() => {
    tooltip.classList.remove('visible');
  }, 200);
}

// Keep tooltip visible when mouse is over it
tooltip.addEventListener('mouseenter', () => {
  if (tooltipHideTimer) {
    clearTimeout(tooltipHideTimer);
    tooltipHideTimer = null;
  }
});

tooltip.addEventListener('mouseleave', () => {
  hideTooltip();
});

// Play sound when "Explore This Chapter" is clicked, then navigate
ttLink.addEventListener('click', (e) => {
  e.preventDefault();
  const dest = ttLink.href;
  const sound = dest.includes('bethlehem') ? americaYeahSound : exploreClickSound;
  sound.currentTime = 0;
  sound.play();
  setTimeout(() => {
    window.location.href = dest;
  }, 400);
});

/* =====================================================
   4. GLOBE INITIALISATION
   Uses Globe.gl loaded via CDN.
   Earth texture + cloud layer + 5 HTML pin markers.
   ===================================================== */

/* =====================================================
   Globe init — called directly since globe.gl is a
   synchronous <script> in <head> and is guaranteed to
   be available by the time this script executes at
   the bottom of <body>. Using window.load caused
   intermittent failures in some browsers.
   ===================================================== */
document.addEventListener('DOMContentLoaded', initGlobe);

function initGlobe() {
  const container = document.getElementById('globe-container');

  // Globe fills the full viewport — match the 100vh container
  const width  = container.clientWidth  || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  /* -- Create the Globe instance -- */
  // Globe is loaded via CDN (globe.gl) — available on window at runtime
  // eslint-disable-next-line no-undef
  const globe = Globe({ animateIn: true })(container)
    // Use https:// explicitly — protocol-relative URLs (//...) break when
    // the page is opened via file:// protocol (they become file://unpkg.com/...)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
    // Globe dimensions
    .width(width)
    .height(height)
    // Atmosphere glow (amber/gold tint)
    .atmosphereColor('#f4a261')
    .atmosphereAltitude(0.18)
    // HTML pin markers
    .htmlElementsData(LOCATIONS)
    .htmlElement(createPinElement)
    .htmlAltitude(0.01); // Slight elevation above surface

  /* -- Cloud Layer --
     Add a separate Three.js mesh for the cloud sphere.
     Rotates independently at a slow rate.
  ---------------------------------------------------------------- */
  const CLOUDS_IMG_URL       = 'https://unpkg.com/three-globe/example/img/earth-clouds.png';
  const CLOUDS_ALT           = 0.004; // altitude above globe surface
  const CLOUDS_ROTATION_DEG  = 0.4;   // degrees per second

  // Access the underlying Three.js scene + renderer via globe methods
  const THREE = window.THREE; // Globe.gl bundles Three.js globally

  if (THREE) {
    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const radius = globe.getGlobeRadius() * (1 + CLOUDS_ALT);
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 75, 75),
        new THREE.MeshPhongMaterial({
          map: cloudsTexture,
          transparent: true,
          opacity: 0.3,
          depthWrite: false
        })
      );
      globe.scene().add(clouds);

      // Rotate clouds every frame using requestAnimationFrame
      // This avoids blocking the main thread
      let lastTime = 0;
      function rotateClouds(timestamp) {
        const delta = (timestamp - lastTime) / 1000; // seconds
        lastTime = timestamp;
        // Convert deg/sec to radians
        clouds.rotation.y += (CLOUDS_ROTATION_DEG * Math.PI / 180) * delta;
        requestAnimationFrame(rotateClouds);
      }
      requestAnimationFrame(rotateClouds);
    });
  }

  /* -- Auto-rotation --
     Gentle auto-rotation resumes 3 seconds after user stops dragging.
  ---------------------------------------------------------------- */
  const controls = globe.controls();
  controls.autoRotate      = true;
  controls.autoRotateSpeed = 0.3;
  controls.enableZoom      = true;
  controls.minDistance     = 150;
  controls.maxDistance     = 600;

  let autoRotateTimer = null;

  // User starts dragging — pause rotation
  container.addEventListener('mousedown', () => {
    clearTimeout(autoRotateTimer);
    controls.autoRotate = false;
  });

  container.addEventListener('touchstart', () => {
    clearTimeout(autoRotateTimer);
    controls.autoRotate = false;
  }, { passive: true });

  // User stops dragging — schedule resume after 3 seconds
  container.addEventListener('mouseup', scheduleResumeRotation);
  container.addEventListener('touchend', scheduleResumeRotation);

  function scheduleResumeRotation() {
    clearTimeout(autoRotateTimer);
    autoRotateTimer = setTimeout(() => {
      controls.autoRotate = true;
    }, 3000);
  }

  /* -- Responsive resize --
     Recalculate globe size when window resizes.
  ---------------------------------------------------------------- */
  window.addEventListener('resize', () => {
    globe
      .width(container.clientWidth)
      .height(container.clientHeight);
  });

  // Opening frame is the guided tour's chapter 1 (Punjab — the origin
  // story), matching the chronological-first ordering used everywhere
  // else on the site (LOCATIONS order, chapter-page Next buttons).
  // Camera-only change, same authorised exception as before.
  const punjab = LOCATIONS.find(loc => loc.id === 'punjab');
  globe.pointOfView({ lat: punjab.lat, lng: punjab.lng, altitude: 2.2 }, 1000);

  // Exposes the globe instance + controls to the guided tour (below),
  // which only ever calls .pointOfView() and toggles autoRotate — same
  // camera-only surface as the rest of this authorised exception.
  window.__tourGlobe = globe;
  window.__tourControls = controls;
}

/* =====================================================
   5. PIN ELEMENT FACTORY
   Creates the DOM element for each globe pin marker.
   Attaches hover/touch events for tooltip.
   ===================================================== */

/**
 * Creates a flag pin DOM element for a given location.
 * @param {Object} d - Location data from LOCATIONS array
 * @returns {HTMLElement}
 */
function createPinElement(d) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('globe-pin');
  wrapper.setAttribute('data-id', d.id);
  wrapper.setAttribute('role', 'button');
  wrapper.setAttribute('tabindex', '0');
  wrapper.setAttribute('aria-label', `${d.name} — ${d.year}. Click to explore.`);

  const flag = document.createElement('span');
  flag.classList.add('pin-flag');
  flag.setAttribute('aria-hidden', 'true');
  flag.textContent = d.flag;
  if (typeof twemoji !== 'undefined') twemoji.parse(flag, { folder: 'svg', ext: '.svg' });
  wrapper.appendChild(flag);

  /* Desktop: hover to show tooltip */
  wrapper.addEventListener('mouseenter', () => showTooltip(d, wrapper));
  wrapper.addEventListener('mouseleave', hideTooltip);

  /* Mobile: tap to toggle tooltip */
  wrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    if (tooltip.classList.contains('visible')) {
      tooltip.classList.remove('visible');
    } else {
      showTooltip(d, wrapper);
    }
  });

  /* Keyboard: Enter/Space to show tooltip */
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showTooltip(d, wrapper);
    }
  });

  return wrapper;
}

// Dismiss tooltip when clicking outside any pin (mobile)
document.addEventListener('click', (e) => {
  if (!tooltip.contains(e.target) && !e.target.closest('.globe-pin')) {
    tooltip.classList.remove('visible');
  }
});

/* =====================================================
   6. GUIDED TOUR
   Additive UI layer, independent of the pin hover tooltip above —
   doesn't read from or write to it. Only ever calls .pointOfView()
   and toggles autoRotate on the globe exposed by initGlobe().
   ===================================================== */

function initTour() {
  const panel      = document.getElementById('tour-panel');
  const reopenBtn  = document.getElementById('tour-reopen');
  const closeBtn   = document.getElementById('tour-close');
  const prevBtn    = document.getElementById('tour-prev');
  const nextBtn    = document.getElementById('tour-next');
  const exploreBtn = document.getElementById('tour-explore');
  const progressEl = document.getElementById('tour-progress');
  const emojiEl    = document.getElementById('tour-emoji');
  const nameEl     = document.getElementById('tour-name');
  const yearEl     = document.getElementById('tour-year');
  const blurbEl    = document.getElementById('tour-blurb');

  if (!panel || !window.__tourGlobe) return; // globe failed to init — fail quiet, no tour

  let tourIndex = 0;

  function locationFor(id) {
    return LOCATIONS.find(loc => loc.id === id);
  }

  function render(index) {
    const loc = locationFor(TOUR_ORDER[index]);
    if (!loc) return;

    progressEl.textContent = `Chapter ${index + 1} of ${TOUR_ORDER.length}`;
    emojiEl.textContent    = loc.emoji;
    nameEl.textContent     = loc.name;
    yearEl.textContent     = loc.year;
    blurbEl.textContent    = loc.blurb;
    exploreBtn.href        = loc.url;

    prevBtn.disabled = index === 0;

    const isLast = index === TOUR_ORDER.length - 1;
    nextBtn.textContent = isLast ? 'Seen enough? →' : 'Next ▸';
    nextBtn.disabled = false;

    if (typeof twemoji !== 'undefined') twemoji.parse(emojiEl, { folder: 'svg', ext: '.svg' });
  }

  function flyTo(index) {
    const loc = locationFor(TOUR_ORDER[index]);
    if (!loc) return;
    window.__tourGlobe.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 2.2 }, 1000);
    window.__tourControls.autoRotate = false;
    render(index);
  }

  prevBtn.addEventListener('click', () => {
    if (tourIndex === 0) return;
    tourIndex -= 1;
    flyTo(tourIndex);
  });

  nextBtn.addEventListener('click', () => {
    if (tourIndex === TOUR_ORDER.length - 1) {
      // Last chapter — hand off to the recruiter fast lane instead of
      // wrapping around, matching the two-audience navigation model.
      window.location.href = '/recap.html';
      return;
    }
    tourIndex += 1;
    flyTo(tourIndex);
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.add('hidden');
    reopenBtn.hidden = false;
    window.__tourControls.autoRotate = true;
  });

  reopenBtn.addEventListener('click', () => {
    panel.classList.remove('hidden');
    reopenBtn.hidden = true;
    flyTo(tourIndex);
  });

  // Opening render — globe is already framed on Punjab from initGlobe(),
  // this just populates the panel text to match.
  render(tourIndex);
}

document.addEventListener('DOMContentLoaded', initTour);

