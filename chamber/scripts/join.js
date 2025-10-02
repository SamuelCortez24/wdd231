document.addEventListener('DOMContentLoaded', () => {
  const ts = document.getElementById('timestamp');
  if (ts) ts.value = new Date().toISOString();

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    const close = modal.querySelector('.modal-close');
    if (close) close.focus();
  }
  function closeModal(modal) {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.more-info, .card').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.getAttribute('data-modal') || el.dataset.modal;
      if (id) openModal(id);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = el.getAttribute('data-modal') || el.dataset.modal;
        if (id) openModal(id);
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  setTimeout(() => {
    const cards = document.getElementById('cards');
    if (cards) cards.classList.add('animate-in');
  }, 150);
});