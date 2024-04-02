<script>
import axios from 'axios';

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

import {
    courseAPI
} from '../../requests.js';

import Module from '../elements/Module.vue';

export const studentBySelf = 1;
export const teacherBySelf = 2;


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
            view: this.user.role === studentRole ? studentBySelf : teacherBySelf,
            
            addingModuleFormVisible: false,
            newModuleName: ''
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
        },

        async addModule() {
            if (!this.validateNewModuleData()) {
                alert('Введите имя модуля');
            }

            await axios.post(`${courseAPI}/modules/`, {
                module_name: this.newModuleName,
                course: this.id
            });
            window.location.reload();
        },

        validateNewModuleData() {
            return this.newModuleName.length;
        }
    }
}
</script>


<template>
    <div id="annotation" class="flex-column">
        <h2 id="title">{{ name }}</h2>
        <div id="teacher-info" v-if="view === studentBySelf">Курс ведёт: <a :href="`/teacher/${teacherId}`">{{ teacherFullName }}</a></div>

        <div class="label" v-if="view === teacherBySelf">
            {{ description }}
        </div>

        <a :href="`/participants/${this.id}`" class="label">Участники</a>

        <Module v-for="(module, i) in modules" :index="i + 1" :id="module.id" :name="module.name" :view="view"/>

        <div class="flex-column" v-if="view === teacherBySelf">
            <button @click="addingModuleFormVisible = true">Добавить модуль</button>
            <div class="flex-column" v-if="addingModuleFormVisible">
                <div class="flex-row">
                    <label>Название:</label>
                    <input type="text" v-model="newModuleName">
                </div>
                <input type="submit" value="Добавить" @click="addModule">
            </div>
        </div>
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