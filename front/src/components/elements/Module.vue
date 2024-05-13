<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import {
    Module,
    Lesson,
    Checkpoint
} from '#types';

import {
    getModuleLessons,
    getModuleCheckpoints
} from '#requests';



interface Props {
    module: Module
}



const props = defineProps<Props>();

const id: Ref<number> = ref(props.module.id);
const lessons: Ref<Lesson[]> = ref([]);
const checkpoints: Ref<Checkpoint[]> = ref([]);



async function start() {
    try {
        lessons.value = await getModuleLessons(id.value);
        checkpoints.value = await getModuleCheckpoints(id.value);
    } catch (error) {

    }
}



start();
</script>

<template>
    <div class="flexColumn sub">
        <div class="upper">
            Уроки
        </div>
        <div class="sub flexColumn">
            <router-link v-for="lesson in lessons" :to="{ name: 'lesson', params: { id: lesson.id } }">
                {{ lesson.name }}
            </router-link>
            <div v-if="!lessons.length">
                Пока нет уроков...
            </div>
        </div>
        <div class="upper">
            Контрольные точки
        </div>
        <div class="sub flexColumn">
            <router-link v-for="checkpoint in checkpoints" :to="{ name: 'checkpoint', params: { id: checkpoint.id } }">
                {{ checkpoint.name }}
            </router-link>
            <div v-if="!checkpoints.length">
                Пока нет контрольных точек...
            </div>
        </div>
    </div>
</template>