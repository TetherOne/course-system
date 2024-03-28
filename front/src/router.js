import {
    createRouter,
    createWebHistory
} from 'vue-router';

// import SignInUp from './components/pages/SignInUp.vue';
import Student from './components/pages/Student.vue';
import Teacher from './components/pages/Teacher.vue';
import Course from './components/pages/Course.vue';
// import Lesson from './components/pages/Lesson.vue';
import CheckPoint from './components/pages/CheckPoint.vue';
import Error from './components/pages/Error.vue';


const routes = [
    // {
    //     path: '/',
    //     component: SignInUp
    // },
    {
        path: '/student',
        component: Student
    },
    {
        path: '/teacher/:id',
        component: Teacher
    },
    {
        path: '/course/:id',
        component: Course
    },
    // {
    //     path: '/course/:courseId/lesson/:lessonId',
    //     component: Lesson
    // },
    {
        path: '/checkPoint/:id',
        component: CheckPoint
    },
    {
        path: '/error',
        component: Error
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;