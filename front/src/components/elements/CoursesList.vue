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
import InlineMessage from 'primevue/inlinemessage';

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



async function onAddCourse(): Promise<void> {
    newCourse.value.btnWasPressed = true;

    if (newCourseNameInvalid.value) {
        noticeError('Поле "Название" обязательно для заполнения');
        return;
    }

    try {
        props.courses.push(await courseApp.addCourse(newCourse.value.name, newCourse.value.description, user.id));
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
        <div id="cards" class="flexRow alignSelfCenter">
            <CourseCard v-for="course in props.courses" :course="course"/>
        </div>
        <div v-if="!courses.length">
            Пока нет курсов...
        </div>
    </div>
    <Dialog v-model:visible="newCourse.dialogVisible" modal header="Новый курс">
        <div class="flexColumn q">
            <div class="flexColumn alignCenter">
                <InputText v-model="newCourse.name" placeholder="Название курса" :invalid="newCourseNameInvalid"/>
                <InlineMessage v-if="newCourseNameInvalid">Обязательное поле</InlineMessage>
            </div>
            <Textarea v-model="newCourse.description" placeholder="Краткое описание курса" autoResize/>
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

.p-inline-message {
    position: relative;
}

.p-inline-message::after {
    content: '';
    position: absolute; /* Абсолютное позиционирование */
    width: 10px;
    height: 10px;
    left: 5%; top: -6px; /* Положение треугольника */
    transform: rotate(45deg);
    background-color: #3a1f22;
    border: 1px solid #681e20;
    border-right: none;
    border-bottom: none;
}
</style>