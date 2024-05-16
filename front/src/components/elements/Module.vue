<script setup lang="ts">
import {
    inject
} from 'vue';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';

import { PopUp } from '#types';

import useUserStore from '#store';

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



const user = useUserStore();

const showSuccess: PopUp = inject('showSuccess') as PopUp;
const showError: PopUp = inject('showError') as PopUp;

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



try {
    lessons.value = await courseApp.moduleLessons(props.module.id);
    checkpoints.value = await courseApp.moduleCheckpoints(props.module.id);
} catch (error) {
    handleRequestError(error as AxiosError);
}



async function onAddLesson(): Promise<void> {
    newLesson.value.btnWasPressed = true;

    if (!newLesson.value.name) {
        showError('Вы должны ввести название урока, чтобы добавить его!');
        return;
    }

    try {
        lessons.value.push(await courseApp.addLesson(newLesson.value.name, props.module.id));
        newLesson.value.dialogVisible = false;
        showSuccess('Урок добавлен');
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
</script>

<template>
    <div class="flexColumn">
        <div class="h1 flexRow alignCenter">
            <div>Уроки</div>
            <Button v-if="user.isTeacher" icon="pi pi-plus" v-tooltip="'Добавить урок'" text
                    @click="newLesson.dialogVisible=true;"/>
        </div>
        <div class="sub flexColumn">
            <router-link v-for="lesson in lessons" :key="lesson.id" :to="{ name: 'lesson', params: { id: lesson.id } }">
                {{ lesson.name }}
            </router-link>
            <div v-if="!lessons.length">
                Пока нет уроков...
            </div>
        </div>
        <div class="h1 flexRow alignCenter">
            <div>Контрольные точки</div>
            <Button v-if="user.isTeacher" icon="pi pi-plus" v-tooltip="'Добавить КТ'" text
                    @click="newCheckpoint.dialogVisible=true;"/>
        </div>
        <div class="sub flexColumn">
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
        <div class="flexColumn">
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
</template>

<style scoped>

</style>