import axios from 'axios';

import {frontURL} from './config.js';


export function getStudentInfo(id) {
    return axios.get(`${frontURL}/api/userapp/students/${id}/?format=json`).then(
        response => {
            return response.data;
        }
    );
}

export function getStudentCourses(id) {
    axios.get(`${frontURL}/api/courseapp/enrollments/?format=json`).then(
        response => {
            return response.data.filter(enrollment => {
                return enrollment.student === id;
            });
        }
    ).then(
        enrollments => {
            const courses = [];
            enrollments.forEach(enrollment => {
                const course = {};
                course.id = enrollment.course;
                getCourseInfo(course.id).then(
                    response => {
                        const info = response.data;
                        course.name = info.course_name;
                        course.description = info.description;
                        course.teacherId = info.teacher_profile;
                    }
                )
            });
        }
    )
}

export function getCourseInfo(id) {
    return axios.get(`${frontURL}/api/courseapp/courses/${id}/?format=json`).then(
        response => {
            return response.data;
        }
    );
}