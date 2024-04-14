import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from '#pages/Student';
import Teacher from '#pages/Teacher';
import Course from '#pages/Course';
import Lesson from '#pages/Lesson';
import Checkpoint from '#pages/Checkpoint';


export const studentPath = '/student';
export const teacherPath = '/teacher/:id';
export const coursePath = '/course/:id';
const lessonPath = '/lesson/:id';
const checkpointPath = '/checkpoint/:id';
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


export default createRouter({
    history: createWebHistory(),
    routes: routes
});