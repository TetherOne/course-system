<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import Divider from 'primevue/divider';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';

import { StudentCourse } from '#types';

import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';

import useUserStore from '#store';

import { shortenName } from '#functions';

import {
    getStudentCourses,
    getTeacher
} from '#requests';



const user = useUserStore();
const courses: Ref<StudentCourse[]> = ref([]);



async function start(): Promise<void> {
    try {
        courses.value = <StudentCourse[]>await getStudentCourses(await user.getId());

        for (const course of courses.value) {
            course.teacherShortName = shortenName(await getTeacher(course.teacher_profile));
        }
    } catch (error) {

    }
}



start();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="block width60 flexColumn">
            <div class="flexRow alignCenter">
                <UserAvatar :path="user.avatar" size="xlarge"/>
                <div>
                    {{ user.fullName }}
                </div>
            </div>
            <div>
                Факультет: {{ user.faculty }}
            </div>
            <div>Группа: {{ user.group }}</div>
        </div>
        <div class="block width60 flexColumn">
            <div class="upper alignSelfCenter">
                Моё обучение
            </div>
            <Divider/>
            <div class="coursesList flexRow">
                <Card v-for="course in courses">
                    <template #header>
                        <img v-if="course.image" :src="course.image" alt="Аватар курса">
                        <img v-else src="./../../assets/courseDefaultImage.png" alt="Аватар курса">
                    </template>
                    <template #title>
                        <router-link :to="{ name: 'course', params: { id: course.id } }">
                            {{ course.course_name }}
                        </router-link>
                    </template>
                    <template #subtitle>
                        <router-link :to="{ name: 'teacher', params: { id: course.teacher_profile } }">
                            {{ course.teacherShortName }}
                        </router-link>
                    </template>
                    <template #content>
                        <ScrollPanel v-if="course.description" style="width: 100%; height: 200px;">
                            {{ course.description }}
                        </ScrollPanel>
                        <div v-else>
                            Пока нет информации о курсе...
                        </div>
                    </template>
                </Card>
            </div>
            <div v-if="!courses.length" class="alignSelfCenter">
                У Вас пока нет курсов...
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.p-card {
    width: 350px;
    overflow: hidden;
}

:deep(.p-card-content) {
    max-height: 200px;
}

img {
    width: 100%;
    height: auto;
}
</style>