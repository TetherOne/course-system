<script setup>

</script>

<script>
export default {
    props: {
        courses: {
            type: Array,
            required: false,
            default: () => {

            }
        }
    }
}
</script>

<template>
    <div class="flex-column courses-wrapper">
        <div v-for="course in courses" class="flex-row course-wrapper">
            <div>{{ course.course_name }}</div>
            <div></div>
        </div>
    </div>
</template>

<style scoped>
.courses-wrapper {
    background-color: #e4e4e4;
}


</style>