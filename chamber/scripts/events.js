// scripts/events.js — robust renderer for Upcoming Events
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('events-list');
  if (!container) return;

  try {
    const resp = await fetch('data/events.json', { cache: 'no-store' });
    if (!resp.ok) throw new Error('events.json not found');

    const events = await resp.json();
    if (!Array.isArray(events) || events.length === 0) {
      console.info('events.js: no events in JSON; keeping fallback HTML');
      return;
    }

    const frag = document.createDocumentFragment();
    events.forEach(ev => {
      const art = document.createElement('article');
      art.className = 'event-card';
      const left = document.createElement('div');
      left.className = 'event-left';

      const h = document.createElement('h3');
      h.className = 'event-title';
      h.textContent = ev.title || 'Untitled event';

      const date = document.createElement('p');
      date.className = 'event-date';
      date.innerHTML = '<strong>Date:</strong> ' + (ev.date || 'TBD');

      const desc = document.createElement('p');
      desc.className = 'event-desc';
      desc.textContent = ev.desc || '';

      left.appendChild(h);
      left.appendChild(date);
      left.appendChild(desc);
      art.appendChild(left);
      frag.appendChild(art);
    });

    container.innerHTML = '';
    container.appendChild(frag);

  } catch (err) {
    console.warn('events.js: could not load events.json, using fallback.', err);
  }
});
