<script>
import {
    getModuleLessons,
    getModuleCheckPoint
} from '../../requests.js';


export default {
    props: {
        index: {
            type: Number
        },
        id: {
            type: Number
        },
        name: {
            type: String
        }
    },

    data() {
        return {
            lessons: [],
            noLessonsWarn: 'Здесь пока нет уроков...',
            checkPoint: {}
        }
    },

    async created() {
        this.lessons = await getModuleLessons(this.id);
        this.checkPoint = await getModuleCheckPoint(this.id);
    },

    computed: {
        noLessons() {
            return !this.lessons.length;
        }
    }
}
</script>


<template>
    <div class="flex-column module-card">
        <div>{{ index }}. {{ name }}</div>
        <a class="sub" :href="`/lesson/${lesson.id}`" v-for="(lesson, i) in lessons">{{ i + 1}}. {{ lesson.name }}</a>

        <div v-if="noLessons">{{ noLessonsWarn }}</div>

        <a class="check-point-link" :href="`/checkPoint/${checkPoint.id}`">КТ "{{ checkPoint.title }}"</a>
    </div>
</template>


<style scoped>
.module-card {
    background-color: white;
    padding: var(--std-padding);
    border-radius: var(--std-corner-radius);
    transition: 100ms;
}

.module-card:hover {
    box-shadow: 0 0 7px gray;
}

.module-card a {
    color: black;
    text-decoration: none;
    transition: 100ms;
    padding: var(--std-padding);
    border-radius: var(--std-corner-radius);
}

.module-card a:hover {
    background-color: lightblue;
}

.check-point-link {
    background-color: #EB946F;
}
</style>