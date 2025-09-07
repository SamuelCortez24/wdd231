document.addEventListener('DOMContentLoaded', () => {
  const courses = [
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, category: "WDD", completed: true },
    { code: "WDD231", name: "Advanced Web Development", credits: 3, category: "WDD", completed: false },
    { code: "CSE212", name: "Data Structures", credits: 4, category: "CSE", completed: true },
    { code: "CSE200", name: "Intro to Programming", credits: 3, category: "CSE", completed: true },
    { code: "WDD141", name: "Responsive Design", credits: 2, category: "WDD", completed: false },
    { code: "CSE250", name: "Algorithms", credits: 4, category: "CSE", completed: false }
  ];
  const coursesList = document.getElementById('courses-list');
  const creditTotal = document.getElementById('creditTotal');
  const filterButtons = document.querySelectorAll('.filter-btn');
  function renderCourseCard(course) {
    const card = document.createElement('article');
    card.className = 'course-card' + (course.completed ? ' completed' : '');
    card.innerHTML = `<div class="title">${course.code} — ${course.name}</div>
      <div class="meta">
        <span>${course.credits} cr</span>
        <span>${course.category}</span>
        ${course.completed ? '<span>✓ Completed</span>' : ''}
      </div>`;
    return card;
  }
  function renderCourses(list) {
    coursesList.innerHTML = '';
    list.forEach(c => coursesList.appendChild(renderCourseCard(c)));
    const total = list.reduce((sum, c) => sum + c.credits, 0);
    creditTotal.textContent = total;
  }
  function filterCourses(type) {
    if (type === 'all') return courses;
    return courses.filter(c => c.category === type);
  }
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCourses(filterCourses(btn.dataset.filter));
    });
  });
  renderCourses(courses);
});