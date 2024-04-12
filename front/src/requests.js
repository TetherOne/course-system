import axios from 'axios';

import { viteURL } from '#config';


const API = `${viteURL}/api`;
const userAppAPI = `${API}/userapp`;
const studentsAPI = `${userAppAPI}/students`;
const teachersAPI = `${userAppAPI}/teachers`;
const courseAppAPI = `${API}/courseapp`;
const coursesAPI = `${courseAppAPI}/courses`;
const enrollmentsAPI = `${courseAppAPI}/enrollments`;
const checkpointAppAPI = `${API}/checkpointapp`;
const checkpointsAPI = `${checkpointAppAPI}/checkpoints`;


const standardConfig = {
    params: {
        format: 'json'
    }
};


export async function getStudent(id) {
    return (await axios.get(`${studentsAPI}/${id}`, standardConfig)).data;
}

async function getStudentEnrollments(studentId) {
    const config = structuredClone(standardConfig);
    config.params.student = studentId;

    return (await axios.get(enrollmentsAPI, config)).data;
}

export async function getStudentCourses(studentId) {
    const enrollments = await getStudentEnrollments(studentId);

    const courses = [];
    for (const enrollment of enrollments) {
        const courseId = enrollment.course;
        courses.push(await getCourse(courseId));
    }
    return courses;
}

export async function getCourse(id) {
    return (await axios.get(`${coursesAPI}/${id}`, standardConfig)).data;
}

export async function getTeacher(id) {
    return (await axios.get(`${teachersAPI}/${id}`, standardConfig)).data;
}

export async function getTeacherCourses(teacherId) {
    const config = structuredClone(standardConfig);
    config.params.teacher_profile = teacherId;

    return (await axios.get(coursesAPI, config)).data;
}