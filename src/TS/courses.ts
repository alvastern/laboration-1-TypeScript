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

let courses: Courses[] = [];