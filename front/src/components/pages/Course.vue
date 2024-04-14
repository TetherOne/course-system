<script setup>
import {
    onBeforeMount,
    ref,
    computed
} from 'vue';
import { useRoute } from 'vue-router';

import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';


import {
    getCourse,
    getTeacher,
    getCourseModules,
    getModuleLessons,
    getModuleCheckpoints
} from '#requests';

import { Toasts } from '#config';
import { showToast } from '#functions';

import { Views } from '#config';
import useUserStore, { UserRoles } from '#store';
import { teacherPath } from '#router';
import { fullName } from '#functions';


const name = ref('__courseName__');
const description = ref('__courseDescription__');
const teacherId = ref(0);
const teacher = ref({});
const modules = ref([]);

const route = useRoute();
const toast = useToast();

let view;

const user = useUserStore();

const userIsStudent = computed(() => {
    return view === Views.StudentSelf;
});


async function loadData() {
    try {
        const course = await getCourse(route.params.id);

        name.value = course.course_name;
        description.value = course.description;
        teacherId.value = course.teacher_profile;
    } catch (error) {
        showToast(toast, Toasts.Error, `Не удалось получить информацию о курсе. Описание ошибки:\n${error}`);
    }
}

async function loadTeacher() {
    if (view === Views.StudentSelf) {
        try {
            teacher.value = await getTeacher(teacherId.value);
            teacher.value.fullName = fullName(teacher.value.surname, teacher.value.name, teacher.value.father_name);
        } catch (error) {
            showToast(toast, Toasts.Error, `Не удалось загрузить информацию о преподаватале. Описание ошибки:\n${error}`);
        }
    }
}

async function loadModules() {
    try {
        modules.value = await getCourseModules(route.params.id);
        modules.lessons = [];
        modules.checkpoints = [];

        for (const module of modules.value) {
            try {
                module.lessons = await getModuleLessons(module.id);
            } catch (error) {
                showToast(toast, Toasts.Error, `Не удалось загрузить уроки. Описание ошибки:\n${error}`);
            }

            try {
                module.checkpoints = await getModuleCheckpoints(module.id);
            } catch (error) {
                showToast(toast, Toasts.Error, `Не удалось загрузить контрольные точки. Описание ошибки:\n${error}`);
            }
        }
    } catch (error) {
        showToast(toast, Toasts.Error, `Не удалось загрузить модули. Описание ошибки:\n${error}`);
    }
}

function setView() {
    switch (user.role) {
        case UserRoles.Student:
            view = Views.StudentSelf;
            break;
        case UserRoles.Teacher:
            view = Views.TeacherSelf;
            break;
    }
}


onBeforeMount(() => {
    setView();
    loadData().then(
        success => loadTeacher()
    )
    loadModules();
});
</script>

<template>
    <Fieldset :legend="name">
        <div class="flex-column">
            <div class="flex-column" v-if="userIsStudent">
                <div class="flex-row">
                    Преподаватель: <router-link :to="`/teacher/${teacherId}`">{{ teacher.fullName }}</router-link>
                </div>
                <Divider/>
            </div>

            <div class="flex-column" v-for="(module, moduleIndex) in modules">
                <Card>
                    <template #title>
                        Модуль {{ moduleIndex + 1 }}. {{ module.module_name }}
                    </template>
                    <template #content>
                        <Fieldset legend="Уроки">
                            <div class="flex-column">
                                <router-link v-for="(lesson, lessonIndex) in module.lessons" :to="`/lesson/${lesson.id}`">{{ lessonIndex + 1 }}. {{ lesson.lesson_name }}</router-link>

                            </div>
                        </Fieldset>
                        <Fieldset legend="Контрольные точки">
                            <div class="flex-column">
                                <router-link v-for="(checkpoint, checkpointIndex) in module.checkpoints" :to="`/checkpoint/${checkpoint.id}`">{{ checkpointIndex + 1 }}. {{ checkpoint.title }}</router-link>

                            </div>
                        </Fieldset>
                    </template>
                </Card>
                <Divider v-if="moduleIndex < modules.length - 1"/>
            </div>
        </div>
    </Fieldset>
</template>

<style scoped>

</style>