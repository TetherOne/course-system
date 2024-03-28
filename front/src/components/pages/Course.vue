<script setup>
import {getPathLastElement} from "../../functions.js";
import {useUserStore} from '../../stores/user.js';


const user = useUserStore();
</script>


<script>
import axios from 'axios';
import {mapStores} from 'pinia';

import {useUserStore} from '../../stores/user.js';
import {
    getCourse,
    getCourseModules,
    getModuleLessons,
    getLessonOtherFiles,
    getModuleCheckPoint
} from '../../requests.js';
import {courseAppAPI} from '../../requests.js';


export default {
    data() {
        return {
            id: 0,
            name: '',
            description: '',
            modules: [],
            teacherId: 0,
            teacherName: '',
            students: []
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

        this.getCourseStudents();
    },
    methods: {
        async getCourseStudents() {
            const enrollments = (await axios.get(`${courseAppAPI}/enrollments/?course=${this.id}&format=json`)).data;
            for (const enrollment of enrollments) {
                this.students.push({
                    fullName: `${enrollment.student.surname} ${enrollment.student.name}, ${enrollment.student.father_name}`,
                    faculty: enrollment.student.faculty,
                    group: enrollment.student.group
                });
            }
        }
    }
}
</script>

<template>
    <div class="area flex-column">
        <div id="course-name">{{ name }}</div>
        <div v-if="user.role === 'teacher'" class="flex-column">
            <div>Обучающиеся:</div>
            <table id="students-in-course">
                <tr>
                    <th>ФИО</th>
                    <th>Факультет</th>
                    <th>Группа</th>
                </tr>
                <tr v-for="student in students">
                    <td>{{ student.fullName }}</td>
                    <td>{{ student.faculty }}</td>
                    <td>{{ student.group }}</td>
                </tr>
            </table>
        </div>
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

#students-in-course {
    align-self: flex-start;
}


</style>