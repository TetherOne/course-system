<!DOCTYPE html>

<template>
    <header>
        <div class="tittle-container">
            <a @click="goBack" class="arrow-container">
                <img src="/src/assets/arrow.png" alt="Arrow" class="arrow-image">
                <span class="back-text">Назад</span>
            </a>
            <span class="lesson-name">
                <span>{{ name }}</span>
            </span>
        </div>
    </header>

    <body>
        <div class="lesson-container">
            <div>
                <video class="lesson-video" controls :src="video"></video>
                <div class="lesson-details">
                    <div class="lesson-tittle-description">Описание</div>
                    <div class="lesson-description">{{ description }}</div>
                    <div class="lesson-tittle-materials">Материалы</div>
                    <div class="lesson-materials-container">
                        <div v-for="(file, index) in otherFiles" :key="index">
                            <a class="lesson-material" :href="file" target="_blank">{{ shortenLink(file) }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>

</template>



<script src="../pages-scripts/lesson.js">
</script>


<style src="../pages-css/lesson.css">
</style>