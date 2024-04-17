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

    static historyAPI = `${this.API}/history`;
    static historyOfPassedAnswersAPI = `${this.historyAPI}/history-of-passed-answers`;

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

    static async courseModules(courseId) {
        const config = structuredClone(this.standardConfig);
        config.params.course = courseId;

        const modules = (await axios.get(this.modulesAPI, config)).data;
        return modules;
    }
    
    static async moduleLessons(moduleId) {
        const config = structuredClone(this.standardConfig);
        config.params.module = moduleId;

        const lessons = (await axios.get(this.lessonsAPI, config)).data;
        return lessons;
    }

    static async moduleCheckpoints(moduleId) {
        const config = structuredClone(this.standardConfig);
        config.params.module = moduleId;

        const checkpoints = (await axios.get(this.checkpointsAPI, config)).data;
        return checkpoints;
    }

    static async checkpoint(id) {
        const checkpoint = (await axios.get(`${this.checkpointsAPI}/${id}`, this.standardConfig)).data;
        return checkpoint;
    }

    static async didStudentPassCheckpoint(studentId, checkpointId) {
        const config = structuredClone(this.standardConfig);
        config.params.student = studentId;
        config.params.checkpoint = checkpointId;

        const checkpoints = (await axios.get(this.passedCheckpointsAPI, config)).data;

        return checkpoints.length > 0;
    }

    static async studentCheckpointResult(studentId, checkpointId) {
        const config = structuredClone(this.standardConfig);
        config.params.student = studentId;
        config.params.checkpoint = checkpointId;

        const result = (await axios.get(this.passedCheckpointsAPI, config)).data[0];

        return result;
    }
}