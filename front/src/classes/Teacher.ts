import {
    Teacher as TeacherModel,
    Course as CourseModel
} from '#models';

import User from '#classes/User';
import Course from '#classes/Course';

import { getTeacherCourses } from '#requests';



export default class Teacher extends User {
    constructor({ id, surname, name, father_name, faculty, avatar }: TeacherModel) {
        super(id, surname, name, father_name, faculty, avatar);
    }

    async loadCourses(): Promise<void> {
        const rawCourses: CourseModel[] = await getTeacherCourses(this.id);

        for (const rawCourse of rawCourses) {
            this.courses.push(new Course(rawCourse));
        }
    }
}