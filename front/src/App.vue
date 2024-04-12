<script setup>
import { onBeforeMount } from 'vue';

import Button from 'primevue/button';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import useUserStore, { UserRoles } from '#store';
import {
    getStudent,
    getStudentCourses,
    getTeacher,
    getTeacherCourses
} from '#requests';
import { shortenName } from '#functions';
import Header from '#elements/Header';


const user = useUserStore();
const toast = useToast();
const Errors = {
    User: 0,
    Courses: 1,
    CourseTeacher: 2
};


async function loadUserData() {
    const userId = user.id;
    let data = {};

    try {
        switch (user.role) {
            case UserRoles.Student:
                data = await getStudent(userId);
                user.group = data.group;

                break;
            case UserRoles.Teacher:
                data = await getTeacher(userId);
                break;
        }

        user.surname = data.surname;
        user.name = data.name;
        user.father_name = data.father_name;
        user.faculty = data.faculty;
        user.avatar = data.avatar;
    } catch (error) {
        showError(Errors.User);
    }
}

async function loadUserCourses() {
    const userId = user.id;

    try {
        switch (user.role) {
            case UserRoles.Student:
                user.courses = await getStudentCourses(userId);
                for (const course of user.courses) {
                    try {
                        course.teacherShortName = await getTeacherShortName(course.teacher_profile);
                    } catch (error) {
                        showError(Errors.CourseTeacher, course.course_name);
                    }
                }
                break;
            case UserRoles.Teacher:
                user.courses = await getTeacherCourses(userId);
        }
    } catch (error) {
        showError(Errors.Courses);
    }
}

async function getTeacherShortName(teacherId) {
    const teacher = await getTeacher(teacherId);
    return shortenName(teacher.surname, teacher.name, teacher.father_name);
}

function showError(type, courseName) {
    const toastConfig = {
        severity: 'error',
        summary: 'Ошибка',
        detail: '',
        life: 3000
    };
    switch (type) {
        case Errors.User:
            toastConfig.detail = 'Не удалось загрузить информацию о вас';
            break;
        case Errors.Courses:
            toastConfig.detail = 'Не удалось загрузить информацию о ваших курсах';
            break;
        case Errors.CourseTeacher:
            toastConfig.detail = `Не удалось загрузить информацию о преподавателе курса "${courseName}"`;
            break;
    }
    toast.add(toastConfig);
}

function debug() {

}


onBeforeMount(() => {
    loadUserData();
    loadUserCourses();
})
</script>


<template>
    <div class="flex-column align-items-center">
        <Header/>
        <router-view/>
        <Toast/>
        <Button @click="debug">Отладка</Button>
    </div>
</template>


<style scoped>

</style>