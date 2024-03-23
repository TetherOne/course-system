<template>
    <div style="margin-left: 40px;">
        <button @click="goBack" style="color: black; text-decoration: none; display: inline-block; border: none; background: none; cursor: pointer;">
            <img src="/src/assets/arrow.png" alt="Arrow" style="width: 40px; height: 40px; vertical-align: middle;">
              <span class="arrow" style="font-size: 20px; vertical-align: middle; margin-left: 1px; color: #5A5959;">Назад</span>
            </button>
          </div>

          <div class="video-container">
            <div class="video-wrapper">
              <video controls :src="video" class="fullscreen-video"></video>
            <div class="lesson-name">{{ name }}</div>
        </div>
    </div>
</template>

<script>
import { getLesson } from "../../requests.js";

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
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
.video-wrapper {
    position: relative;
    width: 65%;
    height: auto;
    display: flex;
    align-items: flex-start;
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
    border-radius: 30px;
}

.video-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -50px;
}
</style>
