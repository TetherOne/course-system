import {
    createRouter,
    createWebHistory
} from 'vue-router';

import SignInUp from './components/pages-vue/SignInUp.vue';
import Student from './components/pages-vue/Student.vue';
import Teacher from './components/pages-vue/Teacher.vue';
import Course from './components/pages-vue/Course.vue';
import Lesson from './components/pages-vue/Lesson.vue';


const routes = [
    {
        path: '/',
        component: SignInUp
    }, {
        path: '/student',
        component: Student
    }, {
        path: '/teacher/:id',
        component: Teacher
    }, {
        path: '/course/:id',
        component: Course
    }, {
        path: '/course/:courseId/lesson/:lessonId',
        component: Lesson
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;