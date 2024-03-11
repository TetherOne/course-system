<script setup>
import Header from "./Header.vue";
</script>

<script>
import axios from "axios";
import {URL} from "../server.js";

export default {
    data() {
        return {
            surname: '{Нет фамилии}',
            name: '{Нет имени}',
            fatherName: '',
            faculty: '{Нет факультета}',
            id: 2
        }
    },
    methods: {
        getStudentInfo() {
            axios.get(`${URL}/api/student-profiles/${this.id}/?format=json`).then(
                response => {
                    response = response.data;
                    this.surname = response.surname;
                    this.name = response.name;
                    const fatherName = response.father_name;
                    this.fatherName = fatherName === null ? '' : fatherName;
                    this.faculty = response.faculty;
                }
            )
        }
    },
    created() {
        this.getStudentInfo();
    }
}
</script>

<template>
    <Header :surname="surname"
            :name="name"
            :fatherName="fatherName"
            :faculty="faculty"
            role="student"></Header>
</template>

<style scoped>

</style>