<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    useRoute
} from 'vue-router';

import useUserStore from '#store';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Password from 'primevue/password';

import {
    Course as CourseModel
} from '#models';

import Teacher from '#classes/Teacher';
import Course from '#classes/Course';

import {
    getTeacher,
    getTeacherCourses
} from '#requests';

import ToastMessage from '#elements/ToastMessage';



const route: RouteLocationNormalizedLoaded = useRoute();
const user = useUserStore();
const toast: Ref<any> = ref(null);

const teacher: Ref<Teacher> = ref(<Teacher>{});
const courses: Ref<Course[]> = ref([]);

const wantedCourse: Ref<Course> = ref(<Course>{});
const wantedCoursePassword: Ref<string> = ref('');
const coursePasswordDialogVisible: Ref<boolean> = ref(false);



async function setup() {
    try {
        teacher.value = new Teacher(await getTeacher(parseInt(<string>route.params.id)));
    } catch (error) {
        if (user.isStudent) {
            toast.value.showError(`${error}`, 'Ошибка загрузки данных о преподавателе');
        } else {
            toast.value.showError(`${error}`, 'Ошибка загрузки данных о Вас');
        }
    }


    try {
        const coursesModels: CourseModel[] = await getTeacherCourses(teacher.value.id);

        for (const courseModel of coursesModels) {
            courses.value.push(new Course(courseModel));
        }
    } catch (error) {
        toast.value.showError(`${error}`, 'Ошибка загрузки курсов преподавателя');
    }
}

function handlePasswordEntering(course: Course) {
    wantedCourse.value = course;
    coursePasswordDialogVisible.value = true;
}

function cancelEnteringPassword() {
    wantedCoursePassword.value = '';
    coursePasswordDialogVisible.value = false;
}

async function enroll() {
    // NOT IMPLEMENTED
}



setup();
</script>

<template>
    <div class="mainWrapper flexColumn">
        <div class="flexColumn container">
            <div class="flexRow alignCenter">
                <Avatar
                    :image="teacher.avatar ? teacher.avatar : null"
                    :label="!teacher.avatar ? teacher.name[0] : null"
                    size="xlarge" shape="circle"
                />
                <div>{{ teacher.getFullName() }}</div>
            </div>
            <div>Факультет: {{ teacher.faculty }}</div>
        </div>
        <div class="container">
            <Fieldset :legend="user.isTeacher ? 'Мои курсы' : 'Курсы'">
                <div class="flexRow justifyCenter coursesCards">
                    <Card v-for="course in courses" class="courseCard">
                        <template #title>
                            <router-link :to="{ name: 'course', params: { id: course.id } }">
                                {{ course.name }}
                            </router-link>
                        </template>
                        <template #content>
                            {{ course.description }}
                        </template>
                        <template #footer v-if="user.isStudent">
                            <Button
                                v-if="user.hasCourse(course.id)"
                                icon="pi pi-check"
                                outlined
                                v-tooltip="'Вы зачислены на этот курс'"
                            />
                            <Button
                                v-else icon="pi pi-user-plus"
                                v-tooltip="'Ввести код курса'"
                                @click="handlePasswordEntering(course)"
                            />
                        </template>
                    </Card>
                </div>
                <div v-if="!user.courses.length">Пока нет курсов...</div>
            </Fieldset>
        </div>
    </div>
    <Dialog v-model:visible="coursePasswordDialogVisible" modal :header="`${wantedCourse.name} – пароль`">
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-key"/>
            </InputGroupAddon>
            <Password inputId="password" :feedback="false" v-model="wantedCoursePassword" placeholder="Код курса"/>
        </InputGroup>
        <template #footer>
            <Button @click="cancelEnteringPassword" severity="danger" label="Отмена"/>
            <Button @click="enroll" label="Отправить"/>
        </template>
    </Dialog>
    <ToastMessage ref="toast"/>
</template>

<style scoped>
.p-fieldset {
    background-color: inherit;
}

:deep(.p-fieldset-legend) {
    background-color: inherit;
}
</style>