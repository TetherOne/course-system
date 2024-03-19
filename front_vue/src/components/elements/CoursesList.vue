<script setup>

</script>

<script>
export default {
    props: ['courses']
}
</script>

<template>
    <div class="flex-column courses-wrapper">
        <div v-for="course in courses" class="flex-row course-wrapper">
            <a :href="`/course/${course.id}`" class="label">{{ course.course_name }}</a>
            <div class="label">{{ course.teacherInfo.surname }}</div>
        </div>
    </div>
</template>

<style scoped>
.courses-wrapper {
    background-color: #e4e4e4;
    padding: 10px;
    border-radius: 25px;
}

.course-wrapper {
    background-color: #b9b8b8;
    padding: 10px;
    border-radius: 10px;
    gap: 10px;
}

.label {
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
}
</style>