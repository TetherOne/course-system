<script setup>

import {frontURL} from "../server.js";

export default {
    data() {
        return {
            surname: '{surname}',
            name: '{name}',
            father_name: '{fatherName}',
            faculty: '{faculty}',
            email: '{email}',
            courses: [],
            role: localStorage.role,
            id: localStorage.id
        }
    },
    methods: {},
    created() {
        fetch(`${frontURL}/get_student?id=${this.id}`).then(
            response => {
                return response.json()
            }
        ).then(
            json => {
                this.surname = json.surname;
                this.name = json.name
                this.father_name = json.father_name;
            }
        );

        fetch(`${frontURL}/get_student_courses?id=${this.id}`).then(
            response => response.json()
        ).then(
            courses => {
                console.log(courses);
                this.courses = courses
            }
        );
    }
}

</script>


<template>

    <header class="flex-row">
        <img src="/avatar.png" alt="Фото" class="avatar">
        <div id="user-info" class="flex-column">
            <div class="label">{{ surname }} {{ name }} {{ father_name }}</div>
            <div class="label">{{ faculty }}</div>
            <div class="label">{{ email }}</div>
        </div>
        <div class="spacer"></div>
        <button>Ввести код курса</button>
        <button>Искать</button> <!-- Кого искать? -->
    </header>
    <div class="flex-row">
        <div v-if="role === 'student'">Моё обучение</div>
        <div class="flex-row">
            <img src="/magnifiers.png" alt="Поиск">
            <input type="text" name="" id="" placeholder="Название курса">
        </div>
    </div>
    <div>
        <div>Мои курсы:</div>
        <div class="label" v-for="course in courses">
            <div>{{ course.course_name }}</div>
            <div>{{ course.description }}</div>
        </div>
    </div>

</template>


<style scoped>


</style>