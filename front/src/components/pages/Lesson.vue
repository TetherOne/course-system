<script setup lang="ts">
import Header from '#elements/Header';
import Divider from 'primevue/divider';

import { courseApp } from '#requests';

import { handleRequestError } from '#functions';

import Path from '#src/classes/Path';

import {
    ref,
    Ref
} from 'vue';

import {
    useRoute,
    RouteLocationNormalizedLoaded
} from 'vue-router';

import {
    Lesson,
    LessonFile
} from '#types';

import { AxiosError } from 'axios';



const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(route.params.id as string));
const name: Ref<string> = ref('');
const description: Ref<string> = ref('');
const videoPath: Ref<string> = ref('');
const files: Ref<LessonFile[]> = ref([]);



try {
    const lesson: Lesson = await courseApp.lesson(id.value);

    name.value = lesson.name;
    description.value = lesson.description;
    videoPath.value = lesson.video ?? '';

    files.value = await courseApp.lessonFiles(id.value);
    for (const file of files.value) {
        file.name = decodeURIComponent(Path.getLastElement(file.other_file));
    }
} catch (error) {
    handleRequestError(error as AxiosError);
}
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexColumn block wide">
            <div class="h2">
                {{ name }}
            </div>
            <Divider/>
            <div v-if="description">
                <div>
                    {{ description }}
                </div>
                <Divider/>
            </div>
            <div v-else>
                Пока нет информации
            </div>
            <div v-if="videoPath">
                <video controls width="320" height="240" :src="videoPath"/>
                <Divider/>
            </div>
            <div v-if="files.length" class="flexColumn">
                <div class="h1">Дополнительно:</div>
                <div id="files" class="flexColumn sub">
                    <a v-for="file in files" :key="file.id" :href="file.other_file">
                        {{ file.name }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#files {
    flex-wrap: wrap;
}
</style>