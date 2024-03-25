import axios from 'axios';

import { frontURL } from './config.js';


export async function getStudentInfo(id) {
    return (await axios.get(`${frontURL}/api/userapp/students/${id}/?format=json`)).data;
}

export async function getTeacherInfo(id) {
    return (await axios.get(`${frontURL}/api/userapp/teachers/${id}/?format=json`)).data;
}

export async function getStudentCourses(id) {
    const enrollments = (await axios.get(`${frontURL}/api/courseapp/enrollments/?student=${id}&format=json`)).data;
    const N = enrollments.length;
    const courses = [];
    for (let i = 0; i < N; i++) {
        const courseId = enrollments[i].course;
        courses.push(await getCourseInfo(courseId));
    }
    return courses;
}

export async function getTeacherCourses(id) {
    return (await axios.get(`${frontURL}/api/courseapp/courses?teacher_profile=${id}&format=json`)).data;
}

export async function getCourseInfo(id) {
    return (await axios.get(`${frontURL}/api/courseapp/courses/${id}/?format=json`)).data;
}

export async function getModuleVideos(id) {
    return (await axios.get(`${frontURL}/api/courseapp/lessons/?module=${id}&format=json`)).data;
}

export async function getLesson(id) {
    return (await axios.get(`${frontURL}/api/courseapp/lessons/${id}?format=json`)).data;
}

export async function getLessonOtherFiles(id) {
    return (await axios.get(`${frontURL}/api/courseapp/lesson-other-files?lesson=${id}&format=json`)).data;
}