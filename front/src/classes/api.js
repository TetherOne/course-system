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
        return (await axios.get(`${this.studentsAPI}/${id}`, this.standardConfig)).data;
    }

    static async studentEnrollments(studentId) {
        const config = structuredClone(this.standardConfig);
        config.params.student = studentId;

        return (await axios.get(this.enrollmentsAPI, config)).data;
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
        return (await axios.get(`${this.coursesAPI}/${id}`, this.standardConfig)).data;
    }

    static async teacher(id) {
        return (await axios.get(`${this.teachersAPI}/${id}`, this.standardConfig)).data;
    }

    static async teacherCourses(teacherId) {
        const config = structuredClone(this.standardConfig);
        config.params.teacher_profile = teacherId;

        return (await axios.get(this.coursesAPI, config)).data;
    }
}