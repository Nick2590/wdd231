// scripts/ui.js
export function renderHighlights(container, items = []) {
  const sample = items.slice(0,3);
  container.innerHTML = sample.map(item => `
    <article class="card" tabindex="0">
      <img src="${item.image}" alt="${escape(item.title)}" loading="lazy" width="600" height="400">
      <h3>${escape(item.title)}</h3>
      <p class="meta">${escape(item.category)} • ${escape(item.source || '')}</p>
      <p>${escape(truncate(item.description, 100))}</p>
      <button class="btn-more" data-id="${item.id}">More</button>
    </article>
  `).join('');
}

export function renderResources(container, items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = '<p>No resources found.</p>'; return;
  }
  container.innerHTML = items.map(item => `
    <article class="resource" tabindex="0" data-id="${item.id}">
      <img src="${item.image}" alt="${escape(item.title)}" loading="lazy" width="600" height="400">
      <h3>${escape(item.title)}</h3>
      <p class="meta">${escape(item.category)} • ${escape(item.source)}</p>
      <p>${escape(truncate(item.description, 160))}</p>
      <div style="margin-top:.5rem">
        <a class="btn" href="${escapeAttr(item.url)}" target="_blank" rel="noopener">Visit</a>
        <button class="btn ghost btn-more" data-id="${item.id}" aria-haspopup="dialog">More</button>
      </div>
    </article>
  `).join('');
}

export function renderReviews(container, reviews = []) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    container.innerHTML = '<p>No reviews yet.</p>'; return;
  }
  container.innerHTML = reviews.map(r => `
    <article class="review" tabindex="0" data-id="${r.id}">
      <h3>${escape(r.name)} <small class="meta">— ${r.rating}★ • ${escape(r.category)}</small></h3>
      <p>${escape(truncate(r.content,200))}</p>
      <button class="btn ghost btn-more" data-id="${r.id}">Read</button>
    </article>
  `).join('');
}

export function populateCategoryFilter(selectEl, items = []) {
  const cats = [...new Set(items.map(i=>i.category).filter(Boolean))].sort();
  selectEl.innerHTML = `<option value="">All</option>` + cats.map(c=>`<option value="${escapeAttr(c)}">${escape(c)}</option>`).join('');
}

export function openModal(modalEl, title, htmlContent) {
  if (!modalEl) return;
  modalEl.querySelector('#modal-title').textContent = title;
  modalEl.querySelector('#modal-desc').innerHTML = htmlContent;
  if (typeof modalEl.showModal === 'function') {
    modalEl.showModal();
  } else {
    modalEl.setAttribute('open','');
    modalEl.classList.add('open');
  }
  // focus close button
  const closeBtn = modalEl.querySelector('.btn-close');
  if (closeBtn) closeBtn.focus();
}

export function closeModal(modalEl) {
  if (!modalEl) return;
  if (typeof modalEl.close === 'function') modalEl.close();
  else {
    modalEl.removeAttribute('open');
    modalEl.classList.remove('open');
  }
}

// helpers
function truncate(s, n) { return s?.length > n ? s.slice(0,n-1) + '…' : (s || ''); }
function escape(s){ return String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
function escapeAttr(s){ return String(s||'').replaceAll('"','&quot;').replaceAll("'", '&#039;'); }
