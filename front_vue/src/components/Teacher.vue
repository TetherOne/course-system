<script setup>

import CoursesList from "./CoursesList.vue";
</script>

<script>
import Header from "./Header.vue";
import CoursesList from "./CoursesList.vue";
import {getTeacherInfo} from "../requests.js";

export default {
    data() {
        return {
            info: {},
            id: 2
        }
    },
    created() {
        getTeacherInfo(this.id).then(
            info => this.info = info
        );
    }
}
</script>

<template>
    <div class="flex-column">
        <Header role="teacher"
                :surname="info.surname"
                :name="info.name"
                :fatherName="info.father_name"
                :faculty="info.faculty"
        ></Header>
        <CoursesList :courses="info.courses"></CoursesList>
    </div>
</template>

<style scoped>

</style>