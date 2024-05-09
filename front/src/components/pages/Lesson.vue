<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    useRoute
} from 'vue-router';

import Divider from 'primevue/divider';

import Lesson from '#classes/Lesson';

import ToastMessage from '#elements/ToastMessage';

import {
    getLesson
} from '#requests';



const toast: Ref<any> = ref(null);
const route: RouteLocationNormalizedLoaded = useRoute();

const data: Ref<Lesson> = ref(<Lesson>{});



async function start() {
    try {
        data.value = new Lesson(await getLesson(parseInt(<string>route.params.id)));
        await data.value.loadFiles();
    } catch (error) {
        toast.value.showError(`${error}`, 'Ошибка загрузки урока');
    }
}



start();
</script>

<template>
    <div id="wrapper" class="flexColumn container">
        <div class="alignSelfCenter">{{ data.name }}</div>
        <Divider/>
        <div>{{ data.description }}</div>
        <div v-if="!data.description">Пока нет полезной информации...</div>
        <div v-if="data.video">
            <Divider/>
            <video controls width="320" height="240" :src="data.video"/>
        </div>
        <div v-if="data.files.length">
            <Divider/>
            <div>Дополнительно:</div>
            <div class="sub flexColumn">
                <a v-for="file in data.files" :key="file.id" :href="file.path">{{ file.name }}</a>
            </div>
        </div>
    </div>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
#wrapper {
    min-width: 60vw;
    max-width: 60vw;
}
</style>