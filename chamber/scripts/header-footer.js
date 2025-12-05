// Header & Footer JS for Phoenix Chamber

// MOBILE MENU TOGGLE
const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
}

// FOOTER: CURRENT YEAR
const currentYear = document.querySelector('#current-year');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// FOOTER: LAST MODIFIED DATE
const lastModified = document.querySelector('#last-modified');
if (lastModified) {
    lastModified.textContent = document.lastModified;
}
