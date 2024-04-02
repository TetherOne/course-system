<script>
import {
    useUserStore
} from '../../stores/user.js';

import {
    getCourse,
    getCourseModules,
    getTeacher
} from '../../requests.js';

import {
    studentRole,
    teacherRole
} from '../../stores/user.js';

import Module from '../elements/Module.vue';

const studentBySelf = 1;
const teacherBySelf = 2;


export default {
    setup() {
        const user = useUserStore();

        return {
            user,
            studentBySelf,
            teacherBySelf
        }
    },

    components: {
        Module
    },

    data() {
        return {
            id: this.$route.params.id,
            name: '',
            description: '',
            teacherId: 0,
            teacherFullName: '',
            modules: [],
            view: this.user.role === studentRole ? studentBySelf : teacherBySelf
        }
    },

    created() {
        this.loadAllData();
    },

    methods: {
        loadAllData() {
            this.loadCourse();
            this.loadModules();
        },

        async loadCourse() {
            const course = await getCourse(this.id);
            this.name = course.name;
            this.description = course.description;
            this.password = course.password;

            if (this.view === studentBySelf) {
                this.teacherId = course.teacherId;
                const teacher = await getTeacher(this.teacherId);

                this.teacherFullName = `${teacher.surname} ${teacher.name} ${teacher.fatherName}`;
            }
        },

        async loadModules() {
            this.modules = await getCourseModules(this.id);
        }
    }
}
</script>


<template>
    <div id="annotation" class="flex-column">
        <h2 id="title">{{ name }}</h2>
        <div id="teacher-info">Курс ведёт: <a :href="`/teacher/${teacherId}`">{{ teacherFullName }}</a></div>

        <div class="label">
            {{ description }}
        </div>

        <Module v-for="(module, i) in modules" :index="i + 1" :id="module.id" :name="module.name"/>
    </div>
</template>


<style scoped>
#annotation {
    background-color: #e6e6e6;
    padding: calc(var(--std-padding) + 1em);
    border-radius: var(--std-corner-radius);
    max-width: 60vw;
}

#title {
    text-align: center;
}

#teacher-info a {
    color: black;
}
</style>