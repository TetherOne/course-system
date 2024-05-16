<script setup lang="ts">
import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';
import CoursesList from '#elements/CoursesList';

import { userApp } from '#requests';

import {
    ref,
    Ref
} from 'vue';

import { Course } from '#types';
import useUserStore from '#store';

import {
    shortenName,
    handleRequestError
} from '#functions';

import { AxiosError } from 'axios';



const courses: Ref<Course[]> = ref([]);
const user = useUserStore();



try {
    courses.value = await userApp.studentCourses(user.id);
    for (const course of courses.value) {
        course.teacherShortName = shortenName(await userApp.teacher(course.teacher_profile));
    }
} catch (error) {
    handleRequestError(error as AxiosError);
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