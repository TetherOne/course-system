<script setup lang="ts">
import { courseApp } from '#requests';

import { handleRequestError } from '#functions';

import {
    Module,
    Lesson,
    Checkpoint
} from '#types';

import {
    ref,
    Ref
} from 'vue';

import { AxiosError } from 'axios';



interface Props {
    module: Module;
}



const props = defineProps<Props>();
const lessons: Ref<Lesson[]> = ref([]);
const checkpoints: Ref<Checkpoint[]> = ref([]);



try {
    lessons.value = await courseApp.moduleLessons(props.module.id);
    checkpoints.value = await courseApp.moduleCheckpoints(props.module.id);
} catch (error) {
    handleRequestError(error as AxiosError)
}
</script>

<template>
    <div class="flexColumn">
        <div class="h1">
            Уроки
        </div>
        <div class="sub flexColumn">
            <router-link v-for="lesson in lessons" :key="lesson.id" :to="{ name: 'lesson', params: { id: lesson.id } }">
                {{ lesson.name }}
            </router-link>
            <div v-if="!lessons.length">
                Пока нет уроков...
            </div>
        </div>
        <div class="h1">
            Контрольные точки
        </div>
        <div class="sub flexColumn">
            <router-link v-for="checkpoint in checkpoints" :key="checkpoint.id" :to="{ name: 'checkpoint', params: { id: checkpoint.id } }">
                {{ checkpoint.name }}
            </router-link>
            <div v-if="!checkpoints.length">
                Пока нет контрольных точек...
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>