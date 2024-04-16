import axios from 'axios';

import { viteURL } from '#config';


export class API {
    static API = `${viteURL}/api`;

    static userAppAPI = `${this.API}/userapp`;

    static studentsAPI = `${this.userAppAPI}/students`;
    static teachersAPI = `${this.userAppAPI}/teachers`;

    static courseAppAPI = `${this.API}/courseapp`;

    static enrollmentsAPI = `${this.courseAppAPI}/enrollments`;
    static coursesAPI = `${this.courseAppAPI}/courses`;
    static modulesAPI = `${this.courseAppAPI}/modules`;
    static lessonsAPI = `${this.courseAppAPI}/lessons`;
    static lessonFilesAPI = `${this.courseAppAPI}/lesson-other-files`;

    static checkpointAppAPI = `${this.API}/checkpointapp`;

    static checkpointsAPI = `${this.checkpointAppAPI}/checkpoints`;
    static passedCheckpointsAPI = `${this.checkpointAppAPI}/passed-checkpoints`;

    static standardConfig = {
        params: {
            format: 'json'
        }
    };


    static async student(id) {
        const student = (await axios.get(`${this.studentsAPI}/${id}`, this.standardConfig)).data;
        return student;
    }

    static async studentEnrollments(studentId) {
        const config = structuredClone(this.standardConfig);
        config.params.student = studentId;

        const enrollments = (await axios.get(this.enrollmentsAPI, config)).data;
        return enrollments;
    }

    static async studentCourses(studentId) {
        const enrollments = await this.studentEnrollments(studentId);

        const courses = [];
        for (const enrollment of enrollments) {
            const courseId = enrollment.course;
            const course = await this.course(courseId);
            courses.push(course);
        }

        return courses;
    }

    static async course(id) {
        const course = (await axios.get(`${this.coursesAPI}/${id}`, this.standardConfig)).data;
        return course;
    }

    static async teacher(id) {
        const teacher = (await axios.get(`${this.teachersAPI}/${id}`, this.standardConfig)).data;
        return teacher;
    }

    static async teacherCourses(teacherId) {
        const config = structuredClone(this.standardConfig);
        config.params.teacher_profile = teacherId;

        const courses = await axios.get(this.coursesAPI, config);
        return courses;
    }
}