<script setup lang="ts">
import {
    ref,
    Ref
} from 'vue';

import {
    coursePath,
    teacherPath
} from '#src/router';

import {
    Course,
    Teacher
} from '#src/models';

import API from '#src/classes/api';
import ToastMessage from '#elements/ToastMessage';
import {useRouter} from 'vue-router';
import {shortenName} from '#src/functions';

import {
    Role,
    useUserStore
} from '#store';

import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';


interface Props {
    legend: string
}


const courses: Ref<Course[]> = ref([]);
const user = useUserStore();
const props = defineProps<Props>();

const router = useRouter();
const toast = ref(ToastMessage);


async function loadCourses() {
    try {
        switch (user.role) {
            case Role.Student:
                courses.value = await API.studentCourses(user.id);

                for (const course of courses.value) {
                    try {
                        course.teacher = await API.teacher(course.teacher_profile);
                        course.teacherShortName = getTeacherShortName(course.teacher);
                        course.teacherLink = getTeacherLink(course.teacher_profile);
                    } catch (error) {
                        toast.value.showWarn(`Не удалось загрузить преподавателя курса ${course.course_name}.\n${error}`);
                    }
                }
                break;
            case Role.Teacher:
                courses.value = await API.teacherCourses(user.id);
                break;
        }
        for (const course of courses.value) {
            course.link = getCourseLink(course.id);
        }
    } catch (error) {
        toast.value.showError(`Не удалось загрузить Ваши курсы:\n${error}`);
        return false;
    }
}


function getTeacherShortName(instance: Teacher) {
    return shortenName(instance.surname, instance.name, instance.father_name);
}

function getCourseLink(id: number) {
    return coursePath.replace(':id', id + '');
}

function getTeacherLink(id: number) {
    return teacherPath.replace(':id', id + '');
}


loadCourses();
</script>

<template>
    <Fieldset :legend="props.legend">
        <div class="flexRow justifyCenter courseCards">
            <Card v-for="course in courses">
                <template #title>
                    <router-link :to="course.link">{{ course.course_name }}</router-link>
                </template>
                <template #subtitle v-if="user.role === Role.Student">
                    <router-link :to="course.teacherLink">{{ course.teacherShortName }}</router-link>
                </template>
                <template #content>{{ course.description }}</template>
            </Card>
        </div>

        <div class="alignSelfCenter" v-if="courses.length === 0">Пока нет курсов...</div>
    </Fieldset>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
@import './../../style';


.p-fieldset {
    max-width: 60vw;
}

:deep(.p-fieldset-content) {
    @extend .flexColumn;
}


.courseCards {
    flex-wrap: wrap;
}

$cardWidth: 18vw;
$cardHeight: 45vh;
.p-card {
    width: $cardWidth;
    height: $cardHeight;
    overflow-y: auto;
}
</style>