import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from './components/pages/Student.vue';
import Course from './components/pages/Course.vue';
import Lesson from './components/pages/Lesson.vue';
import CheckPoint from './components/pages/CheckPoint.vue'


export const studentLink = '/student';
export const teacherLink = '/teacher';
const courseLink = '/course';
const lessonLink = '/lesson';
const checkPointLink = '/checkPoint';

const routes = [
    {
        path: studentLink,
        component: Student
    },
    {
        path: `${courseLink}/:id`,
        component: Course
    },
    {
        path: `${lessonLink}/:id`,
        component: Lesson
    },
    {
        path: `${checkPointLink}/:id`,
        component: CheckPoint
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});