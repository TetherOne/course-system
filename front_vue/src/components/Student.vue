<script setup>
import Header from "./Header.vue";
import CoursesList from "./CoursesList.vue";
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
            courses: [],
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
        },

        getStudentCourses() {
            axios.get(`${URL}/api/enrollments/?format=json`).then(
                response => {
                    return response.data.filter(enrollment => enrollment.student === this.id);
                }
            ).then(
                enrollments => {
                    enrollments.forEach(enrollment => {
                        const courseID = enrollment.course;
                        axios.get(`${URL}/api/courses/${courseID}/?format=json`).then(
                            response => {
                                this.courses.push(response.data);
                            }
                        )
                    });
                }
            )
        }
    },
    created() {
        this.getStudentInfo();
        this.getStudentCourses();
    }
}
</script>

<template>
    <div class="flex-column">
        <Header :surname="surname"
                :name="name"
                :fatherName="fatherName"
                :faculty="faculty"
                role="student"></Header>
        <div class="flex-row">

        </div>
        <CoursesList :courses="courses"></CoursesList>
    </div>
</template>

<style scoped>

</style>