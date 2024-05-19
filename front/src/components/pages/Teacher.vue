<script setup lang="ts">
import {
    Ref,
    ComputedRef,
    ref,
    computed,
    inject
} from 'vue';

import {
    useRoute,
    RouteLocationNormalizedLoaded
} from 'vue-router';

import { AxiosError } from 'axios';

import useUserStore from '#store';

import { Role } from '#enums';

import {
    ErrorHandler,
    Teacher,
    Course
} from '#types';

import { buildFullName } from '#functions';

import { userApp } from '#requests';

import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';
import CoursesList from '#elements/CoursesList';



const user = useUserStore();

const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;

const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(route.params.id as string));
const teacher: Ref<Teacher> = ref({} as Teacher);
const teacherFullName: Ref<string> = ref('');
const title: ComputedRef<string> = computed((): string => user.role === Role.Student ? 'Курсы' : 'Мои курсы');
const courses: Ref<Course[]> = ref([]);



try {
    teacher.value = await userApp.teacher(id.value);
    teacherFullName.value = buildFullName(teacher.value);
    courses.value = await userApp.teacherCourses(id.value);

    if (user.isStudent) {
        for (const course of courses.value) {
            course.studentHasIt = await userApp.studentHasCourse(user.id, course.id);
        }
    }
} catch (error) {
    await handleRequestError(error as AxiosError)
}
</script>

<template>
    <div class="flex-column alignCenter">
        <Header/>
        <div class="flex-row alignCenter block wide">
            <UserAvatar size="xlarge" :avatarPath="teacher.avatar" :name="teacher.name"/>
            <div class="flex-column">
                <div>
                    {{ teacherFullName }}
                </div>
                <div>
                    Факультет: {{ teacher.faculty }}
                </div>
            </div>
        </div>
        <CoursesList :title="title" :courses="courses"/>
    </div>
</template>