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
                <span style="font-size: 20px; vertical-align: middle; margin-left: 10px;">Назад</span>
            </a>
        </div>

        <div id="lessons-wrapper" class="flex-column">
            <div v-for="(module, index) in modules" :key="module.id" class="lesson-wrapper">
                <div class="module-title" @click="module.showVideos = !module.showVideos">
                    <b>{{ (index + 1) + ". " + module.module_name}}</b>
                    <span class="arrow" :class="{ 'arrow-expanded': module.showVideos }"></span>
                </div>
                <transition name="slide">
                    <div v-if="module.showVideos" class="video-wrapper flex-row">
                        <div v-for="(video, videoIndex) in module.videos" :key="video.id" class="video-item">
                            <video width="auto" height="220" controls>
                                <source :src="video.video">
                            </video>
                            <a class="lesson-num">{{ `${module.number}.${videoIndex + 1}` }}</a>
                            <a class="lesson-name">{{ video.lesson_name }}</a>
                        </div>
                    </div>
                </transition>
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
    top: -5px;
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
    animation: fadeIn 0.15s ease-in-out;
}

video {
    margin-top: 25px;
    margin-bottom: 20px;
    margin-right: 10px;
    margin-left: 10px;
    display: block;
    border-radius: 25px;
}

.module-title {
    width:1250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.module-title {
    position: relative;
}

.module-title .arrow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url('/src/assets/120890.png');
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
}

.module-title .arrow-expanded {
    transform: translateY(-50%) rotate(180deg);
}

.lesson-num {
    font-weight: bold;
    font-size: 15px;
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 10px;
}

.lesson-name {
    font-weight: bold;
    font-size: 17px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
.slide-enter-active, .slide-leave-active {
    transition: all 0.15s;
}

.slide-enter, .slide-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>