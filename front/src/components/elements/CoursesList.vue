<script setup>
import {
    ref,
    onBeforeMount
} from 'vue';
import { useRoute } from 'vue-router';

import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Fieldset from 'primevue/fieldset';

import { useToast } from 'primevue/usetoast';

import Path from '#classes/path';
import useUserStore, { UserRoles } from '#store';
import {
    teacherPath,
    coursePath
} from '#router';
import {
    Views,
    Toasts
} from '#config';
import {
    getStudentCourses, getTeacher,
    getTeacherCourses
} from '#requests';
import { shortenName, showToast } from '#functions';


const user = useUserStore();
const route = useRoute();

let view;

const legend = ref('');
const courses = ref([]);

const toast = useToast();


function setView() {
    const currentLink = Path.getFirstElement(window.location.pathname.slice(1));
    switch (currentLink) {
        case 'student':
            view = Views.StudentSelf;
            break;
        case 'teacher':
            switch (user.role) {
                case UserRoles.Student:
                    view = Views.StudentAtTeacher;
                    break;
                case UserRoles.Teacher:
                    view = Views.TeacherSelf;
                    break;
            }
            break;
    }
}

function setLegend() {
    switch (view) {
        case Views.StudentSelf:
        case Views.TeacherSelf:
            legend.value = 'Мои курсы';
            break;
        case Views.StudentAtTeacher:
            legend.value = 'Курсы';
            break;
    }
}

async function setCourses() {
    try {
        switch (view) {
            case Views.StudentSelf:
                courses.value = await getStudentCourses(user.id);

                for (const course of courses.value) {
                    try {
                        course.teacherShortName = await getTeacherShortName(course.teacher_profile);
                    } catch (error) {
                        showToast(toast, Toasts.Error, `Не удалось получить информацию о
                        преподавателе курса "${course.course_name}". Описание ошибки:\n${error}`, 'Ошибка');
                    }
                }

                break;
            case Views.TeacherSelf:
                courses.value = await getTeacherCourses(user.id);
                break;
            case Views.StudentAtTeacher:
                courses.value = await getTeacherCourses(route.params.id);
                break;
        }
    } catch (error) {
        showToast(toast, Toasts.Error, `Не удалось получить информацию о ваших курсах. Описание ошибки: ${error}`, 'Ошибка');
    }
}

async function getTeacherShortName(teacherId) {
    const teacher = await getTeacher(teacherId);
    return shortenName(teacher.surname, teacher.name, teacher.father_name);
}


onBeforeMount(() => {
    setView();
    setLegend();
    setCourses();
});
</script>

<template>
    <Fieldset :legend="legend">
        <div class="flex-column" v-for="(course, i) in courses">
            <Card>
                <template #title>
                    <router-link :to="coursePath.replace(':id', course.id)">{{ course.course_name }}</router-link>
                </template>
                <template #subtitle>
                    <router-link :to="teacherPath.replace(':id', course.teacher_profile)">
                        {{ course.teacherShortName }}
                    </router-link>
                </template>
                <template #content>{{ course.description }}</template>
            </Card>
            <Divider v-if="i < courses.length - 1"/>
        </div>
    </Fieldset>
</template>

<style scoped>
.p-card {
    max-width: 60vw;
}
</style>