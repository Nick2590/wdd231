// spotlights.js - Fetch and display spotlight members
// Embedded member data
const membersData = [
  {
    "name": "3G construction",
    "address": "1820 W Deer Valley, Phoenix, AZ",
    "phone": "602-555-1234",
    "website": "https://3gconstruction.com",
    "image": "3g_logo.jpg",
    "membership": 3,
    "description": "Local home building company all across."
  },
  {
    "name": "Valley Tech Solutions",
    "address": "2300 N Central Ave, Phoenix, AZ",
    "phone": "602-555-5678",
    "website": "https://valleytechaz.com",
    "image": "vts_logo.jpg",
    "membership": 2,
    "description": "IT and cybersecurity experts serving Arizona businesses."
  },
  {
    "name": "Sonoran Landscaping",
    "address": "4800 W Camelback Rd, Phoenix, AZ",
    "phone": "602-555-9012",
    "website": "https://sonoranlandscaping.com",
    "image": "sonoran_logo.jpg",
    "membership": 1,
    "description": "Professional desert landscaping and maintenance services."
  },
  {
    "name": "Copper Sky Real Estate",
    "address": "102 N 7th Ave, Phoenix, AZ",
    "phone": "602-555-3456",
    "website": "https://copperskyrealty.com",
    "image": "copper_logo.jpg",
    "membership": 3,
    "description": "Your trusted partner for buying and selling homes in the Valley."
  },
  {
    "name": "Downtown Fitness Club",
    "address": "215 W Washington St, Phoenix, AZ",
    "phone": "602-555-7890",
    "website": "https://downtownfitnessphx.com",
    "image": "dfc_logo.jpg",
    "membership": 1,
    "description": "Modern gym and wellness community in downtown Phoenix."
  },
  {
    "name": "Saguaro Accounting Group",
    "address": "1700 E Thomas Rd, Phoenix, AZ",
    "phone": "602-555-2222",
    "website": "https://saguaroaccounting.com",
    "image": "saguaro_logo.jpg",
    "membership": 2,
    "description": "Trusted accounting and tax solutions for local businesses."
  },
  {
    "name": "Phoenix Art Collective",
    "address": "50 N 2nd Ave, Phoenix, AZ",
    "phone": "602-555-3333",
    "website": "https://phxartcollective.org",
    "image": "phoenix_art_logo.jpg",
    "membership": 3,
    "description": "Connecting Phoenix artists through exhibits and workshops."
  }
];

const spotlightContainer = document.querySelector('#spotlight-container');

function loadSpotlights() {
    if (!spotlightContainer) {
        console.error('spotlightContainer not found');
        return;
    }
    
    // Filter only Gold (3) and Silver (2) members
    const premiumMembers = membersData.filter(m => m.membership >= 2);

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
}

loadSpotlights();
