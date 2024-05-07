import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

import {
    Student,
    Teacher,
    Course,
    Enrollment,
    Module,
    Lesson,
    LessonFile,
    Checkpoint,
    Question,
    Summary,
    PassedCheckpoint,
    AnyModel
} from '#models';



const API: string = 'http://localhost:8001/api';

const userApp: string = `${API}/userapp`;

const students: string = `${userApp}/students/`;
const teachers: string = `${userApp}/teachers/`;

const courseApp: string = `${API}/courseapp`;

const courses: string = `${courseApp}/courses/`;
const modules: string = `${courseApp}/modules/`;
const lessons: string = `${courseApp}/lessons/`;
const lessonsFiles: string = `${courseApp}/lesson-other-files/`;
const enrollments: string = `${courseApp}/enrollments/`;

const checkpointApp: string = `${API}/checkpointapp`;

const checkpoints: string = `${checkpointApp}/checkpoints/`;
const summaries: string = `${checkpointApp}/summaries/`;
const passedCheckpoints: string = `${checkpointApp}/passed-checkpoints/`;

const questionApp: string = `${API}/questionapp`;
const questions: string = `${questionApp}/questions/`;

const history: string = `${API}/history`;
const questionsChoices: string = `${history}/history-of-passed-answers/`;

const standardConfig: AxiosRequestConfig = {
    params: {
        format: 'json'
    }
};



async function getObject(baseURL: string, id: number): Promise<AnyModel> {
    const URL: string = `${baseURL}${id}`;
    return (await axios.get(URL, standardConfig)).data;
}

export async function getStudent(id: number): Promise<Student> {
    return <Student>await getObject(students, id);
}

export async function getTeacher(id: number): Promise<Teacher> {
    return <Teacher>await getObject(teachers, id);
}

export async function getCourse(id: number): Promise<Course> {
    return <Course>await getObject(courses, id);
}

async function getStudentEnrollments(id: number): Promise<Enrollment[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.student = id;

    return (await axios.get(enrollments, config)).data;
}

export async function getStudentCourses(id: number): Promise<Course[]> {
    const enrollments: Enrollment[] = await getStudentEnrollments(id);

    const courses: Course[] = [];
    for (const enrollment of enrollments) {
        courses.push(await getCourse(enrollment.course));
    }

    return courses;
}

export async function getTeacherCourses(id: number): Promise<Course[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.teacher_profile = id;
    return (await axios.get(courses, config)).data;
}

export async function getCourseModules(id: number): Promise<Module[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.course = id;
    return (await axios.get(modules, config)).data;
}

export async function getCourseTeacher(id: number): Promise<Teacher> {
    const course: Course = await getCourse(id);
    return (await getTeacher(course.teacher_profile));
}

export async function getModuleLessons(id: number): Promise<Lesson[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.module = id;
    return (await axios.get(lessons, config)).data;
}

export async function getModuleCheckpoints(id: number): Promise<Checkpoint[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.module = id;
    return (await axios.get(checkpoints, config)).data;
}

export async function getLesson(id: number): Promise<Lesson> {
    return <Lesson>await getObject(lessons, id);
}

export async function getLessonFiles(id: number): Promise<LessonFile[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.lesson = id;
    return (await axios.get(lessonsFiles, config)).data;
}

export async function getCheckpoint(id: number): Promise<Checkpoint> {
    return <Checkpoint>await getObject(checkpoints, id);
}

export async function getCheckpointQuestions(id: number): Promise<Question[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.checkpoint = id;
    return (await axios.get(questions, config)).data;
}

export async function getStudentPassedCheckpoints(id: number): Promise<PassedCheckpoint[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.student = id;
    return (await axios.get(passedCheckpoints, config)).data;
}

// Зачем score ???
export async function sendPassedCheckpoint(studentId: number, checkpointId: number, score: number): Promise<any> {
    return (await axios.post(passedCheckpoints, {
        student: studentId,
        checkpoint: checkpointId,
        points: score
    })).data;
}

export async function sendQuestionChoice(
    studentId: number,
    questionId: number,
    chosenAnswerId: number,
    checkpointId: number
): Promise<any> {
    return (await axios.post(questionsChoices, {
        student: studentId,
        question: questionId,
        selected_answer: chosenAnswerId,
        checkpoint: checkpointId
    })).data;
}