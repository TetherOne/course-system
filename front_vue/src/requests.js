import axios from "axios";
import {URL} from "./server.js";

export function getStudentInfo(id) {
    return axios.get(`${URL}/api/student-profiles/${id}/?format=json`).then(
        response => response.data
    );
}

export function getTeacherInfo(id) {
    return axios.get(`${URL}/api/teacher-profiles/${id}/?format=json`).then(
        response => response.data
    );
}

export function getCourseInfo(id) {
    return axios.get(`${URL}/api/courses/${id}/?format=json`).then(
        response => response.data
    );
}

export function getStudentCourses(id) {

}