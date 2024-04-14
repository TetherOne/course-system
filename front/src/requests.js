import axios from 'axios';

import { viteURL } from '#config';


const API = `${viteURL}/api`;

const userAppAPI = `${API}/userapp`;
const studentsAPI = `${userAppAPI}/students`;
const teachersAPI = `${userAppAPI}/teachers`;

const courseAppAPI = `${API}/courseapp`;
const coursesAPI = `${courseAppAPI}/courses`;
const modulesAPI = `${courseAppAPI}/modules`;
const lessonsAPI = `${courseAppAPI}/lessons`;
const lessonOtherFilesAPI = `${courseAppAPI}/lesson-other-files`;
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
        const course = await getCourse(courseId);
        courses.push(course);
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

export async function getCourseModules(courseId) {
    const config = structuredClone(standardConfig);
    config.params.course = courseId;

    return (await axios.get(modulesAPI, config)).data;
}

export async function getModuleLessons(moduleId) {
    const config = structuredClone(standardConfig);
    config.params.module = moduleId;

    return (await axios.get(lessonsAPI, config)).data;
}

export async function getModuleCheckpoints(moduleId) {
    const config = structuredClone(standardConfig);
    config.params.module = moduleId;

    return (await axios.get(checkpointsAPI, config)).data;
}

export async function getLessonFiles(lessonId) {
    const config = structuredClone(standardConfig);
    config.params.lesson = lessonId;

    return (await axios.get(lessonOtherFilesAPI, config)).data;
}