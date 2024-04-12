import axios from 'axios';

import { viteURL } from '#config';


const API = `${viteURL}/api`;
const userAppAPI = `${API}/userapp`;
const studentsAPI = `${userAppAPI}/students`;
const teachersAPI = `${userAppAPI}/teachers`;
const courseAppAPI = `${API}/courseapp`;
const checkpointAppAPI = `${API}/checkpointapp`;

const standardConfig = {
    params: {
        format: 'json'
    }
};


export async function getStudent(id) {
    return (await axios.get(`${userAppAPI}/students`, standardConfig)).data;
}

async function getStudentEnrollments(id) {
    const rawEnrollments = (await axios.get(`${courseAppAPI}/enrollments/?student=${id}&format=json`)).data;
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
    const rawCourse = (await axios.get(`${courseAppAPI}/courses/${id}/?format=json`)).data;

    return {
        id: rawCourse.id,
        name: rawCourse.course_name,
        description: rawCourse.description,
        password: rawCourse.course_password,
        teacherId: rawCourse.teacher_profile
    }
}

export async function getTeacher(id) {
    const rawTeacher = (await axios.get(`${userAppAPI}/teachers/${id}/?format=json`)).data;

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
    const rawCourses = (await axios.get(`${courseAppAPI}/courses/?teacher_profile=${id}&format=json`)).data;
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
    const rawModules = (await axios.get(`${courseAppAPI}/modules/?course=${courseId}&format=json`)).data;
    const modules = rawModules.map(module => {
        return {
            id: module.id,
            name: module.module_name
        }
    });

    return modules;
}

export async function getModule(id) {
    const rawModule = (await axios.get(`${courseAppAPI}/modules/${id}/?format=json`)).data;

    return {
        id: rawModule.id,
        name: rawModule.module_name
    }
}

export async function getModuleLessons(moduleId) {
    const rawLessons = (await axios.get(`${courseAppAPI}/lessons/?module=${moduleId}&format=json`)).data;
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
    const rawLesson = (await axios.get(`${courseAppAPI}/lessons/${id}/?format=json`)).data;

    return {
        id: rawLesson.id,
        name: rawLesson.lesson_name,
        description: rawLesson.description,
        video: rawLesson.video
    }
}

export async function getCheckPoint(id) {
    const rawCheckPoint = (await axios.get(`${checkpointAppAPI}/checkpoints/${id}/?format=json`)).data;
    const checkPoint = {
        id: rawCheckPoint.id,
        title: rawCheckPoint.title,
        questions: rawCheckPoint.questions
    }

    return checkPoint;
}

export async function getModuleCheckPoint(moduleId) {
    const rawCheckPoint = (await axios.get(`${checkpointAppAPI}/checkpoints/?module=${moduleId}&format=json`)).data[0];

    return {
        id: rawCheckPoint.id,
        title: rawCheckPoint.title,
        questions: rawCheckPoint.questions,
        number: rawCheckPoint.checkpoint_number
    }
}

export async function getCourseCheckPoints(courseId) {
    const modules = await getCourseModules(courseId);

    const checkPoints = [];
    for (const module of modules) {
        checkPoints.push(await getModuleCheckPoint(module.id));
    }

    return checkPoints;
}

export async function getStudentPassedCheckPoints(studentId) {
    const checkPoints = (await axios.get(`${checkpointAppAPI}/passed-checkpoints/?student=${studentId}&format=json`)).data;

    return checkPoints;
}

export async function getCheckPointResults(studentId, checkPointId) {
    const result = (await axios.get(`${checkpointAppAPI}/passed-checkpoints/?student=${studentId}&checkpoint=${checkPointId}&format=json`)).data[0];

    return result;
}

export async function getLessonOtherFiles(lessonId) {
    const otherFiles = (await axios.get(`${courseAppAPI}/lesson-other-files/?lesson=${lessonId}&format=json`)).data;

    return otherFiles;
}

export async function getCourseStudents(courseId) {
    const enrollments = (await axios.get(`${courseAppAPI}/enrollments/?course=${courseId}&format=json`)).data;
    const students = enrollments.map(enrollment => {
        return {
            id: enrollment.student.id,
            surname: enrollment.student.surname,
            name: enrollment.student.name,
            fatherName: enrollment.student.father_name,
            faculty: enrollment.student.faculty,
            group: enrollment.student.group
        }
    });
    return students;
}