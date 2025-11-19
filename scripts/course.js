// ========= COURSE DATA ========= //
const courses = [
  {
    subject: "WDD",
    number: "130",
    title: "Web Fundamentals",
    credits: 3,
    description: "Introduction to web development concepts including HTML and CSS.",
    certificate: "Web & Computer Programming",
    techStack: "HTML, CSS"
  },
  {
    subject: "CSE",
    number: "110",
    title: "Programming Basics",
    credits: 2,
    description: "Fundamentals of programming logic and structure.",
    certificate: "Web & Computer Programming",
    techStack: "Python, JavaScript"
  }
  // Add all your course objects here...
];


// ========= DYNAMIC COURSE BUILD ========= //
const coursesContainer = document.getElementById("coursesContainer");
const totalCreditsSpan = document.getElementById("totalCredits");

function buildCourses(filter = "all") {
  coursesContainer.innerHTML = "";
  let totalCredits = 0;

  courses
    .filter(course => filter === "all" || course.subject === filter)
    .forEach(course => {
      totalCredits += course.credits;

      const card = document.createElement("div");
      card.classList.add("course-card");
      card.setAttribute("tabindex", "0"); // Keyboard accessibility

      card.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p><strong>${course.credits} credits</strong></p>
      `;

      // Add click event to open modal
      card.addEventListener("click", () => displayCourseDetails(course));

      coursesContainer.appendChild(card);
    });

  totalCreditsSpan.textContent = totalCredits;
}

// ========= FILTER BUTTONS ========= //
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const filterValue = button.getAttribute("data-filter");
    buildCourses(filterValue);
  });
});

// ========= MODAL FUNCTIONALITY ========= //
function displayCourseDetails(course) {
  const modal = document.getElementById("course-details");

  modal.innerHTML = `
    <h3>${course.subject} ${course.number}: ${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Description:</strong> ${course.description}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p><strong>Tech Stack:</strong> ${course.techStack}</p>
    <button class="close-btn" id="closeDialog">Close</button>
  `;

  modal.showModal();

  // Close via button
  document.getElementById("closeDialog").addEventListener("click", () => modal.close());

  // Close by clicking outside modal
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
}

// ========= INITIAL LOAD ========= //
buildCourses();
