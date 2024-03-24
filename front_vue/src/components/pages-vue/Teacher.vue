<script setup>

</script>

<script>
import {
    getTeacherCourses,
    getTeacherInfo
} from '../../requests.js';


export default {
    data() {
        return {
            surname: '__surname__',
            name: '__name__',
            fatherName: '__fatherName__',
            courses: []
        }
    },
    async created() {
        const teacherInfo = await getTeacherInfo(this.$root.$data.id);
        this.surname = teacherInfo.surname;
        this.name = teacherInfo.name;
        this.fatherName = teacherInfo.father_name;

        this.courses = await getTeacherCourses(this.$root.$data.id);
    }
}
</script>

<template>

</template>

<style scoped>

</style>