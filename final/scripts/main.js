// scripts/main.js
import { fetchJSON } from './api.js';
import { renderHighlights, renderResources, populateCategoryFilter, renderReviews, openModal, closeModal } from './ui.js';

const modal = document.getElementById('modal');
const yearEls = document.querySelectorAll('#year');
yearEls.forEach(el => el.textContent = new Date().getFullYear());

// navigation toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    if (mainNav) mainNav.hidden = expanded;
  });
}

// close modal handlers
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn-close')) closeModal(modal);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal(modal);
});

// Determine which page we're on
const page = document.body.dataset.page || '';

if (page === 'home') initHome();
if (page === 'resources') initResources();
if (page === 'reviews') initReviews();

// --- Home page init ---
async function initHome(){
  const items = await fetchJSON('./data/resources.json');
  const highlightsContainer = document.getElementById('home-highlights');
  renderHighlights(highlightsContainer, items);

  // preferences controls
  const prefLarge = document.getElementById('pref-large-text');
  const prefView = document.getElementById('pref-view');

  // load persisted
  const largeText = localStorage.getItem('pref-large-text') === 'true';
  const savedView = localStorage.getItem('pref-view') || 'grid';
  document.body.style.fontSize = largeText ? '1.15rem' : '';
  prefLarge.checked = largeText;
  prefView.value = savedView;

  prefLarge.addEventListener('change', (e) => {
    localStorage.setItem('pref-large-text', e.target.checked);
    document.body.style.fontSize = e.target.checked ? '1.15rem' : '';
  });
  prefView.addEventListener('change', (e) => {
    localStorage.setItem('pref-view', e.target.value);
  });

  // quick modal open via delegation
  highlightsContainer.addEventListener('click', (e) => {
    const id = e.target.closest('[data-id]')?.dataset.id;
    if (!id) return;
    const item = items.find(i=>i.id===id);
    if (!item) return;
    openModal(modal, item.title, `
      <img src="${item.image}" alt="${item.title}" width="800" height="600" loading="lazy">
      <p>${item.description}</p>
      <p><a href="${item.url}" target="_blank" rel="noopener">Visit resource</a></p>
    `);
  });
}

// --- Resources page init ---
async function initResources(){
  const resourcesList = document.getElementById('resources-list');
  const searchInput = document.getElementById('search');
  const categorySelect = document.getElementById('filter-category');
  const viewToggle = document.getElementById('view-toggle');

  let items = await fetchJSON('./data/resources.json');

  // populate category filter
  populateCategoryFilter(categorySelect, items);

  // set view from localStorage
  const savedView = localStorage.getItem('view') || 'grid';
  viewToggle.value = savedView;
  resourcesList.classList.toggle('list', savedView === 'list');

  // render initial
  renderResources(resourcesList, items);

  // event: search and filter
  function applyFilters(){
    const q = (searchInput.value || '').toLowerCase().trim();
    const cat = categorySelect.value;
    const filtered = items.filter(i => {
      const inCat = !cat || i.category === cat;
      const inQuery = !q || (i.title + ' ' + i.description + ' ' + i.category).toLowerCase().includes(q);
      return inCat && inQuery;
    });
    renderResources(resourcesList, filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
  viewToggle.addEventListener('change', (e) => {
    const v = e.target.value;
    localStorage.setItem('view', v);
    resourcesList.classList.toggle('list', v === 'list');
  });

  // modal opening delegation
  resourcesList.addEventListener('click', (e) => {
    const id = e.target.closest('[data-id]')?.dataset.id;
    if (!id) return;
    const item = items.find(i => i.id === id);
    if (!item) return;
    openModal(modal, item.title, `
      <img src="${item.image}" alt="${item.title}" width="800" height="600" loading="lazy">
      <p>${item.description}</p>
      <ul>
        <li>Category: ${item.category}</li>
        <li>Source: ${item.source}</li>
        <li><a href="${item.url}" target="_blank" rel="noopener">Open resource</a></li>
      </ul>
    `);
  });
}

// --- Reviews page init ---
async function initReviews(){
  const reviewsList = document.getElementById('reviews-list');
  const filterRating = document.getElementById('filter-rating');

  let reviews = await fetchJSON('./data/reviews.json');

  function render(rlist){
    // sort newest first if date present
    rlist = rlist.slice().sort((a,b)=> (b.date || 0) - (a.date || 0));
    renderReviews(reviewsList, rlist);
  }
  render(reviews);

  filterRating.addEventListener('change', () => {
    const val = filterRating.value;
    const filtered = val ? reviews.filter(r => String(r.rating) === val) : reviews;
    render(filtered);
  });

  // open review modal on click
  reviewsList.addEventListener('click', (e) => {
    const id = e.target.closest('[data-id]')?.dataset.id;
    if (!id) return;
    const r = reviews.find(rr => rr.id === id);
    if (!r) return;
    openModal(modal, `${r.name} — ${r.rating}★`, `<p>${r.content}</p>`);
  });
}
