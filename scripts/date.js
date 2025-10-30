// date.js
document.addEventListener('DOMContentLoaded', () => {
  const copyrightYearEl = document.getElementById('copyrightYear');
  const lastModifiedEl = document.getElementById('lastModified');

  if (copyrightYearEl) {
    const year = new Date().getFullYear();
    copyrightYearEl.textContent = year;
  }

  if (lastModifiedEl) {
    // document.lastModified returns a string
    lastModifiedEl.textContent = document.lastModified;
  }
});
