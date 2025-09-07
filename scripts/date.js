document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentyear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const lastModifiedEl = document.getElementById('lastModifiedText');
  if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified || 'Unavailable';
});