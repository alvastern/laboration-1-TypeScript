// Interface för att definiera en kurs, datatyper definieras
interface Courses {
    courseName: string;
    courseCode: string;
    courseProg: string;
    courseUrl: string;
}

// Funktion för att skapa en kurs - datatyper definieras
function createCourse(courseName: string, courseCode: string, courseProg: string, courseUrl: string): Courses {
    return {
        courseName,
        courseCode,
        courseProg,
        courseUrl
    };
}

// Hämtar element från DOM
let name = document.getElementById("course-name") as HTMLInputElement;
let code = document.getElementById("course-code") as HTMLInputElement;
let prog = document.getElementById("course-prog") as HTMLInputElement;
let url = document.getElementById("course-url") as HTMLInputElement;
let form = document.getElementById("course-form") as HTMLFormElement;

// Alla kurser sparas i denna array
let courses: Courses[] = [];

// Kursers som lagts till ska sparas i local storage, samt inte försvinna när sidan laddas om
let savedCourses = localStorage.getItem("courses");
if (savedCourses) {
    courses = JSON.parse(savedCourses);
};

// När formuläret skickas skapas en kurs och läggs till i arrayen
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Skapa en kurs och lägg till i arrayen
    let course = createCourse(name.value, code.value, prog.value, url.value);
    courses.push(course);
    form.reset();

    // Spara kurserna i local storage
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses(courses);
});

let courseList = document.getElementById("course-list") as HTMLUListElement;

function displayCourses(courses: Courses[]) {
    courseList.innerHTML = "";

    courses.forEach((course, index) => {
        let list = document.createElement("li");

        list.textContent = `${course.courseName} (${course.courseCode}) - ${course.courseProg}`;
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Radera kurs";

        deleteButton.addEventListener("click", () => {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses(courses);
        })

        list.appendChild(deleteButton);
        courseList.appendChild(list);
    });
};

displayCourses(courses);