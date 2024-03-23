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
    },
    methods: {
        toggleVideos(index) {
            this.modules[index].showVideos = !this.modules[index].showVideos;
        }
    },
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
                <span style="font-size: 20px; vertical-align: middle; margin-left: 1px; color: #5A5959;">Назад</span>

            </a>
        </div>

        <div id="lessons-wrapper" class="flex-column">
            <div v-for="(module, index) in modules" :key="module.id" class="lesson-wrapper">
                <div class="module-title" @click="module.showVideos = !module.showVideos">
                    <b>{{ (index + 1) + ". " + module.module_name }}</b>
                    <span class="arrow" :class="{ 'arrow-expanded': module.showVideos }"></span>
                </div>
                <transition name="slide">
                    <div v-if="module.showVideos" class="video-wrapper flex-row">
                        <div v-for="(video, videoIndex) in module.videos" :key="video.id" class="video-item">
                            <a class="video-href" :href="`/course/${module.id}/lesson/${video.id}`">
                                <video width="auto" height="150" controls>
                                    <source :src="video.video">
                                </video>
                                <a class="lesson-num">{{ `${module.number}.${videoIndex + 1}` }}</a>
                                <a class="lesson-name">{{ video.lesson_name }}</a>
                            </a>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style src="../pages-css/course.css">

</style>