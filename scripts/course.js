// course.js
document.addEventListener('DOMContentLoaded', () => {
  // COPY/PASTE your official array here if you have it. This is a representative sample.
  const courses = [
    { id: 1, code: "WDD101", title: "Intro to Web Design", type: "WDD", credits: 3, completed: true },
    { id: 2, code: "WDD131", title: "HTML & CSS", type: "WDD", credits: 4, completed: true },
    { id: 3, code: "WDD231", title: "Responsive Design", type: "WDD", credits: 3, completed: false },
    { id: 4, code: "CSE111", title: "Intro to Programming", type: "CSE", credits: 3, completed: true },
    { id: 5, code: "CSE121", title: "Data Structures", type: "CSE", credits: 4, completed: false }
  ];

  // If your instructor provided a different/more complete array, replace the sample above.
  // The user should edit completed:true/false per course.

  const coursesContainer = document.getElementById('coursesContainer');
  const totalCreditsEl = document.getElementById('totalCredits');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderCourses(list) {
    coursesContainer.innerHTML = '';
    if (!list.length) {
      coursesContainer.innerHTML = '<p>No courses to display.</p>';
      totalCreditsEl.textContent = '0';
      return;
    }

    list.forEach(course => {
      const card = document.createElement('article');
      card.className = 'course-card';
      if (course.completed) card.classList.add('completed');
      card.setAttribute('tabindex','0'); // keyboard focusable

      const title = document.createElement('h3');
      title.textContent = `${course.code} — ${course.title}`;

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = `${course.type} • ${course.credits} credits`;

      const status = document.createElement('div');
      status.className = 'status';
      status.textContent = course.completed ? 'Completed' : 'In progress';

      if (course.completed) {
        status.setAttribute('aria-label','Course completed');
      } else {
        status.setAttribute('aria-label','Course not completed');
      }

      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(status);
      coursesContainer.appendChild(card);
    });

    // Update total credits using reduce on the currently displayed list
    const totalCredits = list.reduce((sum, c) => sum + Number(c.credits || 0), 0);
    totalCreditsEl.textContent = totalCredits;
  }

  // Filters
  function filterHandler(filter) {
    if (filter === 'all') renderCourses(courses);
    else {
      const filtered = courses.filter(c => c.type === filter);
      renderCourses(filtered);
    }
  }

  // Wire filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.getAttribute('data-filter');
      // visually mark active button
      filterButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      filterHandler(filter);
    });
  });

  // Initial render: All
  const defaultBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (defaultBtn) defaultBtn.classList.add('active');
  renderCourses(courses);
});
