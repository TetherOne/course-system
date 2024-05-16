<script setup lang="ts">
import axios, { AxiosError } from 'axios';

import Button from 'primevue/button';

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import {
    Bold,
    Italic
} from '@ckeditor/ckeditor5-basic-styles';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';

import hljs from 'highlight.js';

import Header from '#elements/Header';
import Divider from 'primevue/divider';

import { courseApp, lessonsURL, } from '#requests';

import { handleRequestError } from '#functions';

import Path from '#src/classes/Path';

import {
    ref,
    Ref,
    inject,
    onMounted,
    onUpdated
} from 'vue';

import {
    useRoute,
    RouteLocationNormalizedLoaded
} from 'vue-router';

import useUserStore from '#store';

import {
    PopUp,
    Lesson,
    LessonFile
} from '#types';

import { getCSRF_token } from '#functions';



const showSuccess: PopUp = inject('showSuccess') as PopUp;

const route: RouteLocationNormalizedLoaded = useRoute();

const user = useUserStore();

const editor = ref({
    editor: ClassicEditor,
    visible: false,
    data: '',
    config: {
        plugins: [
            Essentials,
            Bold,
            Italic,
            Link,
            Paragraph,
            CodeBlock
        ],
        toolbar: {
            items: [
                'bold',
                'italic',
                'link',
                'undo',
                'redo',
                'codeBlock'
            ]
        }
    }
});

const id: Ref<number> = ref(parseInt(route.params.id as string));
const name: Ref<string> = ref('');
const description: Ref<string> = ref('');
const videoPath: Ref<string> = ref('');
const files: Ref<LessonFile[]> = ref([]);
const moduleId: Ref<number> = ref(0);



try {
    const lesson: Lesson = await courseApp.lesson(id.value);

    name.value = lesson.name;
    description.value = lesson.description;
    videoPath.value = lesson.video ?? '';
    moduleId.value = lesson.module;

    files.value = await courseApp.lessonFiles(id.value);
    for (const file of files.value) {
        file.name = decodeURIComponent(Path.getLastElement(file.other_file));
    }
} catch (error) {
    handleRequestError(error as AxiosError);
}

onMounted((): void => {
    hljs.highlightAll();
});
onUpdated((): void => {
    hljs.highlightAll();
});



function openEditor(): void {
    editor.value.data = description.value;
    editor.value.visible = true;
}

async function onUpdateLesson(): Promise<void> {
    try {
        await axios.patchForm(`${lessonsURL}${id.value}/`, {
            description: editor.value.data
        }, {
            headers: {
                'X-CSRFTOKEN': getCSRF_token()
            }
        });
        showSuccess('Документ изменён');
        description.value = editor.value.data;
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexColumn block wide">
            <div class="h2 flexRow alignCenter">
                <div>{{ name }}</div>
                <Button v-if="user.isTeacher" icon="pi pi-file-edit" text @click="openEditor" :disabled="editor.visible"/>
            </div>
            <Divider/>
            <div v-if="editor.visible"  id="editorWrapper" class="flexColumn alignSelfStretch">
                <ckeditor class="alignSelfCenter" :editor="editor.editor" v-model="editor.data"
                          :config="editor.config"/>
                <div class="flexRow">
                    <Button label="Закрыть" @click="editor.visible=false"/>
                    <Button label="Сохранить" @click="onUpdateLesson"/>
                </div>
            </div>
            <div v-if="description&&!editor.visible" id="description" v-html="description"/>
            <Divider v-if="description&&!editor.visible"/>
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

#editorWrapper {
    color: black;
}

#description {
    color: initial;
}
</style>