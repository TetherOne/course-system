import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from '#pages/Student';
import Teacher from '#pages/Teacher';
import Course from '#pages/Course';
import Lesson from '#pages/Lesson';
import Checkpoint from '#pages/CheckPoint'
import Participants from '#pages/Participants';


export const studentLink = '/student';
export const teacherLink = '/teacher';
const courseLink = '/course';
const lessonLink = '/lesson';
const checkPointLink = '/checkPoint';
const participantsLink = '/participants';

const routes = [
    {
        path: studentLink,
        component: Student
    },
    {
        path: `${teacherLink}/:id`,
        component: Teacher
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
        component: Checkpoint
    },
    {
        path: `${participantsLink}/:id`,
        component: Participants
    }
];


export default createRouter({
    history: createWebHistory(),
    routes: routes
});