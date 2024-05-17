<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import { AxiosError } from 'axios';

import useUserStore from '#store';

import {
    ErrorHandler,
    Course
} from '#types';

import { shortenName } from '#functions';

import { userApp } from '#requests';

import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';
import CoursesList from '#elements/CoursesList';




const user = useUserStore();

const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;

const courses: Ref<Course[]> = ref([]);



try {
    courses.value = await userApp.studentCourses(user.id);
    for (const course of courses.value) {
        course.teacherShortName = shortenName(await userApp.teacher(course.teacher_profile));
    }
} catch (error) {
    await handleRequestError(error as AxiosError);
}
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexRow alignCenter block wide">
            <UserAvatar size="xlarge" :avatarPath="user.avatar" :name="user.name"/>
            <div class="flexColumn">
                <div>
                    {{ user.fullName }}
                </div>
                <div>
                    Факультет: {{ user.faculty }}
                </div>
                <div>
                    Группа: {{ user.group }}
                </div>
            </div>
        </div>
        <CoursesList title="Моё обучение" :courses="courses"/>
    </div>
</template>