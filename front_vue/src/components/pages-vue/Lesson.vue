<!DOCTYPE html>

<template>
    <div class="tittle-container">
          <a @click="goBack" class="arrow-text">
              <img src="/src/assets/arrow.png" alt="Arrow" class="arrow-image">
              <span class="back-text">Назад</span>
          </a>
          <span class="lesson-name">
              <span>{{ name }}</span>
          </span>
      </div>

      <div class="lesson-container">
          <div>
              <video class="lesson-video" controls :src="video"></video>
              <span class="lesson-tittle-description">Описание</span>
              <span class="lesson-description">{{ description }}</span>
              <span class="lesson-tittle-materials">Материалы</span>
              <span class="lesson-description">{{  }}</span>
          </div>

      </div>

</template>


<script src="../pages-scripts/lesson.js">

</script>


<style src="../pages-css/lesson.css">

</style>
