<!DOCTYPE html>

<template>
    <div class="tittle">
        <a @click="goBack">
            <img src="/src/assets/arrow.png" alt="Arrow" class="arrow-image">
            <span class="back-text">Назад</span>
        </a>
        <span class="lesson-name">
            <span>{{ name }}</span>
        </span>
    </div>

    <div class="lesson-container">
        <video class="lesson-video" controls :src="video"></video>
    </div>
</template>


<script src="../pages-scripts/lesson.js">

</script>


<style src="../pages-css/lesson.css">

</style>
