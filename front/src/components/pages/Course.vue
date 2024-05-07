<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    useRoute
} from 'vue-router'

import Divider from 'primevue/divider';

import { Role } from '#enums';
import Course from '#classes/Course';

import useUserStore from '#store';

import { getCourse } from '#requests';

import ToastMessage from '#elements/ToastMessage';
import Module from '#elements/Module';



const toast: Ref<any> = ref(null);
const route: RouteLocationNormalizedLoaded = useRoute();

const user = useUserStore();
const course: Ref<Course> = ref(<Course>{});



async function start() {
    try {
        course.value = new Course(await getCourse(parseInt(<string>route.params.id)));
    } catch (error) {
        toast.value.showError(`Дополнительные сведения:\n${error}`, 'Ошибка загрузки курса');
    }

    if (user.role === Role.Student) {
        try {
            await course.value.loadTeacher();
        } catch (error) {
            toast.value.showError(`Дополнительные сведения:\n${error}`, 'Ошибка загрузки преподавателя');
        }
    }

    try {
        await course.value.loadModules();
    } catch (error) {
        toast.value.showError(`Дополнительные сведения:\n${error}`, 'Ошибка загрузки модулей');
    }
}



start();
</script>

<template>
    <div class="flexColumn container">
        <div id="courseName" class="alignSelfCenter">{{ course.name }}</div>
        <div v-if="user.role === Role.Student" class="flexRow">
            <div>Курс ведёт:</div>
            <router-link :to="{ name: 'teacher', params: { id: course.teacher?.id } }">
                {{ course.teacher?.getFullName() }}
            </router-link>
        </div>
        <Divider />
        <div v-for="(module, i) in course.modules" :key="module.id">
            <Module :data="module"/>
            <Divider v-if="i < course.modules.length - 1"/>
        </div>
    </div>
    <ToastMessage ref="toast"/>
</template>

<style scoped>
#courseName {
    font-size: 1.5em;
}

.container {
    min-width: 35vw;
}
</style>