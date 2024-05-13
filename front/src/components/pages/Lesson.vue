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

import {
    Lesson,
    LessonFile
} from '#types';

import Path from '#src/Path';

import {
    getLesson,
    getLessonFiles
} from '#requests';

import Header from '#elements/Header';



const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const name: Ref<string> = ref('');
const description: Ref<string> = ref('');
const video: Ref<string> = ref('');
const files: Ref<LessonFile[]> = ref([]);



async function start(): Promise<void> {
    try {
        const lesson: Lesson = await getLesson(id.value);

        name.value = lesson.name;
        description.value = lesson.description ?? '';
        video.value = lesson.video ?? '';
        files.value = await getLessonFiles(id.value);
    } catch (error) {

    }
}



start();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="block width60 flexColumn">
            <div class="alignSelfCenter upper">
                {{ name }}
            </div>
            <Divider/>
            <div v-if="description">
                {{ description }}
            </div>
            <div v-else>
                Пока нет информации...
            </div>
            <Divider/>
            <div v-if="video">
                <video controls width="320" height="240" :src="video"/>
                <Divider/>
            </div>
            <div v-if="files.length">
                <div class="upper">
                    Дополнительно
                </div>
                <div class="sub flexColumn">
                    <a v-for="file in files" :href="file.other_file">
                        {{ Path.getLastElement(file.other_file) }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
div {
    overflow: hidden;
}
</style>