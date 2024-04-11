<script>
import {
    getModuleLessons,
    getModuleCheckPoint
} from '../../requests.js'

import {
    studentBySelf,
    teacherBySelf
} from '../pages/Course.vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'



export default {
    setup () {
        return {
            studentBySelf,
            teacherBySelf
        }
    },
    components: {
        Button,
        InputText
    },

    props: {
        index: {
            type: Number
        },
        id: {
            type: Number
        },
        name: {
            type: String
        },
        view: {
            type: Number
        }
    },

    data () {
        return {
            lessons: [],
            noLessonsWarn: 'Здесь пока нет уроков...',
            checkPoint: {},
            addLessonFormVisible: false,
            newLesson: {
                name: '',
                description: '',
                video: '',
                otherFiles: []
            },
            addCheckpointFormVisible: false
        }
    },

    async created () {
        this.lessons = await getModuleLessons(this.id)
        this.checkPoint = await getModuleCheckPoint(this.id)
    },

    computed: {
        noLessons () {
            return !this.lessons.length
        }
    }
}
</script>


<template>
    <div class="flex-column module-card">
        <div>{{ index }}. {{ name }}</div>
        <router-link class="sub" :to="`/lesson/${lesson.id}`" v-for="(lesson, i) in lessons">{{ i + 1 }}. {{
                lesson.name
            }}
        </router-link>

        <div v-if="noLessons">{{ noLessonsWarn }}</div>

        <a class="check-point-link" :href="`/checkPoint/${checkPoint.id}`">КТ "{{ checkPoint.title }}"</a>

        <Button v-if="view===teacherBySelf" label="Добавить урок" @click="addLessonFormVisible=!addLessonFormVisible"/>
        <div v-if="addLessonFormVisible" class="sub flex-column flex-start">
            <label>Название</label>
            <InputText v-model="newLesson.name"/>
            <small>Введите название урока</small>
        </div>

        <Button v-if="view===teacherBySelf" label="Добавить КТ"/>
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

Button {
    align-self: flex-start;
}
</style>