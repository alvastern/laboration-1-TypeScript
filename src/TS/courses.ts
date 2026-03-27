import "../css/main.scss"; 

type Progression = "A" | "B" | "C"; // Skapar en egen typ för progressioner

// Interface för att definiera en kurs, datatyper definieras
interface Courses {
    courseName: string;
    courseCode: string;
    courseUrl: string;
    courseProg: Progression;
}

// Funktion för att skapa en kurs - datatyper definieras
function createCourse(courseName: string, courseCode: string, courseProg: Progression, courseUrl: string): Courses {
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

    // Validerar av formulär
    let nameValue = name.value.trim();
    let codeValue = code.value.trim();
    let progValue = prog.value.trim();
    let urlValue = url.value.trim();

    // Alla fält måste fyllas i
    if (!nameValue || !codeValue || !progValue || !urlValue) {
        alert("Alla fält måste fyllas i.");
        return;
    }

    // Progressionen måste vara A, B eller C
    if (!["A", "B", "C"].includes(progValue)) {
        alert("Progressionen måste vara A, B eller C.");
        return;
    }

    // Kurskoden måste vara unik
    if (courses.some(c => c.courseCode === codeValue)) {
        alert("En kurs med denna kurskod finns redan.");
        return;
    }

    // Skapa en kurs och lägg till i arrayen
    let course = createCourse(nameValue, codeValue, progValue as Progression, urlValue);
    courses.push(course);
    form.reset();

    // Spara kurserna i local storage
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses(courses);
});

// Hämtar den tomma listan från DOM där alla kurser ska visas
let courseList = document.getElementById("course-list") as HTMLUListElement;

// Funktion för att visa alla kurser i listan, samt radera en kurs
function displayCourses(courses: Courses[]) {
    courseList.innerHTML = "";

    // Loopar igenom arrayen och visar varje kurs
    courses.forEach((course, index) => {
        let list = document.createElement("li")
        let link = document.createElement ("a");

        link.href = course.courseUrl;
        link.textContent = "Kursplan";
        link.target = "_blank";
        list.textContent = `${course.courseName} (${course.courseCode}) - ${course.courseProg}`;
        
        // Skapar en knapp för att radera en kurs
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Radera kurs";

        // Eventlyssnare på radera-knappen som tar bort kursen
        deleteButton.addEventListener("click", () => {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses(courses);
        })

        // Lägger till de nya elementen i DOM
        list.appendChild(deleteButton);
        courseList.appendChild(list);
        list.appendChild(link);
    });
};

displayCourses(courses); // Kör funktionen