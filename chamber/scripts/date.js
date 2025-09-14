document.addEventListener('DOMContentLoaded', () => {
  const y = document.querySelector("#currentyear");
  if (y) y.textContent = new Date().getFullYear();
  const lm = document.querySelector("#lastModified");
  if (lm) lm.textContent = document.lastModified || 'Unavailable';
});
