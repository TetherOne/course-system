<script setup lang="ts">
import {
    useUserStore,
    Role
} from '#store';

import API from '#src/classes/api';
import Path from '#src/classes/path';
import {useRoute} from 'vue-router';
import {LessonFile} from '#src/models';

import {
    ref,
    Ref
} from 'vue';

import ToastMessage from '#elements/ToastMessage';
import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';


const route = useRoute();

const user = useUserStore();

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const name: Ref<string> = ref('{lesson_name}');
const description: Ref<string> = ref('{lesson_description}');
const video: Ref<string | null> = ref('{video_path}');
const files: Ref<LessonFile[]> = ref([]);

const toast = ref(ToastMessage);


async function loadLesson() {
    try {
        const lesson = await API.lesson(id.value);

        name.value = lesson.lesson_name;
        description.value = lesson.description ?? 'Пока нет информации...';
        video.value = lesson.video;console.log(lesson.video);

        files.value = await API.getLessonFiles(id.value);
        for (const file of files.value) {
            file.name = Path.getLastElement(file.other_file);
        }
    } catch (error) {
        toast.value.showError(`Не удалось загрузить урок:\n${error}`);
    }
}


loadLesson();
</script>

<template>
    <Fieldset :legend="name">
        <div>{{ description }}</div>
        <Divider v-if="video !== null"/>
        <video v-if="video !== null" controls width="320" height="240" class="alignSelfCenter" :src="video"/>
        <Divider v-if="files.length > 0"/>
        <div v-if="files.length > 0" class="flexColumn">
            <div>Дополнительно</div>
            <div class="flexColumn sub">
                <a v-for="file in files" :href="file.other_file">{{ file.name }}</a>
            </div>
        </div>
    </Fieldset>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
@import './../../style';


.p-fieldset {
    width: 60vw;
}

:deep(.p-fieldset-content) {
    @extend .flexColumn;
}
</style>