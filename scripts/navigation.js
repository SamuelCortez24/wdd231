document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-toggle-nav');
  const nav = document.getElementById('primary-nav');
  btn.addEventListener('click', () => {
    const isOpen = nav.style.display === 'block';
    nav.style.display = isOpen ? '' : 'block';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.style.display = '';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});