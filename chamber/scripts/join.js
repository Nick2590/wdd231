// join.js – timestamp + modal functionality

// Set timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// MODALS
const cards = document.querySelectorAll('.benefit-card');
const modals = document.querySelectorAll('dialog');
const closeButtons = document.querySelectorAll('.close-modal');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        document.getElementById(modalId).showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.close();
    });
});
