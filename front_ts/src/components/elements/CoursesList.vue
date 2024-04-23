<script setup lang="ts">
import {
    ref,
    Ref
} from 'vue';

import {
    coursePath, studentPath,
    teacherPath
} from '#src/router';

import {
    Course,
    Teacher
} from '#src/models';

import API from '#src/classes/api';
import ToastMessage from '#elements/ToastMessage';
import {shortenName} from '#src/functions';

import {
    useRoute,
    useRouter
} from 'vue-router';

import {
    Role,
    useUserStore
} from '#store';

import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';


interface Props {
    legend: string;
}


const courses: Ref<Course[]> = ref([]);
const user = useUserStore();
const props = defineProps<Props>();

const router = useRouter();
const route = useRoute();
const toast = ref(ToastMessage);

const newCourse = ref({
    dialogVisible: false,
    name: '',
    description: '',
    password: ''
});


async function loadCourses() {
    try {
        const currentRoute = window.location.pathname;
        if (currentRoute.includes(studentPath)) {
            courses.value = await API.studentCourses(user.id);

            for (const course of courses.value) {
                try {
                    course.teacher = await API.teacher(course.teacher_profile);
                    course.teacherShortName = getTeacherShortName(course.teacher);
                    course.teacherLink = getTeacherLink(course.teacher_profile);
                    course.enterPasswordVisible = false;
                } catch (error) {
                    toast.value.showWarn(`Не удалось загрузить преподавателя курса ${course.course_name}.\n${error}`);
                }
            }
        } else if (currentRoute.includes(teacherPath.slice(1, teacherPath.lastIndexOf('/')))) {
            courses.value = await API.teacherCourses(route.params.id);
        }

        for (const course of courses.value) {
            course.link = getCourseLink(course.id);
        }
    } catch (error) {
        toast.value.showError(`Не удалось загрузить курсы:\n${error}`);
    }
}


function getTeacherShortName(instance: Teacher) {
    return shortenName(instance.surname, instance.name, instance.father_name);
}

function getCourseLink(id: number) {
    return coursePath.replace(':id', id + '');
}

function getTeacherLink(id: number) {
    return teacherPath.replace(':id', id + '');
}


async function addCourse() {
    if (newCourse.value.name === '' || newCourse.value.password === '') {
        toast.value.showWarn('Поля "Название" и "Пароль" обязательны', 'Не хватает информации');
        return;
    }

    try {
        await API.addCourse(newCourse.value.name, newCourse.value.description, newCourse.value.password, user.id);
        router.go();
    } catch (error) {
        toast.value.showError(`Не удалось добавить курс:\n${error}`);
    }
}


loadCourses();
</script>

<template>
    <Fieldset>
        <template #legend>
            <div class="flexRow alignCenter">
                <div>{{ legend }}</div>
                <Button v-if="user.isTeacher" icon="pi pi-plus" id="addCourseBtn" v-tooltip="'Добавить курс'"
                        @click="newCourse.dialogVisible = true"/>
            </div>
        </template>
        <div class="flexRow justifyCenter courseCards">
            <Card v-for="course in courses">
                <template #title>
                    <router-link :to="course.link">{{ course.course_name }}</router-link>
                </template>
                <template #subtitle v-if="user.role === Role.Student">
                    <router-link :to="course.teacherLink">{{ course.teacherShortName }}</router-link>
                </template>
                <template #content>{{ course.description }}</template>
            </Card>
        </div>

        <div class="alignSelfCenter" v-if="courses.length === 0">Пока нет курсов...</div>
    </Fieldset>
    <Dialog v-model:visible="newCourse.dialogVisible" :style="{ width: '20vw' }" modal header="Новый курс">
        <div class="flexColumn alignStart">
            <InputText placeholder="Название курса" v-model="newCourse.name"/>
            <Textarea placeholder="Описание курса" v-model="newCourse.description" rows="5" cols="30" autoResize/>
            <InputText placeholder="Пароль курса" v-model="newCourse.password"/>
            <div class="flexRow alignSelfEnd">
                <Button @click="newCourse.dialogVisible = false" severity="danger">Отмена</Button>
                <Button @click="addCourse">Добавить</Button>
            </div>
        </div>
    </Dialog>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
@import './../../style';


.p-fieldset {
    max-width: 60vw;
}

:deep(.p-fieldset-content) {
    @extend .flexColumn;
}


.courseCards {
    flex-wrap: wrap;
}


$cardWidth: 18vw;
$cardHeight: 45vh;

.p-card {
    width: $cardWidth;
    height: $cardHeight;
    overflow-y: auto;
}

#addCourseBtn {
    background-color: inherit;
    color: $textColor;
    padding: 0;
    border: none;
}
</style>