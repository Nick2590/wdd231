// scripts/output.mjs
export function setTitle(course) {
  const titleElement = document.querySelector("#courseName");
  titleElement.textContent = `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const sectionDiv = document.querySelector("#sections");
  sectionDiv.innerHTML = "";

  sections.forEach((section) => {
    const sectionInfo = document.createElement("p");
    sectionInfo.textContent = `Section ${section.sectionNum}: Enrolled: ${section.enrolled} | Room: ${section.room}`;
    sectionDiv.appendChild(sectionInfo);
  });
}
