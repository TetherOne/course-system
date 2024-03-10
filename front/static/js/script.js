import {authorization} from "/components/authorization.js";
import {student} from '/components/student.js';
import {teacher} from '/components/teacher.js';
import {course} from '/components/course.js';



const routes = [
    {
        path: '/',
        component: authorization
    }, {
        path: '/student',
        component: student
    }, {
        path: '/teacher/:id',
        component: teacher
    }, {
        path: '/course/:id',
        component: course
    }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});

const app = Vue.createApp({
    data() {
        return {}
    },
    methods: {}
});



app.use(router);
app.mount('#app');