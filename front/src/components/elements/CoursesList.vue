<script setup lang="ts">
import {
    ref,
    computed,
    ComputedRef,
    inject
} from 'vue';

import { AxiosError } from 'axios';

import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';

import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    Course
} from '#types';

import { courseApp } from '#requests';

import CourseCard from '#elements/CourseCard';



interface Props {
    title: string;
    courses: Course[];
}



const user = useUserStore();
const props = defineProps<Props>();

const noticeError: Notice = inject('noticeError') as Notice;
const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;

const newCourse = ref({
    dialogVisible: false,
    btnWasPressed: false,
    name: '',
    description: '',
    password: ''
});

const newCourseNameInvalid: ComputedRef<boolean> = computed((): boolean => newCourse.value.btnWasPressed && !newCourse.value.name);
const newCoursePasswordInvalid: ComputedRef<boolean> = computed((): boolean => newCourse.value.btnWasPressed && !newCourse.value.password);



async function onAddCourse(): Promise<void> {
    newCourse.value.btnWasPressed = true;

    if (newCourseNameInvalid.value || newCoursePasswordInvalid.value) {
        noticeError('Поля "Название" и "Пароль" обязательны для заполнения');
        return;
    }

    try {
        props.courses.push(await courseApp.addCourse(newCourse.value.name, newCourse.value.description, user.id, newCourse.value.password));
        newCourse.value.dialogVisible = false;
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}
</script>

<template>
    <div class="flexColumn block wide">
        <div class="alignSelfCenter h1 flexRow alignCenter">
            <div>
                {{ title }}
            </div>
            <Button v-if="user.isTeacher" icon="pi pi-plus" v-tooltip="'Добавить курс'" text @click="newCourse.dialogVisible=true"/>
        </div>
        <Divider/>
        <div id="cards" class="flexRow">
            <CourseCard v-for="course in props.courses" :course="course"/>
        </div>
        <div v-if="!courses.length">
            Пока нет курсов...
        </div>
    </div>
    <Dialog v-model:visible="newCourse.dialogVisible" modal header="Новый курс">
        <div class="flexColumn">
            <InputText v-model="newCourse.name" placeholder="Название курса" :invalid="newCourseNameInvalid"/>
            <Textarea v-model="newCourse.description" placeholder="Краткое описание курса" autoResize/>
            <InputText v-model="newCourse.password" placeholder="Пароль курса" :invalid="newCoursePasswordInvalid"/>
        </div>
        <template #footer>
            <Button label="Отмена" severity="danger" @click="newCourse.dialogVisible=false"/>
            <Button label="Добавить" @click="onAddCourse"/>
        </template>
    </Dialog>
</template>

<style scoped lang="scss">
#cards {
    flex-wrap: wrap;
}
</style>