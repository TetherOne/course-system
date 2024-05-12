<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import Divider from 'primevue/divider';

import {
    Teacher,
    StudentCourse
} from '#types';

import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';

import useUserStore from '#store';

import {
    getShortName
} from '#functions';

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
            const teacher: Teacher = await getTeacher(course.teacher_profile);
            course.teacherShortName = getShortName(teacher.surname, teacher.name, teacher.father_name);
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
                <UserAvatar size="xlarge"/>
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
            <div v-for="(course, i) in courses">
                <div class="flexColumn">
                    <div class="upper">
                        {{ course.course_name }}
                    </div>
                    <div>
                        <router-link class="secondary" :to="{ name: 'teacher', params: { id: course.teacher_profile } }">
                            {{ course.teacherShortName }}
                        </router-link>
                    </div>
                    <div>
                        {{ course.description }}
                    </div>
                </div>
                <Divider v-if="i < courses.length - 1"/>
            </div>
            <div v-if="!courses.length" class="alignSelfCenter">
                У Вас пока нет курсов...
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>