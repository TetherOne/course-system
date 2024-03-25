<script>
import axios from 'axios';

import {
    getCourseInfo,
    getModuleVideos,
    getTeacherInfo
} from '../../requests.js';
import {frontURL} from '../../config.js';


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
    <header>
        <div class="tittle-container">
            <span class="back-container">
                <a @click="goBack" class="back-link">
                  <img src="/src/assets/arrow.png" alt="Arrow" class="arrow-image">
                  <span class="back-text">Назад</span>
                </a>
            </span>
        </div>
    </header>

    <body>
        <div class="description-help-container">
            <div class="description-container">
                <div>Курс</div>
                <div class="course-name">{{ info.course_name }}</div>
                <div class="course-description">{{ info.description }}</div>
            </div>
            <br>
            <div class="course-help-container">
                <div class="course-help-tittle">Тех-поддержка теперь в телеграм!</div>
                <div class="course-help-text">Сообщить о проблеме с курсом можно по ссылке в Telegram</div>
            </div>
        </div>

        <div class="modules-lessons-container">
            <div class="modules-container">
                <div class="module-divider"></div>
                <div v-for="(module, index) in modules" :key="module.id" class="lesson-wrapper">
                    <div class="module-title" @click="module.showVideos = !module.showVideos">
                        <b>{{ (index + 1) + ". " + module.module_name }}</b>
                        <span class="arrow" :class="{ 'arrow-expanded': module.showVideos }"></span>
                    </div>
                    <div class="module-divider"></div>
                </div>
            </div>

            <div class="lessons-container">
                <div v-for="(module, index) in modules" :key="module.id">
                    <transition name="slide">
                        <div v-if="module.showVideos" class="video-wrapper flex-row">
                            <div v-for="(video, videoIndex) in module.videos" :key="video.id" class="video-item">
                                <a class="video-href" :href="`/course/${module.id}/lesson/${video.id}?num=${module.number}_${videoIndex + 1}`">
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
    </body>
</template>


<style src="../pages-css/course.css">

</style>