interface Courses {
    courseName: string;
    courseCode: string;
    courseProg: string;
    courseUrl: string;
}

function createCourse(courseName: string, courseCode: string, courseProg: string, courseUrl: string): Courses {
    return {
        courseName,
        courseCode,
        courseProg,
        courseUrl
    };
}

let name = document.getElementById("course-name") as HTMLInputElement;
let code = document.getElementById("course-code") as HTMLInputElement;
let prog = document.getElementById("course-prog") as HTMLInputElement;
let url = document.getElementById("course-url") as HTMLInputElement;
let form = document.getElementById("course-form") as HTMLFormElement;

let courses: Courses[] = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let course = createCourse(name.value, code.value, prog.value, url.value);
    courses.push(course);
    form.reset();
});

let courseList = document.getElementById("course-list") as HTMLUListElement;

function displayCourses(courses: Courses[]) {
    courseList.innerHTML = "";
    courses.forEach((course) => {
        let list = document.createElement("li");
        list.textContent = `${course.courseName} (${course.courseCode}) - ${course.courseProg}`;
        courseList.appendChild(list);
    });
};