<script setup>

import {getPathLastElement} from "../../functions.js";
</script>


<script>
import {mapStores} from 'pinia';

import {useUserStore} from '../../stores/user.js';
import {
    getCourse,
    getCourseModules,
    getModuleLessons,
    getLessonOtherFiles,
    getModuleCheckPoint
} from '../../requests.js';


export default {
    data() {
        return {
            id: 0,
            name: '',
            description: '',
            modules: [],
            teacherId: 0,
            teacherName: ''
        };
    },
    computed: {
        ...mapStores(useUserStore)
    },
    async created() {
        this.id = this.$route.params.id;

        const course = await getCourse(this.id);
        this.name = course.course_name;
        this.description = course.description;
        this.modules = await getCourseModules(this.id);

        for (const module of this.modules) {
            module.lessons = await getModuleLessons(module.id);

            for (const lesson of module.lessons) {
                lesson.otherFiles = await getLessonOtherFiles(lesson.id);
            }

            module.checkPoint = await getModuleCheckPoint(module.id);
        }
    }
}
</script>

<template>
    <div class="area flex-column">
        <div id="course-name">{{ name }}</div>
        <div class="module-wrapper flex-column" v-for="(module, moduleIndex) in modules">
            <div>Модуль {{ moduleIndex + 1 }}. {{ module.module_name }}</div>
            <div class="flex-column sub lessons-wrapper">
                <div v-for="(lesson, lessonIndex) in module.lessons">
                    <div>Тема {{ lessonIndex + 1 }}. {{ lesson.lesson_name }}</div>
                    <div class="sub flex-column">
                        <div>{{ lesson.description }}</div>
                        <video width="320" height="240" controls>
                            <source :src="lesson.video">
                        </video>
                        <a v-for="file in lesson.otherFiles" :href="file.other_file">{{ getPathLastElement(file.other_file) }}</a>
                    </div>
                </div>
            </div>
            <a v-if="module.checkPoint" :href="`/checkPoint/${module.checkPoint.id}`">КТ "{{ module.checkPoint.title }}"</a>
        </div>
    </div>
</template>

<style scoped>
#course-name {
    align-self: center;
}

.module-wrapper {
    background-color: white;
    padding: var(--gap);
    border-radius: 7px;
}

.sub {
    margin-left: 2rem;
}

.area {
    max-width: 80vw;
}
</style>