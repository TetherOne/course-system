import axios from 'axios';

import {
    frontURL
} from './config.js';

import {
    shortenName
} from './functions.js';


export const userAPI = `${frontURL}/api/userapp`;
export const courseAPI = `${frontURL}/api/courseapp`;
export const checkPointAPI = `${frontURL}/api/checkpointapp`;


export async function getStudent(id) {
    const rawStudent = (await axios.get(`${userAPI}/students/${id}/?format=json`)).data;

    return {
        id: rawStudent.id,
        surname: rawStudent.surname,
        name: rawStudent.name,
        fatherName: rawStudent.father_name,
        faculty: rawStudent.faculty,
        group: rawStudent.group,
        avatar: rawStudent.avatar
    }
}

async function getStudentEnrollments(id) {
    const rawEnrollments = (await axios.get(`${courseAPI}/enrollments/?student=${id}&format=json`)).data;
    const enrollments = rawEnrollments.map(enrollment => {
        return {
            id: enrollment.id,
            courseId: enrollment.course
        }
    });

    return enrollments;
}

export async function getStudentCourses(id) {
    const enrollments = await getStudentEnrollments(id);
    const courses = [];

    for (const enrollment of enrollments) {
        const course = await getCourse(enrollment.courseId);

        const courseTeacher = await getTeacher(course.teacherId);
        course.teacherShortName = shortenName(courseTeacher.surname, courseTeacher.name, courseTeacher.fatherName);

        courses.push(course);
    }

    return courses;
}

export async function getCourse(id) {
    const rawCourse = (await axios.get(`${courseAPI}/courses/${id}/?format=json`)).data;

    return {
        id: rawCourse.id,
        name: rawCourse.course_name,
        description: rawCourse.description,
        password: rawCourse.course_password,
        teacherId: rawCourse.teacher_profile
    }
}

export async function getTeacher(id) {
    const rawTeacher = (await axios.get(`${userAPI}/teachers/${id}/?format=json`)).data;

    return {
        id: rawTeacher.id,
        surname: rawTeacher.surname,
        name: rawTeacher.name,
        fatherName: rawTeacher.father_name,
        faculty: rawTeacher.faculty,
        avatar: rawTeacher.avatar
    }
}

export async function getTeacherCourses(id) {
    const rawCourses = (await axios.get(`${courseAPI}/courses/?teacher_profile=${id}&format=json`)).data;
    const courses = rawCourses.map(course => {
        return {
            id: course.id,
            name: course.course_name,
            description: course.description,
            password: course.course_password
        }
    });

    return courses;
}

export async function getCourseModules(courseId) {
    const rawModules = (await axios.get(`${courseAPI}/modules/?course=${courseId}&format=json`)).data;
    const modules = rawModules.map(module => {
        return {
            id: module.id,
            name: module.module_name
        }
    });

    return modules;
}

export async function getModule(id) {
    const rawModule = (await axios.get(`${courseAPI}/modules/${id}/?format=json`)).data;

    return {
        id: rawModule.id,
        name: rawModule.module_name
    }
}

export async function getModuleLessons(moduleId) {
    const rawLessons = (await axios.get(`${courseAPI}/lessons/?module=${moduleId}&format=json`)).data;
    const lessons = rawLessons.map(lesson => {
        return {
            id: lesson.id,
            name: lesson.lesson_name,
            description: lesson.description,
            video: lesson.video
        }
    });

    return lessons;
}

export async function getLesson(id) {
    const rawLesson = (await axios.get(`${courseAPI}/lessons/${id}/?format=json`)).data;

    return {
        id: rawLesson.id,
        name: rawLesson.lesson_name,
        description: rawLesson.description,
        video: rawLesson.video
    }
}

export async function getCheckPoint(id) {
    const rawCheckPoint = (await axios.get(`${checkPointAPI}/checkpoints/${id}/?format=json`)).data;
    const checkPoint = {
        id: rawCheckPoint.id,
        title: rawCheckPoint.title,
        questions: rawCheckPoint.questions
    }

    return checkPoint;
}

export async function getModuleCheckPoint(moduleId) {
    const rawCheckPoint = (await axios.get(`${checkPointAPI}/checkpoints/?module=${moduleId}&format=json`)).data[0];

    return {
        id: rawCheckPoint.id,
        title: rawCheckPoint.title,
        questions: rawCheckPoint.questions
    }
}

export async function getStudentPassedCheckPoints(studentId) {
    const checkPoints = (await axios.get(`${checkPointAPI}/passed-checkpoints/?student=${studentId}&format=json`)).data;

    return checkPoints;
}

export async function getCheckPointResults(studentId, checkPointId) {
    const result = (await axios.get(`${checkPointAPI}/passed-checkpoints/?student=${studentId}&checkpoint=${checkPointId}&format=json`)).data[0];

    return result;
}