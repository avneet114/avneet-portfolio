/* =====================================================
   CHAPTER-SHARED.JS
   Shared JavaScript for all 5 chapter pages.
   Handles: star background, tab toggle animation.
   ===================================================== */

/* =====================================================
   1. STAR BACKGROUND GENERATOR
   Same logic as the homepage — generates twinkling
   stars into #stars-container on each chapter page.
   ===================================================== */

(function generateStars() {
  const container = document.getElementById('stars-container');
  if (!container) return;

  const STAR_COUNT = 120;

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size     = Math.random() * 2 + 1;
    const x        = Math.random() * 100;
    const y        = Math.random() * 100;
    const duration = (Math.random() * 4 + 2).toFixed(1);
    const delay    = (Math.random() * 6).toFixed(1);
    const opacity  = (Math.random() * 0.5 + 0.2).toFixed(2);

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
   2. TAB TOGGLE
   Switches between "Personal Story" and "Work" sections.
   Uses a cross-fade animation defined in chapter.css.

   Called from onclick="switchTab('personal')" or
   onclick="switchTab('work')" on the toggle buttons.
   ===================================================== */

/**
 * Switch the visible chapter section (personal or work).
 * Handles ARIA attributes, button active states, and
 * CSS class transitions.
 *
 * @param {'personal'|'work'} tab - Which tab to activate
 */
function switchTab(tab) {
  const personalSection = document.getElementById('section-personal');
  const workSection     = document.getElementById('section-work');
  const personalBtn     = document.getElementById('tab-personal');
  const workBtn         = document.getElementById('tab-work');

  if (!personalSection || !workSection || !personalBtn || !workBtn) return;

  if (tab === 'personal') {
    // Activate Personal Story
    personalSection.classList.add('active');
    workSection.classList.remove('active');

    personalBtn.classList.add('active');
    personalBtn.setAttribute('aria-selected', 'true');

    workBtn.classList.remove('active');
    workBtn.setAttribute('aria-selected', 'false');

  } else if (tab === 'work') {
    // Activate Work & Projects
    workSection.classList.add('active');
    personalSection.classList.remove('active');

    workBtn.classList.add('active');
    workBtn.setAttribute('aria-selected', 'true');

    personalBtn.classList.remove('active');
    personalBtn.setAttribute('aria-selected', 'false');
  }
}

/* =====================================================
   3. KEYBOARD NAVIGATION FOR TOGGLE TABS
   Arrow keys move between the two toggle buttons,
   matching standard ARIA tablist keyboard behaviour.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.toggle-btn');

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIndex = (index + 1) % tabButtons.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        tabButtons[targetIndex].focus();
        tabButtons[targetIndex].click();
      }
    });
  });
});
