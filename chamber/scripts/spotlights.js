// spotlights.js - Fetch and display spotlight members
const spotlightContainer = document.querySelector('#spotlight-container');

async function loadSpotlights() {
    if (!spotlightContainer) return;
    
    try {
        const response = await fetch('../data/members.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const members = await response.json();

        // Filter only Gold (3) and Silver (2) members
        const premiumMembers = members.filter(m => m.membership >= 2);

        // Randomly shuffle
        const shuffled = premiumMembers.sort(() => Math.random() - 0.5);

        // Pick first 2-3 members
        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = '';

        selected.forEach(m => {
            spotlightContainer.innerHTML += `
                <div class="spotlight-card">
                    <img src="images/${m.image}" alt="${m.name} logo" />
                    <h3>${m.name}</h3>
                    <p>${m.phone}</p>
                    <p>${m.address}</p>
                    <a href="${m.website}" target="_blank">Visit Website</a>
                    <p class="level level-${m.membership}">
                        ${m.membership === 3 ? 'Gold Member' : 'Silver Member'}
                    </p>
                </div>
            `;
        });

    } catch (error) {
        console.error('Spotlights fetch error:', error);
    }
}

loadSpotlights();
