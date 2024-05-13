import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

import {
    Teacher,
    Course,
    Module,
    Lesson,
    LessonFile,
    Enrollment,
    Checkpoint,
    PassedCheckpoint,
    CurrentUser
} from '#types';

import { getCSRF_token } from '#functions';



const API_URL: string = 'http://127.0.0.1:8000/api';

const userAppURL: string = `${API_URL}/userapp`;
const teachersURL: string = `${userAppURL}/teachers/`;

const courseAppURL: string = `${API_URL}/courseapp`;

const coursesURL: string = `${courseAppURL}/courses/`;
const modulesURL: string = `${courseAppURL}/modules/`;
const lessonsURL: string = `${courseAppURL}/lessons/`;
const lessonsFilesURL: string = `${courseAppURL}/lesson-other-files/`;
const enrollmentsURL: string = `${courseAppURL}/enrollments/`;

const checkpointAppURL: string = `${API_URL}/checkpointapp`;

const checkpointsURL: string = `${checkpointAppURL}/checkpoints/`;
const passedCheckpointsURL: string = `${checkpointAppURL}/passed-checkpoints/`;

const historyURL: string = `${API_URL}/history`;
const questionsChoicesURL: string = `${historyURL}/history-of-passed-answers/`;

const authAppURL: string = `${API_URL}/authapp`;

const signInURL: string = `${authAppURL}/login/`;
const signOutURL: string = `${authAppURL}/logout/`;
const currentUserURL: string = `${authAppURL}/current-user/`;

const standardConfig: AxiosRequestConfig = {
    params: {
        format: 'json'
    }
};



export async function getStudentCourses(id: number): Promise<Course[]> {
    const enrollments: Enrollment[] = await getStudentEnrollments(id);

    const courses: Course[] = [];
    for (const enrollment of enrollments) {
        courses.push(await getCourse(enrollment.course));
    }

    return courses;
}

export async function getStudentEnrollments(id: number): Promise<Enrollment[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.student = id;
    return (await axios.get(enrollmentsURL, config)).data;
}

export async function getStudentPassedCheckpoints(id: number): Promise<PassedCheckpoint[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.student = id;
    return (await axios.get(passedCheckpointsURL, config)).data;
}

export async function getTeacher(id: number): Promise<Teacher> {
    const URL: string = `${teachersURL}${id}/`;
    return (await axios.get(URL, standardConfig)).data;
}

export async function getTeacherCourses(id: number): Promise<Course[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.teacher_profile = id;
    return (await axios.get(coursesURL, config)).data;
}

export async function getCourse(id: number): Promise<Course> {
    const URL: string = `${coursesURL}${id}/`;
    return (await axios.get(URL, standardConfig)).data;
}

export async function getCourseModules(id: number): Promise<Module[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.course = id;
    return (await axios.get(modulesURL, config)).data;
}

export async function addCourse(name: string, description: string, teacherId: number, avatar: string, password: string) {
    const data = {
        course_name: name,
        description: description,
        status: true,
        teacher_profile: teacherId,
        image: avatar,
        password: password
    };

    return (await axios.post(coursesURL, data)).data;
}

export async function getModuleLessons(id: number): Promise<Lesson[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.module = id;
    return (await axios.get(lessonsURL, config)).data;
}

export async function getModuleCheckpoints(id: number): Promise<Checkpoint[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.module = id;
    return (await axios.get(checkpointsURL, config)).data;
}

export async function addModule(name: string, courseId: number, status: boolean): Promise<any> {
    const data = {
        name: name,
        course: courseId,
        status: status
    };
    return (await axios.post(modulesURL, data)).data;
}

export async function getLesson(id: number): Promise<Lesson> {
    const URL: string = `${lessonsURL}${id}/`;
    return (await axios.get(URL, standardConfig)).data;
}

export async function getLessonFiles(id: number): Promise<LessonFile[]> {
    const config: AxiosRequestConfig = structuredClone(standardConfig);
    config.params.lesson = id;
    return (await axios.get(lessonsFilesURL, config)).data;
}

export async function getCheckpoint(id: number): Promise<Checkpoint> {
    const URL: string = `${checkpointsURL}${id}/`;
    return (await axios.get(URL, standardConfig)).data;
}

export async function sendPassedCheckpoint(studentId: number, checkpointId: number, score: number): Promise<any> {
    return (await axios.post(passedCheckpointsURL, {
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
    return (await axios.post(questionsChoicesURL, {
        student: studentId,
        question: questionId,
        selected_answer: chosenAnswerId,
        checkpoint: checkpointId
    })).data;
}

export async function signIn(username: string, password: string): Promise<any> {
    const data = {
        csrfmiddlewaretoken: getCSRF_token(),
        username: username,
        password: password
    };

    return (await axios.postForm(signInURL, data)).data;
}

export async function signOut(): Promise<any> {
    return (await axios.get(signOutURL)).data;
}

export async function getCurrentUser(): Promise<CurrentUser> {
    return (await axios.get(currentUserURL, standardConfig)).data;
}