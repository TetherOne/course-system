<script>
import axios from 'axios';

import {
    courseAPI
} from '../../requests.js';

import {
    useUserStore
} from '../../stores/user.js';


export const studentBySelf = 1;
export const teacherBySelf = 2;
export const teacherByStudent = 3;

export default {
    setup() {
        const user = useUserStore();

        return {
            user,
            studentBySelf,
            teacherBySelf,
            teacherByStudent
        }
    },

    props: {
        courses: {
            type: Array
        },

        view: {
            type: Number
        }
    },

    data() {
        return {
            addCourseFormVisible: false,
            newCourseName: '',
            newCourseDescription: '',
            newCoursePassword: ''
        }
    },

    methods: {
        handleAddCourse() {
            this.addCourseFormVisible = true;
        },

        async addCourse() {
            if (!this.validateNewCourseData()) {
                alert('Заполните все поля');
                return;
            }

            await axios.post(`${courseAPI}/courses/`, {
                course_name: this.newCourseName,
                description: this.newCourseDescription,
                status: true,
                teacher_profile: parseInt(this.user.id),
                course_password: this.newCoursePassword
            });

            window.location.reload();
        },

        validateNewCourseData() {
            if (!this.newCourseName || !this.newCourseDescription || !this.newCoursePassword) {
                return false;
            }
            return true;
        }
    }
}
</script>

<template>
    <div class="flex-column">
        <div class="flex-column course-card" v-for="course in courses">
            <a :href="`/course/${course.id}`">{{ course.name }}</a>
            <a :href="`/teacher/${course.teacherId}`" v-if="view === studentBySelf">{{ course.teacherShortName }}</a>
        </div>

        <button v-if="view === teacherBySelf" @click="handleAddCourse">Добавить курс</button>

        <div class="flex-column container" id="add-course-form" v-if="addCourseFormVisible">
            <div class="flex-row">
                <label for="new-course-name">Название:</label>
                <input type="text" id="new-course-name" v-model="newCourseName">
            </div>
            <div class="flex-row">
                <label for="new-course-description">Описание:</label>
                <textarea id="new-course-description" cols="30" rows="10" v-model="newCourseDescription"></textarea>
            </div>
            <div class="flex-row">
                <label title="Пароль, по которому студент получает доступ к курсу">Пароль:</label>
                <input type="text" v-model="newCoursePassword">
            </div>
            <input type="submit" value="Добавить" style="align-self: center" @click="addCourse">
        </div>
    </div>
</template>

<style scoped>
.course-card {
    background-color: var(--course-card-background-color);
    border-radius: var(--std-corner-radius);
    padding: var(--std-padding);
    transition: 100ms;
    font-size: 1.5rem
}

.course-card:hover {
    transform: translateX(10px);
    box-shadow: 0 0 7px gray;
}

.course-card a {
    color: black;
    text-decoration: none;
}

.course-card a:hover {
    text-decoration: underline;
}

button {
    align-self: center;
}
</style>