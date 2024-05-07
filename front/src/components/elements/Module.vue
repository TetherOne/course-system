<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import Module from '#classes/Module';

import ToastMessage from '#elements/ToastMessage';



const props = defineProps<{
    data: Module
}>();

const toast: Ref<any> = ref(null);



async function start() {
    try {
        await props.data.loadLessons();
    } catch (error) {
        toast.value.showError(`${error}`, `Ошибка загрузки уроков модуля "${props.data.name}"`);
    }

    try {
        await props.data.loadCheckpoints();
    } catch (error) {
        toast.value.showError(`${error}`, `Ошибка загрузки контрольных точек модуля "${props.data.name}"`);
    }
}



start();
</script>

<template>
    <div class="flexColumn">
        <div id="moduleName">{{ data.name }}</div>
        <div class="groupTitle">Уроки</div>
        <div class="sub flexColumn">
            <router-link
                v-for="lesson in data.lessons"
                :to="{ name: 'lesson', params: { id: lesson.id } }"
                :key="lesson.id"
            >
                {{ lesson.name }}
            </router-link>
            <div v-if="!data.lessons.length">Пока нет уроков...</div>
        </div>
        <div class="groupTitle">Контрольные точки</div>
        <div class="sub flexColumn">
            <router-link
                v-for="checkpoint in data.checkpoints"
                :to="{ name: 'checkpoint', params: { id: checkpoint.id } }"
                :key="checkpoint.id"
            >
                {{ checkpoint.name }}
            </router-link>
            <div v-if="!data.checkpoints.length">Пока нет контрольных точек...</div>
        </div>
    </div>
    <ToastMessage/>
</template>

<style scoped lang="scss">
#moduleName {
    font-size: 1.2em;
}

.groupTitle {
    font-weight: bold;
}
</style>