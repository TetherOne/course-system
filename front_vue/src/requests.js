import axios from 'axios';

import {frontURL} from './config.js';


export function getStudentInfo(id) {
    return axios.get(`${frontURL}/api/userapp/students/${id}/?format=json`).then(
        response => response.data
    );
}

export function getTeacherInfo(id) {
    return axios.get(`${frontURL}/api/userapp/teachers/${id}/?format=json`).then(
        response => response.data
    );
}

export function getStudentCourses(id) {
    return axios.get(`${frontURL}/api/courseapp/enrollments/?student=${id}&format=json`).then(
        response => response.data
    ).then(
        enrollments => {
            const courses = enrollments.map(enrollment => {

            })
        }
    );
}

export function getCourseInfo(id) {
    return axios.get(`${frontURL}/api/courseapp/courses/${id}/?format=json`).then(
        response => response.data
    );
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