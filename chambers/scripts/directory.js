// Fetch and display members
async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  const container = document.getElementById("member-container");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership-level">Membership: ${["Member","Silver","Gold"][member.membership-1]}</p>
      <p>${member.description}</p>
    `;
    container.appendChild(card);
  });
}

// View toggle buttons
document.getElementById("grid-view").addEventListener("click", () => {
  document.getElementById("member-container").classList.replace("list-view", "grid-view");
});

document.getElementById("list-view").addEventListener("click", () => {
  document.getElementById("member-container").classList.replace("grid-view", "list-view");
});

// Footer updates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Run script
getMembers();
