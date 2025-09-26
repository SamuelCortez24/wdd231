// chamber/scripts/directory.js
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#members");

function setActiveButton(activeBtn, inactiveBtn){
  activeBtn.setAttribute('aria-pressed','true');
  inactiveBtn.setAttribute('aria-pressed','false');
}

// Toggle views
if (gridButton && listButton && display) {
  gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
    setActiveButton(gridButton, listButton);
  });
  listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
    setActiveButton(listButton, gridButton);
  });
}

// Fetch members.json and display
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    displayMembers(data.members);
  } catch (err) {
    if (display) display.innerHTML = '<p style="color:#900">Failed to load members data.</p>';
    console.error(err);
  }
}

function displayMembers(members) {
  if (!display) return;
  display.innerHTML = "";
  members.forEach(member => {
    const section = document.createElement("section");
    section.classList.add("member-card");
    section.innerHTML = `
      <div class="img-wrapper">
        <img src="images/${member.image}" alt="${member.name} logo">
      </div>
      <div class="member-info">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p>Membership: ${member.membership}</p>
      </div>
    `;
    display.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", getMembers);
