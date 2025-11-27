// scripts/discover.js
import discoverItems from '../data/discoverItems.mjs';

const grid = document.querySelector('#discover-grid');
const modal = document.querySelector('#learn-modal');
const modalTitle = document.querySelector('#learn-title');
const modalImg = document.querySelector('#learn-img');
const modalCaption = document.querySelector('#learn-caption');
const modalDesc = document.querySelector('#learn-desc');
const modalAddress = document.querySelector('#learn-address');
const closeBtn = document.querySelector('#close-learn');

// Function to create all cards
function createCards() {
    discoverItems.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('discover-card');

        card.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img src="${place.image}" alt="${place.title}">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="cta-button" data-title="${place.title}">Learn More</button>
        `;

        // Add event listener to open modal
        card.querySelector('button').addEventListener('click', () => openModal(place));

        grid.appendChild(card);
    });
}

// Open modal
function openModal(place) {
    modalTitle.textContent = place.title;
    modalImg.src = place.image;
    modalImg.alt = place.title;
    modalCaption.textContent = place.title;
    modalDesc.textContent = place.description;
    modalAddress.textContent = place.address;

    modal.showModal();
}

// Close modal
closeBtn.addEventListener('click', () => modal.close());

// Close modal when clicking outside of content
modal.addEventListener('click', e => {
    if (e.target === modal) modal.close();
});

// Initialize
createCards();
