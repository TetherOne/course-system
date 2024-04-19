import axios from 'axios';

import {viteURL} from '#config';


const API_URL = `${viteURL}/api`;

const userApp = `${API_URL}/userapp`;

const students = `${userApp}/students/`;
const teachers = `${userApp}/teachers/`;

const courseApp = `${API_URL}/courseapp`;

const enrollments = `${courseApp}/enrollments/`;
const courses = `${courseApp}/courses/`;
const modules = `${courseApp}/modules/`;
const lessons = `${courseApp}/lessons/`;
const lessonFiles = `${courseApp}/lesson-other-files/`;

const checkpointApp = `${API_URL}/checkpointapp`;

const checkpoints = `${checkpointApp}/checkpoints/`;
const passedCheckpoints = `${checkpointApp}/passed-checkpoints/`;

const history = `${API_URL}/history`;

const historyOfPassedAnswers = `${history}/history-of-passed-answers/`;

const standardConfig = {
    params: {
        format: 'json'
    }
};


export class API {
    static async student(id) {
        return (await axios.get(`${students}${id}`, standardConfig)).data;
    }

    static async studentEnrollments(studentId) {
        const config = structuredClone(standardConfig);
        config.params.student = studentId;

        return (await axios.get(enrollments, config)).data;
    }

    static async studentCourses(studentId) {
        const enrollments = await API.studentEnrollments(studentId);

        const courses = [];
        for (const enrollment of enrollments) {
            const courseId = enrollment.course;
            const course = await this.course(courseId);
            courses.push(course);
        }

        return courses;
    }

    static async course(id) {
        return (await axios.get(`${courses}${id}`, standardConfig)).data;
    }

    static async teacher(id) {
        return (await axios.get(`${teachers}${id}`, standardConfig)).data;
    }

    static async teacherCourses(teacherId) {
        const config = structuredClone(standardConfig);
        config.params.teacher_profile = teacherId;

        return (await axios.get(courses, config)).data;
    }

    static async courseModules(courseId) {
        const config = structuredClone(standardConfig);
        config.params.course = courseId;

        return (await axios.get(modules, config)).data;
    }
    
    static async moduleLessons(moduleId) {
        const config = structuredClone(standardConfig);
        config.params.module = moduleId;

        return (await axios.get(lessons, config)).data;
    }

    static async moduleCheckpoints(moduleId) {
        const config = structuredClone(standardConfig);
        config.params.module = moduleId;

        return (await axios.get(checkpoints, config)).data;
    }

    static async checkpoint(id) {
        return (await axios.get(`${checkpoints}${id}`, standardConfig)).data;
    }
}