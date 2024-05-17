<script setup lang="ts">
import { inject } from 'vue';

import {
    Router,
    useRouter
} from 'vue-router';

import { AxiosError } from 'axios';

import { useConfirm } from 'primevue/useconfirm';

import Button from 'primevue/button';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import ConfirmDialog from 'primevue/confirmdialog';

import useUserStore from '#store';

import {
    ErrorHandler,
    Course
} from '#types';

import { courseApp } from '#requests';



interface Props {
    course: Course;
}



const user = useUserStore();

const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;
const router: Router = useRouter();

const props = defineProps<Props>();

const confirm = useConfirm();



function confirmCourseDeletion(): void {
    confirm.require({
        header: 'Удаление курса',
        icon: 'pi pi-trash',
        message: `Вы уверены, что хотите удалить курс "${props.course.course_name}"?`,
        rejectClass: 'p-button-success p-button-outlined',
        rejectLabel: 'Оставить',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Удалить',
        async accept() {
            await handleCourseDeletion();
        }
    });
}

async function handleCourseDeletion(): Promise<void> {
    try {
        await courseApp.deleteCourse(props.course.id);
        router.go(0);
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}
</script>

<template>
    <Card>
        <template #header>
            <img v-if="course.image" :src="course.image" alt="Ава курса">
            <img v-else src="./../../assets/courseDefaultImage.png" alt="Ава курса">
        </template>
        <template #title>
            <router-link :to="{ name: 'course', params: { id: course.id } }">
                {{ props.course.course_name }}
            </router-link>
            <Button v-if="user.isTeacher" icon="pi pi-trash" text v-tooltip="'Удалить курс'" @click="confirmCourseDeletion"/>
        </template>
        <template v-if="course.teacherShortName" #subtitle>
            <router-link :to="{ name: 'teacher', params: { id: course.teacher_profile } }">
                {{ course.teacherShortName }}
            </router-link>
        </template>
        <template #content>
            <ScrollPanel v-if="course.description" style="width: 100%; height: 15vh;">
                {{ course.description }}
            </ScrollPanel>
            <div v-else>
                Пока нет описания...
            </div>
        </template>
        <template v-if="course.studentHasIt !== undefined" #footer>
            <Button v-if="course.studentHasIt" icon="pi pi-check" v-tooltip="'Вы зачислены на этот курс'" text/>
            <Button v-else icon="pi pi-user-plus" text v-tooltip="'Ввести пароль для зачисления'"/>
        </template>
    </Card>
    <ConfirmDialog/>
</template>

<style scoped lang="scss">
@import './../../style';

.p-card {
    width: 19vw;
    height: 52vh;
    overflow: hidden;
}

:deep(.p-card-title) {
    @extend .flexRow;
    @extend .justifyBetween;
    @extend .alignCenter;
}

:deep(.p-card-content) {
    height: 15vh;
}

img {
    width: 100%;
    height: auto;
}
</style>