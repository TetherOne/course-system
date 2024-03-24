<!Doctype html>

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
</template>


<script src="../pages-scripts/course.js">

</script>


<style src="../pages-css/course.css">

</style>