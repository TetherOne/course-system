import {
    Router,
    RouteRecordRaw,
    createRouter,
    createWebHistory
} from 'vue-router';

import Student from '#pages/Student';
import Teacher from '#pages/Teacher';
import Course from '#pages/Course';
import Lesson from '#pages/Lesson';
import Checkpoint from '#pages/Checkpoint';



const routes: RouteRecordRaw[] = [{
    name: 'student',
    path: '/student',
    component: Student
}, {
    name: 'teacher',
    path: '/teacher/:id',
    component: Teacher
}, {
    name: 'course',
    path: '/course/:id',
    component: Course
}, {
    name: 'lesson',
    path: '/lesson/:id',
    component: Lesson
}, {
    name: 'checkpoint',
    path: '/checkpoint/:id',
    component: Checkpoint
}];

const router: Router = createRouter({
    routes: routes,
    history: createWebHistory()
});



export default router;