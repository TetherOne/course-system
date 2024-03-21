<script setup>

</script>

<script>


import {getCourseInfo, getModuleVideos, getTeacherInfo} from "../../requests.js";
import axios from "axios";
import {frontURL} from "../../config.js";

export default {
    data() {
        return {
            id: this.$route.params.id,
            info: {},
            teacherInfo: {},
            modules: []
        }
    },
    async created() {
        this.info = await getCourseInfo(this.id);
        this.teacherInfo = await getTeacherInfo(this.info.teacher_profile);


        axios.get(`${frontURL}/api/courseapp/modules/?course=${this.id}&format=json`).then(
            response => {
                this.modules = response.data;
                let i = 1;
                this.modules.forEach(lesson => {
                    lesson.number = i++;
                })
            }
        ).then(
            _ => {
                this.modules.forEach(async module => {
                    module.videos = await getModuleVideos(module.id);
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
            <div v-for="(module, index) in modules" :key="module.id" class="lesson-wrapper">
                <div class="module-title">
                  <b>{{ (index + 1) + ". " + module.module_name}}</b>
                </div>
                <div class="video-wrapper flex-row">
                    <video width="320" height="240" controls v-for="video in module.videos">
                        <source :src="video.video">
                    </video>
                </div>
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
    gap: 20px;
    padding: 10px;
    align-self: center;
    align-items: stretch;
}

.flex-column {
    display: flex;
    flex-direction: column;
}

.lesson-wrapper:first-child::before {
    content: '';
    position: absolute;
    top: -5px; /* Переместить полоску над верхней темой */
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #d1d1d1;
}

.lesson-wrapper {
    position: relative;
    margin-top: 10px;
    padding-top: 20px;
}

.lesson-wrapper::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #d1d1d1;
}


.video-wrapper {
    display: flex;
    flex-direction: row;
}

video {
    margin-right: 10px;
    margin-left: 10px;
    display: block;
}

.module-title {
    width: 1000px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>