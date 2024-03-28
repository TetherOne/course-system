import axios from 'axios';
import { frontURL } from './config.js';


const userAppAPI = `${frontURL}/api/userapp`;
const courseAppAPI = `${frontURL}/api/courseapp`;
const checkPointAppAPI = `${frontURL}/api/checkpointapp`;


export async function getStudent(id) {
    return (await axios.get(`${userAppAPI}/students/${id}?format=json`)).data;
}

export async function getTeacher(id) {
    return (await axios.get(`${userAppAPI}/teachers/${id}?format=json`)).data;
}

export async function getCourse(id) {
    return (await axios.get(`${courseAppAPI}/courses/${id}?format=json`)).data;
}

export async function getStudentCourses(id) {
    const enrollments = (await axios.get(`${courseAppAPI}/enrollments?student=${id}&format=json`)).data;

    const courses = [];
    for (const enrollment of enrollments) {
        courses.push(await getCourse(enrollment.course));
    }

    return courses;
}

export async function getTeacherCourses(id) {
    return (await axios.get(`${courseAppAPI}/courses?teacher_profile=${id}&format=json`)).data;
}

export async function getCourseModules(id) {
    return (await axios.get(`${courseAppAPI}/modules?course=${id}&format=json`)).data;
}

export async function getModuleLessons(id) {
    return (await axios.get(`${courseAppAPI}/lessons?module=${id}&format=json`)).data;
}

export async function getLessonOtherFiles(id) {
    return (await axios.get(`${courseAppAPI}/lesson-other-files?lesson=${id}&format=json`)).data;
}

export async function getModuleCheckPoint(id) {
    return (await axios.get(`${checkPointAppAPI}/checkpoints?module=${id}&format=json`)).data[0];
}

export async function getCheckPoint(id) {
    return (await axios.get(`${checkPointAppAPI}/checkpoints/${id}?format=json`)).data;
}