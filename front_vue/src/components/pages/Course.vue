<script setup>

</script>

<script>


import {getCourseInfo, getTeacherInfo} from "../../requests.js";
import axios from "axios";
import {frontURL} from "../../config.js";

export default {
    data() {
        return {
            id: this.$route.params.id,
            info: {},
            teacherInfo: {},
            lessons: []
        }
    },
    async created() {
        this.info = await getCourseInfo(this.id);
        this.teacherInfo = await getTeacherInfo(this.info.teacher_profile);


        axios.get(`${frontURL}/api/courseapp/lessons/?course=${this.id}&format=json`).then(
            response => {
                this.lessons = response.data;
                let i = 1;
                this.lessons.forEach(lesson => {
                    lesson.number = i++;
                })
            }
        )
    }
}
</script>

<template>
    <div id="main-wrapper" class="flex-column">
        <div id="header" class="flex-row" style="gap: 30px;">
            <div class="flex-column" style="gap: 10px;">
                <div class="label">{{ info.course_name }}</div>
                <div class="label">{{ teacherInfo.surname }} {{ teacherInfo.name }} {{ teacherInfo.father_name }}</div>
            </div>
            <div class="label">
                {{ info.description }}
            </div>
            <div class="spacer"></div>

        </div>
        <div style="margin-left: 40px;">
          <a href="/student" style="color: black; text-decoration: none; display: inline-block;">
            <img src="/src/assets/arrow.png" alt="Arrow" style="width: 40px; height: 40px; vertical-align: middle;">
            <span style="font-size: 20px; vertical-align: middle; margin-left: 10px;">Назад</span>
          </a>
        </div>

        <div id="lessons-wrapper" class="flex-column">
          <div v-for="lesson in lessons" class="lesson-wrapper flex-column">
              <div>Лекция {{lesson.number}}. {{ lesson.lesson_name }}</div>
              <div>{{ lesson.description }}</div>
              <video width="320" height="240" controls>
                  <source :src="lesson.video">
              </video>
          </div>
      </div>
    </div>
</template>

<style scoped>

#main-wrapper {
    gap: 10px;
}

#header {
    background-color: #323232;
    padding: 10px;
}

.label {
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
}

#lessons-wrapper {
    gap: 10px;
    align-self: center;
    align-items: stretch;
}

.lesson-wrapper {
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #a49dc2;
}
</style>