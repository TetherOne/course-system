import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from '#pages/Student';
import Teacher from '#pages/Teacher';
import Forbidden from '#pages/Forbidden';


export const studentPath = '/student';
export const teacherPath = '/teacher/:id';
export const forbiddenPath = '/forbidden';

const routes = [
    {
        path: studentPath,
        component: Student
    },
    {
        path: teacherPath,
        component: Teacher
    },
    {
        path: forbiddenPath,
        component: Forbidden
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});