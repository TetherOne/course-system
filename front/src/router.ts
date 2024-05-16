import {
    createRouter,
    RouteRecordRaw,
    createWebHistory,
    Router
} from 'vue-router';

import SignIn from '#pages/SignIn';
import SignUp from '#pages/SignUp';
import ResetPassword from '#pages/ResetPassword';
import Settings from '#pages/Settings';
import Student from '#pages/Student';
import Teacher from '#pages/Teacher';
import Course from '#pages/Course';
import Lesson from '#pages/Lesson';
import Checkpoint from '#pages/Checkpoint';



const routes: RouteRecordRaw[] = [{
    name: 'signIn',
    path: '/sign-in',
    component: SignIn
}, {
    name: 'signUp',
    path: '/sign-up',
    component: SignUp
}, {
    name: 'resetPassword',
    path: '/reset-password',
    component: ResetPassword
}, {
    name: 'settings',
    path: '/settings',
    component: Settings
}, {
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
    routes,
    history: createWebHistory()
});



export default router;