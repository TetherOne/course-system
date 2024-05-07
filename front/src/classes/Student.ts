import User from '#classes/User';

import {
    Student as StudentModel,
    Course as CourseModel
} from '#models';

import Course from '#classes/Course';
import Teacher from '#classes/Teacher';

import {
    getStudentCourses,
    getTeacher
} from '#requests';



class Student extends User {
    group: string;

    constructor({ id, surname, name, father_name, faculty, group, avatar }: StudentModel) {
        super(id, surname, name, father_name, faculty, avatar);
        this.group = group;
    }

    async loadCourses(): Promise<void> {
        const courses: CourseModel[] = await getStudentCourses(this.id);

        for (const rawCourse of courses) {
            const course: Course = new Course(rawCourse);
            course.teacher = new Teacher(await getTeacher(rawCourse.teacher_profile));

            this.courses.push(course);
        }
    }
}



export default Student;