<script setup>
import Header from '../elements/Header.vue';
import CoursesList from "../elements/CoursesList.vue";
</script>

<script>
import {
    getStudentInfo,
    getStudentCourses, getCourseInfo, getTeacherInfo
} from './../../requests.js';
import axios from "axios";
import {frontURL} from "../../config.js";


export default {
    data() {
        return {
            info: {},
            courses: []
        }
    },
    created() {
        getStudentInfo(this.$root.$data.userId).then(
            info => {
                this.info = info;
            }
        );


        axios.get(`${frontURL}/api/courseapp/enrollments/?student=${this.$root.$data.userId}&format=json`).then(
            response => {
                const enrollments = response.data;
                enrollments.forEach(async enrollment => {
                    const courseId = enrollment.course;
                    const course = await getCourseInfo(courseId);
                    course.teacherInfo = await getTeacherInfo(course.teacher_profile);
                    this.courses.push(course);
                })
            }
        )
    }
}
</script>

<template>
    <div id="student-wrapper" class="flex-column">
        <Header userRole="student" :userInfo="info"></Header>
        <div class="flex-row">
            <div>Моё обучение</div>
        </div>
        <CoursesList :courses="courses"></CoursesList>
    </div>
</template>

<style scoped>
#student-wrapper {
    align-items: center;
}
</style>