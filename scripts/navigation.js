// navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  function closeMenu() {
    primaryNav.style.display = 'none';
    navToggle.setAttribute('aria-expanded','false');
  }
  function openMenu() {
    primaryNav.style.display = 'block';
    navToggle.setAttribute('aria-expanded','true');
  }

  // Toggle on button click
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  });

  // Ensure nav visibility matches CSS on resize (desktop/large screens)
  function checkResize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      // Let CSS display block the nav horizontally; remove inline style to avoid conflict
      primaryNav.style.display = '';
      navToggle.setAttribute('aria-expanded','false');
    } else {
      // On narrow screens, hide nav by default
      primaryNav.style.display = 'none';
    }
  }

  window.addEventListener('resize', checkResize);
  checkResize();
});
