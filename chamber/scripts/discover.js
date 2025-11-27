// scripts/discover.js
import { items } from '../data/discoverItems.mjs';

const grid = document.getElementById('discover-grid');
const visitMessage = document.getElementById('visit-message');
const modal = document.getElementById('learn-modal');
const modalTitle = document.getElementById('learn-title');
const modalImg = document.getElementById('learn-img');
const modalCaption = document.getElementById('learn-caption');
const modalDesc = document.getElementById('learn-desc');
const modalAddress = document.getElementById('learn-address');
const closeLearn = document.getElementById('close-learn');

function buildCard(item, areaName) {
  const card = document.createElement('article');
  card.className = 'discover-card';
  // set grid-area so grid-template-areas can work if present
  if (areaName) card.style.gridArea = areaName;

  card.innerHTML = `
    <h2>${item.title}</h2>
    <figure>
      <img src="${item.image}" alt="${item.title} photo" loading="lazy" />
      <figcaption>${item.title}</figcaption>
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button class="learn-btn" data-id="${item.id}">Learn more</button>
  `;
  return card;
}

// Optional: area names for CSS grid-template-areas (a..h)
const areaNames = ['a','b','c','d','e','f','g','h'];

// render items
function render() {
  grid.innerHTML = '';
  items.forEach((it, i) => {
    const card = buildCard(it, areaNames[i] || null);
    grid.appendChild(card);
  });

  // wire learn more buttons
  grid.querySelectorAll('.learn-btn').forEach(btn => {
    btn.addEventListener('click', openLearn);
  });
}

// modal handling
function openLearn(e) {
  const id = e.currentTarget.dataset.id;
  const item = items.find(x => x.id === id);
  if (!item) return;
  modalTitle.textContent = item.title;
  modalImg.src = item.image;
  modalImg.alt = `${item.title} photo`;
  modalCaption.textContent = item.title;
  modalDesc.textContent = item.description;
  modalAddress.textContent = item.address;
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    // fallback for older browsers
    modal.style.display = 'block';
  }
}
closeLearn.addEventListener('click', () => {
  if (typeof modal.close === 'function') modal.close();
  else modal.style.display = 'none';
});
modal.addEventListener('click', (evt) => {
  // close when clicking outside content
  const rect = modal.getBoundingClientRect();
  if (evt.clientY < rect.top || evt.clientY > rect.bottom || evt.clientX < rect.left || evt.clientX > rect.right) {
    if (typeof modal.close === 'function') modal.close();
  }
});

// VISIT MESSAGE via localStorage
const STORAGE_KEY = 'phx_last_visit';
function showVisitMessage() {
  const now = Date.now();
  const prev = Number(localStorage.getItem(STORAGE_KEY));
  if (!prev) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor((now - prev) / msPerDay);
    if (diffDays === 0) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }
  localStorage.setItem(STORAGE_KEY, String(now));
}

// Disable image hover effect on touch devices: handled via CSS media query
// (no JS needed)

render();
showVisitMessage();
