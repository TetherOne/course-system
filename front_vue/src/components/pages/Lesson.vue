<script setup>

</script>

<script>
import {getLesson} from "../../requests.js";

export default {
    data() {
        return {
            name: '__lessonName__',
            description: '__lessonDescription__',
            video: '__videoPath__'
        }
    },
    computed: {
        id() {
            return this.$route.params.lessonId;
        }
    },
    async created() {
        const lesson = await getLesson(this.id);
        this.name = lesson.lesson_name;
        this.description = lesson.description;
        this.video = lesson.video;
    }
}
</script>

<template>
  <div class="video-container">
    <div class="video-wrapper">
      <video controls :src="video" class="fullscreen-video"></video>
      <div class="lesson-name">{{ name }}</div>
    </div>
  </div>
</template>

<style scoped>
.video-wrapper {
    position: relative;
    width: 65%; /* Ширина видео */
    height: auto; /* Автоматическая высота */
    display: flex;
    align-items: flex-start; /* Выравнивание элементов по верхнему краю */
  }

.lesson-name {
    font: bold 24px sans-serif;
    position: absolute;
    top: -60px;
    left: 0;
    background-color: rgba(255, 255, 255, 0.7);
  }

.fullscreen-video {
    width: 100%;
    height: auto;
  }

.video-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
