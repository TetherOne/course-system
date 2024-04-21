<script setup lang="ts">
import {ref, Ref} from 'vue';

import {Role, useUserStore} from '#store';

import {useRoute} from 'vue-router';
import {teacherPath} from '#src/router';
import API from '#src/classes/api';
import {buildFullName} from '#src/functions';

import {Module} from '#src/models';

import Fieldset from 'primevue/fieldset';
import ModuleComponent from '#elements/Module.vue';
import Divider from 'primevue/divider';
import ToastMessage from '#elements/ToastMessage';


const user = useUserStore();

const route = useRoute();

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const name = ref('{course_name}');
const description = ref('{course_description}');
const modules: Ref<Module[]> = ref([]);

const teacherId = ref(0);
const teacherFullName = ref('{teacher_full_name}');
const teacherLink = ref('{link_to_teacher}');

const toast = ref(ToastMessage);


async function loadCourse() {
    try {
        const course = await API.course(id.value);

        name.value = course.course_name;
        description.value = course.description ?? 'Пока нет описания...';
        modules.value = await API.courseModules(id.value);

        if (user.role === Role.Student) {
            teacherId.value = course.teacher_profile;

            const teacher = await API.teacher(teacherId.value);
            teacherFullName.value = buildFullName(teacher.surname, teacher.name, teacher.father_name);
            teacherLink.value = teacherPath.replace(':id', teacherId.value + '');
        }
    } catch (error) {
        toast.value.showError(`Не удалось загрузить курс:\n${error}`);
    }
}


loadCourse();
</script>

<template>
    <Fieldset :legend="name">
        <div class="flexRow justifyCenter" v-if="user.isStudent">
            Курс ведёт:
            <router-link :to="teacherLink">{{ teacherFullName }}</router-link>
        </div>
        <Divider/>
        <div>{{ description }}</div>
        <Divider/>
        <div class="flexColumn" v-for="(module, moduleIndex) in modules">
            <ModuleComponent :index="moduleIndex + 1" :id="module.id"/>
            <Divider v-if="moduleIndex < modules.length - 1"/>
        </div>
        <div class="alignSelfCenter" v-if="modules.length === 0">Пока нет модулей...</div>
    </Fieldset>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
@import './../../style';


.p-fieldset {
    width: 60vw;
}
</style>