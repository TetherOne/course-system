<script setup lang="ts">
import {
    Lesson,
    Checkpoint
} from '#src/models';

import {
    ref,
    Ref
} from 'vue';

import API from '#src/classes/api';

import {
    lessonPath,
    checkpointPath
} from '#src/router';

import ToastMessage from '#elements/ToastMessage';


interface Props {
    id: number,
    index: number
}


const props = defineProps<Props>();

const name = ref('{module_name}');
const lessons: Ref<Lesson[]> = ref([]);
const checkpoints: Ref<Checkpoint[]> = ref([]);

const toast = ref(ToastMessage);


async function loadModule() {
    try {
        const module = await API.module(props.id);

        name.value = module.module_name;

        lessons.value = await API.moduleLessons(props.id);
        for (const lesson of lessons.value) {
            lesson.link = lessonPath.replace(':id', lesson.id + '');
        }

        checkpoints.value = await API.moduleCheckpoints(props.id);
        for (const checkpoint of checkpoints.value) {
            checkpoint.link = checkpointPath.replace(':id', checkpoint.id + '');
        }
    } catch (error) {
        toast.value.showError(`Не удалось загрузить один из модулей:\n${error}`);
    }
}


loadModule();
</script>

<template>
    <div class="flexColumn">
        <div id="moduleName">Модуль {{ index }}. {{name }}</div>
        <div class="group">Уроки</div>
        <div class="flexColumn sub">
            <router-link v-for="(lesson, i) in lessons" :to="lesson.link">
                {{ i + 1 }}. {{ lesson.lesson_name }}
            </router-link>
            <div v-if="lessons.length === 0">Пока нет уроков...</div>
        </div>
        <div class="group">Контрольные точки</div>
        <div class="flexColumn sub">
            <router-link v-for="(checkpoint, i) in checkpoints" :to="checkpoint.link">
                {{ i + 1 }}. {{ checkpoint.title }}
            </router-link>
            <div v-if="checkpoints.length === 0">Пока нет контрольных точек...</div>
        </div>
    </div>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
@import './../../style';

#moduleName {
    font-weight: 600;
}

.group {
    font-weight: 500;
}
</style>