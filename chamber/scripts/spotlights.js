// chamber/scripts/spotlights.js
async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Members data not found');
    const data = await res.json();
    const members = data.members.filter(m => ['Gold','Silver','gold','silver'].includes(m.membership));
    for (let i = members.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [members[i], members[j]] = [members[j], members[i]];
    }
    const count = Math.min(3, Math.max(2, Math.floor(Math.random()*3)+1));
    const selected = members.slice(0, count);

    const container = document.getElementById('spotlights');
    if (!container) return;
    container.innerHTML = '';
    selected.forEach(member => {
      const s = document.createElement('section');
      s.className = 'member-card';
      s.innerHTML = `
        <div class="img-wrapper">
          <img src="images/${member.image}" alt="${member.name} logo">
        </div>
        <div class="member-info">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>Membership:</strong> ${member.membership}</p>
        </div>
      `;
      container.appendChild(s);
    });
  } catch (err) {
    console.error(err);
    const container = document.getElementById('spotlights');
    if (container) container.innerHTML = '<p style="color:#900">Could not load spotlights.</p>';
  }
}
document.addEventListener('DOMContentLoaded', loadSpotlights);
