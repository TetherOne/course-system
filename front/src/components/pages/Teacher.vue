<script setup>
import {useUserStore} from '../../stores/user.js';


const user = useUserStore();
</script>


<script>
import axios from 'axios';
import {mapStores} from 'pinia';

import {courseAppAPI} from '../../requests.js';
import {useUserStore} from '../../stores/user.js';


export default {
    data() {
        return {
            addCourseFormVisible: false,
            courseToBeCreatedName: '',
            newCourseDescription: '',
            newCoursePassword: ''
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    async created() {

    },
    methods: {
        async addCourse() {
            if (!this.courseToBeCreatedName || !this.newCourseDescription || !this.newCoursePassword) {
                alert('Заполнены не все поля');
                return;
            }

            const data = {
                course_name: this.courseToBeCreatedName,
                description: this.newCourseDescription,
                status: true,
                course_password: this.newCoursePassword,
                teacher_profile: this.userStore.id
            };

            const request = await axios.post(`${courseAppAPI}/courses/`, data);
            this.addCourseFormVisible = false;
        }
    }
}
</script>


<template>
    <div>Мои курсы</div>
    <div id="courses" class="area flex-column">
        <div class="flex-row course-info" v-for="course in user.courses">
            <a :href="`/course/${course.id}`">{{ course.course_name }}</a>
        </div>
    </div>
    <button v-if="user.role === 'teacher'" @click="addCourseFormVisible = true">Добавить курс</button>
    <div class="flex-column area" v-if="addCourseFormVisible">
        <div class="flex-row">
            <label for="">Название:</label>
            <input v-model="courseToBeCreatedName">
        </div>
        <div class="flex-column">
            <label for="">Описание:</label>
            <textarea name="" id="" cols="30" rows="10" v-model="newCourseDescription"></textarea>
        </div>
        <div class="flex-row">
            <label for="">Пароль</label>
            <input v-model="newCoursePassword" type="text">
        </div>
        <button @click="addCourse">Добавить</button>
    </div>
    <div v-if="!user.courses.length">У вас пока нет курсов...</div>
</template>

<style scoped>

</style>