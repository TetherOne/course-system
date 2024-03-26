<script setup>
import Header from '../elements/Header.vue';
import CoursesList from '../elements/CoursesList.vue';

import {useUserStore} from '../../stores/user.js';


const user = useUserStore();
</script>


<script>
import {mapStores} from 'pinia';

import {
    getStudentInfo,
    getStudentCourses,
    getTeacherInfo
} from './../../requests.js';
import {useUserStore} from '../../stores/user.js';
import {shortenNameElem} from '../../functions.js';


export default {
    data() {
        return {
            courses: []
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    async created() {
        this.userStore.info = await getStudentInfo(this.userStore.id);
        this.courses = await getStudentCourses(this.userStore.id);
        for (const course of this.courses) {
            const teacherId = course.teacher_profile;
            course.teacherInfo = await getTeacherInfo(teacherId);

            const surname = course.teacherInfo.surname;
            const nameInitial = shortenNameElem(course.teacherInfo.name);
            const fatherNameInitial = shortenNameElem(course.teacherInfo.father_name);
            course.teacherInfo.nameWithInitials = `${surname} ${nameInitial} ${fatherNameInitial}`;
        }
    }
}
</script>


<template>
    <header>
        <div class="tittle-container">
            <span class="tittle-text">Главная</span>
            <span class="settings">Настройки</span>
            <img class="student-avatar" :src="user.info.avatar" alt="avatar">
        </div>
    </header>

    <body>

    </body>

</template>


<style src="../pages-css/student.css">

</style>
