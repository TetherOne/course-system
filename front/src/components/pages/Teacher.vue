<script setup lang="ts">
import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';
import CoursesList from '#elements/CoursesList';

import { userApp } from '#requests';

import useUserStore from '#store';

import {
    handleRequestError,
    buildFullName
} from '#functions';

import { Role } from '#enums';

import {
    Teacher,
    Course
} from '#types';

import {
    ref,
    Ref,
    computed,
    ComputedRef
} from 'vue';

import {
    useRoute,
    RouteLocationNormalizedLoaded
} from 'vue-router';

import { AxiosError } from 'axios';



const route: RouteLocationNormalizedLoaded = useRoute();

const user = useUserStore();

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
    handleRequestError(error as AxiosError)
}
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexRow alignCenter block wide">
            <UserAvatar size="xlarge" :avatarPath="teacher.avatar" :name="teacher.name"/>
            <div class="flexColumn">
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

<style scoped lang="scss">

</style>