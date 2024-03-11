import {createRouter, createWebHistory} from "vue-router";
import SignInUp from "./components/SignInUp.vue";
import Student from "./components/Student.vue";
import Teacher from "./components/Teacher.vue";
import Course from "./components/Course.vue";

const routes = [
    {
        path: '/',
        component: SignInUp
    },
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;