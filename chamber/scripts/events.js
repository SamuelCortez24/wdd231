async function loadEvents() {
  try {
    const res = await fetch('data/events.json');
    if (!res.ok) throw new Error('Events data not found');
    const data = await res.json();
    const list = document.getElementById('events-list');
    if (!list) return;
    list.innerHTML = '';
    data.events.forEach(ev => {
      const article = document.createElement('article');
      article.className = 'event-card';
      article.innerHTML = `
        <h3>${ev.title}</h3>
        <p><strong>Date:</strong> ${new Date(ev.date).toLocaleDateString()}</p>
        <p>${ev.description}</p>
      `;
      list.appendChild(article);
    });
  } catch (err) {
    console.error(err);
    const list = document.getElementById('events-list');
    if (list) list.innerHTML = '<p style="color:#900">Could not load events.</p>';
  }
}
document.addEventListener('DOMContentLoaded', loadEvents);