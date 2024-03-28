<script setup>
import Header from './components/elements/Header.vue';
</script>


<script>
import { mapStores } from 'pinia';

import { useUserStore } from './stores/user.js';
import {
    getStudent,
    getStudentCourses,
    getTeacher,
    getTeacherCourses
} from './requests.js';
import {shortenName} from './functions.js';


export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    async created() {
        const userId = this.userStore.id;
        switch (this.userStore.role) {
            case 'student':
                this.userStore.info = await getStudent(userId);
                this.userStore.courses = await getStudentCourses(userId);
                for (const course of this.userStore.courses) {
                    course.teacher = await getTeacher(course.teacher_profile);

                    course.teacherNameWithInitials = shortenName(course.teacher.surname, course.teacher.name, course.teacher.father_name);
                }
                break;
            case 'teacher':
                this.userStore.info = await getTeacher(userId);
                this.userStore.courses = await getTeacherCourses(userId);
                break;
        }
    }
}
</script>


<template>
    <div class="page-wrapper flex-column">
        <Header/>
        <router-view></router-view>
    </div>
</template>


<style scoped>

</style>
