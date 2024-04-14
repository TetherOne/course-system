<script setup>
import CoursesList from '#elements/CoursesList';
import useUserStore from '#store';


const user = useUserStore();
</script>

<template>
    <CoursesList/>
</template>

<style scoped>

</style>