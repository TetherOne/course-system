import axios from 'axios';
import {
    AxiosRequestConfig
} from 'axios';

import {
    Teacher,
    Course,
    Module,
    Enrollment,
    CurrentUser
} from '#types';

import {
    getCSRF_token
} from '#functions';



const API_URL: string = 'http://127.0.0.1:8000/api';

const userAppURL: string = `${API_URL}/userapp`;

const teachersURL: string = `${userAppURL}/teachers/`;

const courseAppURL: string = `${API_URL}/courseapp`;

const coursesURL: string = `${courseAppURL}/courses/`;
const modulesURL: string = `${courseAppURL}/modules/`;
const enrollmentsURL: string = `${courseAppURL}/enrollments/`;

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

export async function getTeacher(id: number): Promise<Teacher> {
    const URL: string = `${teachersURL}${id}/`;
    return (await axios.get(URL, standardConfig)).data;
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