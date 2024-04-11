import {
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from './components/pages/Student.vue';
import Teacher from './components/pages/Teacher.vue';
import Course from './components/pages/Course.vue';
import Lesson from './components/pages/Lesson.vue';
import CheckPoint from './components/pages/CheckPoint.vue'
import Participants from './components/pages/Participants.vue';


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
        component: CheckPoint
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