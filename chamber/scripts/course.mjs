// scripts/course.mjs
const byuiCourse = {
  code: "WDD231",
  name: "Front-End Web Development II",
  sections: [
    { sectionNum: 1, enrolled: 26, room: "STC 353" },
    { sectionNum: 2, enrolled: 28, room: "STC 347" },
    { sectionNum: 3, enrolled: 30, room: "STC 349" },
  ],

  // Method to change enrollment (add/drop)
  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find((s) => s.sectionNum == sectionNum);
    if (section) {
      if (enroll) {
        section.enrolled++;
      } else {
        section.enrolled--;
      }
    }
  },
};

export default byuiCourse;
