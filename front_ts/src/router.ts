import {
    createRouter,
    createWebHistory,
    RouteRecordRaw
} from 'vue-router';

import Student from '#pages/Student';
import Teacher from '#pages/Teacher';
import Course from '#pages/Course';
import Lesson from '#pages/Lesson';
import Checkpoint from '#pages/Checkpoint';
import Forbidden from '#pages/Forbidden';
import NotFound from '#pages/NotFound';


export const studentPath = '/student';
export const teacherPath = '/teacher/:id';
export const coursePath = '/course/:id';
export const lessonPath = '/lesson/:id';
export const checkpointPath = '/checkpoint/:id';
export const forbiddenPath = '/forbidden';

const routes: RouteRecordRaw[] = [
    {
        path: studentPath,
        component: Student
    },
    {
        path: teacherPath,
        component: Teacher
    },
    {
        path: coursePath,
        component: Course
    },
    {
        path: lessonPath,
        component: Lesson
    },
    {
        path: checkpointPath,
        component: Checkpoint
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});