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


<template>
    <div style="margin-left: 40px;">
        <a @click="goBack" style="color: black; text-decoration: none; display: inline-block; border: none; background: none; cursor: pointer;">
            <img src="/src/assets/arrow.png" alt="Arrow" style="width: 40px; height: 40px; vertical-align: middle;">
              <span class="arrow">Назад</span>
        </a>
    </div>

    <div class="video-container">
        <div class="video-wrapper">
            <div class="lesson-name">{{ name }}</div>

            <video controls :src="video" class="fullscreen-video"></video>
        </div>
    </div>

    <div>
        <div class="tittle-description">Дополнительно</div>
        <div class="description">{{ description }}</div>
    </div>

</template>



<style src="../pages-css/lesson.css">

</style>
