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
    year: '2005 – 2023',
    blurb: 'Where it all began. Born in 2005, raised for 18 years surrounded by family and culture.',
    url: 'chapters/punjab.html'
  },
  {
    id: 'cape-town',
    name: 'Cape Town, South Africa',
    lat: -33.9249,
    lng: 18.4241,
    flag: '🇿🇦',
    emoji: '🌍',
    year: 'March 2024',
    blurb: 'Lived with 52 people from 28 countries. Interned at Cape Town TV. Life changed forever.',
    url: 'chapters/cape-town.html'
  },
  {
    id: 'bethlehem',
    name: 'Bethlehem, Pennsylvania',
    lat: 40.6259,
    lng: -75.3705,
    flag: '🇺🇸',
    emoji: '🎓',
    year: 'August 2024',
    blurb: 'Moved to the States for college. New chapter, new me.',
    url: 'chapters/bethlehem.html'
  },
  {
    id: 'london-scotland',
    name: 'London & Scotland, UK',
    lat: 51.5074,
    lng: -0.1278,
    flag: '🇬🇧',
    emoji: '🏰',
    year: 'Study Abroad',
    blurb: 'A real estate study abroad adventure across the UK.',
    url: 'chapters/london-scotland.html'
  },
  {
    id: 'santiago',
    name: 'Santiago, Chile',
    lat: -33.4489,
    lng: -70.6693,
    flag: '🇨🇱',
    emoji: '🌶️',
    year: 'Chile Chapter',
    blurb: 'Moved without knowing Spanish. Found a second mother. Interned at Watgen, a climate tech startup.',
    url: 'chapters/santiago.html'
  }
];

/* =====================================================
   3. TOOLTIP MANAGEMENT
   A single tooltip div is reused for all pins.
   Position is calculated to avoid going off-screen.
   ===================================================== */

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

  // Point the globe so Asia/Africa/Europe sit in the right half of the
  // viewport — complementing the left-side hero text
  globe.pointOfView({ lat: 15, lng: 55, altitude: 2.2 }, 1000);
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
   6. NEWSLETTER
   Handled by the Beehiiv embedded iframe — no custom
   JS validation needed here.
   ===================================================== */

/* =====================================================
   7. GUESS GAME
   Answer is "Germany" (also accept "Deutschland").
   Wrong guesses rotate through fun messages.
   Correct: fire confetti + show modal.
   ===================================================== */

const gameForm   = document.getElementById('game-form');
const gameInput  = document.getElementById('game-input');
const gameResult = document.getElementById('game-result');
const guessModal = document.getElementById('guess-modal');
const modalClose = document.getElementById('modal-close');

// Correct answers (case-insensitive)
const CORRECT_ANSWERS = ['germany', 'deutschland'];

// Rotating wrong-guess messages
const WRONG_MESSAGES = [
  "Nope! But great taste 😄",
  "Cold! Keep exploring 🗺️",
  "Not even close... or are you? 👀",
  "Interesting guess! Try again ✈️"
];

// Track which wrong message to show next (rotates through the list)
let wrongMsgIndex = 0;

gameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const guess = gameInput.value.trim().toLowerCase();

  if (!guess) {
    gameResult.textContent = 'Type a guess first! 🗺️';
    gameResult.className   = 'game-result';
    return;
  }

  if (CORRECT_ANSWERS.includes(guess)) {
    // ✅ CORRECT GUESS
    handleCorrectGuess();
  } else {
    // ❌ WRONG GUESS — rotate through fun messages
    gameResult.textContent = WRONG_MESSAGES[wrongMsgIndex % WRONG_MESSAGES.length];
    gameResult.className   = 'game-result wrong';
    wrongMsgIndex++;

    // Shake animation on the input
    gameInput.style.animation = 'none';
    // Trigger reflow to restart animation
    void gameInput.offsetWidth;
    gameInput.style.animation = '';
  }
});

/**
 * Handle a correct guess:
 * 1. Fire confetti
 * 2. Show the success modal
 */
function handleCorrectGuess() {
  gameResult.textContent = '🎉 YOU GOT IT! Opening the celebration...';
  gameResult.className   = 'game-result correct';

  // Fire confetti burst
  fireConfetti();

  // Show modal after a brief delay so confetti starts first
  setTimeout(() => {
    guessModal.classList.add('visible');
    modalClose.focus();
  }, 400);
}

/**
 * Confetti animation using canvas-confetti CDN library.
 * Fires two bursts from opposite corners for a party effect.
 */
function fireConfetti() {
  const defaults = {
    colors: ['#f4a261', '#e76f51', '#ffd700', '#ffffff', '#ff6b6b'],
    zIndex: 3000
  };

  // Left burst
  confetti({
    ...defaults,
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 }
  });

  // Right burst
  confetti({
    ...defaults,
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 }
  });

  // Center cascade after short delay
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 120,
      spread: 90,
      origin: { x: 0.5, y: 0.4 }
    });
  }, 250);
}

/* -- Modal close handlers -- */

// Close button
modalClose.addEventListener('click', closeModal);

// Click outside modal card
guessModal.addEventListener('click', (e) => {
  if (e.target === guessModal) closeModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && guessModal.classList.contains('visible')) {
    closeModal();
  }
});

function closeModal() {
  guessModal.classList.remove('visible');
  gameInput.value = '';
  gameResult.textContent = '';
  gameResult.className   = 'game-result';
}

/* =====================================================
   8. SMOOTH SCROLL POLYFILL CHECK
   The CSS scroll-behavior: smooth handles most cases,
   but this ensures anchor links behave nicely.
   ===================================================== */

// Already handled globally by `html { scroll-behavior: smooth }` in CSS.
// No JS needed unless polyfill required for older browsers.
