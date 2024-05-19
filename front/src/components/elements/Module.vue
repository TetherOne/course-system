<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import { AxiosError } from 'axios';

import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';


import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    Module,
    Lesson,
    Checkpoint
} from '#types';

import {
    courseApp,
    checkpointApp
} from '#requests';



interface Props {
    module: Module;
}



const user = useUserStore();

const noticeSuccess: Notice = inject('noticeSuccess') as Notice;
const noticeError: Notice = inject('noticeError') as Notice;
const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;

const props = defineProps<Props>();
const lessons: Ref<Lesson[]> = ref([]);
const checkpoints: Ref<Checkpoint[]> = ref([]);

const newLesson = ref({
    dialogVisible: false,
    btnWasPressed: false,
    name: ''
});

const newCheckpoint = ref({
    dialogVisible: false,
    btnWasPressed: false,
    name: ''
});



async function onAddLesson(): Promise<void> {
    newLesson.value.btnWasPressed = true;

    if (!newLesson.value.name) {
        noticeError('Вы должны ввести название урока, чтобы добавить его!');
        return;
    }

    try {
        lessons.value.push(await courseApp.addLesson(newLesson.value.name, props.module.id));
        newLesson.value.dialogVisible = false;
        noticeSuccess('Урок добавлен');
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}

async function onAddCheckpoint(): Promise<void> {
    newCheckpoint.value.btnWasPressed = true;

    if (!newCheckpoint.value.name) {
        noticeError('Вы должны ввести название КТ, чтобы добавить её!');
        return;
    }

    try {
        checkpoints.value.push(await checkpointApp.addCheckpoint(newCheckpoint.value.name, props.module.id));
        newCheckpoint.value.dialogVisible = false;
        noticeSuccess('КТ добавлена');
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}



try {
    lessons.value = await courseApp.moduleLessons(props.module.id);
    checkpoints.value = await courseApp.moduleCheckpoints(props.module.id);
} catch (error) {
    handleRequestError(error as AxiosError);
}
</script>

<template>
    <div class="flex-column">
        <div class="h1 flex-row alignCenter">
            <div>Уроки</div>
            <Button v-if="user.isTeacher" icon="pi pi-plus" v-tooltip="'Добавить урок'" text
                    @click="newLesson.dialogVisible=true;"/>
        </div>
        <div class="sub flex-column">
            <router-link v-for="lesson in lessons" :key="lesson.id" :to="{ name: 'lesson', params: { id: lesson.id } }">
                {{ lesson.name }}
            </router-link>
            <div v-if="!lessons.length">
                Пока нет уроков...
            </div>
        </div>
        <div class="h1 flex-row alignCenter">
            <div>Контрольные точки</div>
            <Button v-if="user.isTeacher" icon="pi pi-plus" v-tooltip="'Добавить КТ'" text
                    @click="newCheckpoint.dialogVisible=true;"/>
        </div>
        <div class="sub flex-column">
            <router-link v-for="checkpoint in checkpoints" :key="checkpoint.id"
                         :to="{ name: 'checkpoint', params: { id: checkpoint.id } }">
                {{ checkpoint.name }}
            </router-link>
            <div v-if="!checkpoints.length">
                Пока нет контрольных точек...
            </div>
        </div>
    </div>
    <Dialog v-model:visible="newLesson.dialogVisible" modal header="Новый урок">
        <div class="flex-column">
            <label for="name">Название</label>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-file"/>
                </InputGroupAddon>
                <InputText v-model="newLesson.name" id="name" aria-describedby="name-help"
                           :invalid="newLesson.btnWasPressed&&!newLesson.name"/>
            </InputGroup>
            <small id="name-help">Введите название урока</small>
        </div>
        <template #footer>
            <Button label="Отмена" severity="danger" @click="newLesson.dialogVisible=false"/>
            <Button label="Добавить" @click="onAddLesson"/>
        </template>
    </Dialog>
    <Dialog v-model:visible="newCheckpoint.dialogVisible" modal header="Новая КТ">
        <div class="flex-column">
            <label for="name">Название</label>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-file"/>
                </InputGroupAddon>
                <InputText v-model="newCheckpoint.name" id="name" aria-describedby="name-help"
                           :invalid="newCheckpoint.btnWasPressed&&!newCheckpoint.name"/>
            </InputGroup>
            <small id="name-help">Введите название КТ</small>
        </div>
        <template #footer>
            <Button label="Отмена" severity="danger" @click="newCheckpoint.dialogVisible=false"/>
            <Button label="Добавить" @click="onAddCheckpoint"/>
        </template>
    </Dialog>
</template>