import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from '#pages/Student';


export const studentPath = '/student';
export const teacherPath = '/teacher/:id';
const coursePath = '/course/:id';
const lessonPath = '/lesson/:id';
const checkpointPath = '/checkPoint/:id';
const participantsPath = '/participants/:courseId';

const routes = [
    {
        path: studentPath,
        component: Student
    }
];


export default createRouter({
    history: createWebHistory(),
    routes: routes
});