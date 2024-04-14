import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from '#pages/Student';
import Teacher from '#pages/Teacher';
import Course from '#pages/Course';


export const studentPath = '/student';
export const teacherPath = '/teacher/:id';
export const coursePath = '/course/:id';
const lessonPath = '/lesson/:id';
const checkpointPath = '/checkPoint/:id';
const participantsPath = '/participants/:courseId';

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
        path: coursePath,
        component: Course
    }
];


export default createRouter({
    history: createWebHistory(),
    routes: routes
});