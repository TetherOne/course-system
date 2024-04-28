<script setup lang="ts">
import {
    ref,
    Ref
} from 'vue';

import {
    Role,
    useUserStore
} from '#store';

import {
    useRoute,
    useRouter
} from 'vue-router';

import { teacherPath } from '#src/router';
import API from '#src/classes/api';
import { buildFullName } from '#src/functions';

import { Module } from '#src/models';

import Fieldset from 'primevue/fieldset';
import ModuleComponent from '#elements/Module';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ToastMessage from '#elements/ToastMessage';



const user = useUserStore();

const route = useRoute();
const router = useRouter();

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const name = ref('{course_name}');
const description = ref('{course_description}');
const modules: Ref<Module[]> = ref([]);

const teacherId = ref(0);
const teacherFullName = ref('{teacher_full_name}');
const teacherLink = ref('{link_to_teacher}');

const toast = ref(ToastMessage);

const newModule = ref({
    dialogVisible: false,
    name: ''
});

const scoreTable = ref({
    visible: false,
    students: []
});
const checkpoints = ref([]);


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

async function loadStudentsScores() {
    scoreTable.value.students = await API.courseStudents(id.value);

    for (const module of modules.value) {
        const moduleCheckpoints = await API.moduleCheckpoints(module.id);
        for (const checkpoint of moduleCheckpoints) {
            checkpoints.value.push(checkpoint.id);
        }
    }

    for (const student of scoreTable.value.students) {
        student.grades = [];
        for (const checkpointId of checkpoints.value) {
            student.grades.push(await API.studentScore(student.id, checkpointId));
        }
    }
}

async function addModule() {
    if (newModule.name === '') {
        toast.value.showWarn('Поле "Название" обязательно', 'Пропущено поле');
        return;
    }

    try {
        await API.addModule(newModule.value.name, id.value);
        router.go();
    } catch (error) {
        toast.value.showError(`Не удалось добавить модуль:\n${error}`);
    }
}


async function loadAllData() {
    await loadCourse();

    if (user.isTeacher) {
        await loadStudentsScores();
    }
}

loadAllData();
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
        <div class="flexRow alignCenter">
            <Button v-if="user.isTeacher" @click="scoreTable.visible = true" icon="pi pi-table"
                    v-tooltip="'Зачётная таблица'"/>
            <Button v-if="user.isTeacher" @click="newModule.dialogVisible = true" icon="pi pi-plus"
                    v-tooltip="'Добавить модуль'"/>
        </div>
        <Divider/>
        <div class="flexColumn" v-for="(module, moduleIndex) in modules">
            <ModuleComponent :index="moduleIndex + 1" :id="module.id"/>
            <Divider v-if="moduleIndex < modules.length - 1"/>
        </div>
        <div class="alignSelfCenter" v-if="modules.length === 0">Пока нет модулей...</div>
    </Fieldset>
    <Dialog v-model:visible="newModule.dialogVisible" modal header="Новый модуль" :style="{ width: '20vw' }">
        <div class="flexColumn">
            <InputText placeholder="Название модуля" v-model="newModule.name"/>
            <div class="flexRow justifyEnd">
                <Button @click="newModule.dialogVisible = false" severity="danger">Отмена</Button>
                <Button @click="addModule">Добавить</Button>
            </div>
        </div>
    </Dialog>
    <ToastMessage ref="toast"/>
    <Dialog v-model:visible="scoreTable.visible">
        <table>
            <tr>
                <th>Студент</th>
                <th v-for="(checkpointId, i) in checkpoints">КТ {{ i + 1 }}</th>
            </tr>
            <tr v-for="student in scoreTable.students">
                <td>{{ student.surname }} {{ student.name }} {{ student.father_name }}</td>
                <td v-for="grade in student.grades">{{ grade }}</td>
            </tr>
        </table>
    </Dialog>
</template>

<style scoped lang="scss">
@import './../../style';


.p-fieldset {
    width: 60vw;
}

table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}

th, td {
    padding: 5px;
}
</style>