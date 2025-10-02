document.addEventListener('DOMContentLoaded', () => {
  const p = (name) => decodeURIComponent((new URLSearchParams(window.location.search)).get(name) || '');
  const info = {
    firstName: p('firstName'),
    lastName: p('lastName'),
    email: p('email'),
    mobile: p('mobile'),
    business: p('business'),
    timestamp: p('timestamp')
  };
  const container = document.getElementById('submitted-info');
  if (!container) return;
  container.innerHTML = `
    <dl>
      <dt>First Name</dt><dd>${info.firstName || '—'}</dd>
      <dt>Last Name</dt><dd>${info.lastName || '—'}</dd>
      <dt>Email</dt><dd>${info.email || '—'}</dd>
      <dt>Mobile</dt><dd>${info.mobile || '—'}</dd>
      <dt>Business</dt><dd>${info.business || '—'}</dd>
      <dt>Submitted At</dt><dd>${info.timestamp ? new Date(info.timestamp).toLocaleString() : '—'}</dd>
    </dl>
  `;
});