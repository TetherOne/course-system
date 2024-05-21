<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import { AxiosError } from 'axios';

import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';

import useUserStore from '#store';

import { Role } from '#enums';
import {
    Student,
    Teacher,
    ErrorHandler
} from '#types';

import {

    updateStudent,
    updateTeacher,
    getCurrentUser
} from '#requests';

import Header from '#elements/Header';



const user = useUserStore();

const handleRequestError = inject('handleRequestError') as ErrorHandler;

const editable: Ref<boolean> = ref(false);

const surname: Ref<string> = ref('');
const name: Ref<string> = ref('');
const fatherName: Ref<string> = ref('');
const faculty: Ref<string> = ref('');
const group: Ref<string> = ref('');

const enableEditing = () => editable.value = true;
const disableEditing = () => editable.value = false;



async function handleUpdating() {
    try {
        const updated = {
            surname: surname.value,
            name: name.value,
            father_name: fatherName.value,
            faculty: faculty.value,
            group: group.value
        };

        let new_: Student | Teacher = {} as Student;
        switch (user.role) {
            case Role.Student:
                new_ = await updateStudent(user.id, updated as Student);
                break;
            case Role.Teacher:
                new_ = await updateTeacher(user.id, updated as unknown as Teacher);
                break;
        }

        surname.value = new_.surname as string;
        name.value = new_.name as string;
        fatherName.value = new_.father_name as string;
        faculty.value = new_.faculty as string;

        if ('group' in new_)
            group.value = new_.group as string;
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}

async function start(): Promise<void> {
    try {
        const info: Student | Teacher = (await getCurrentUser()).user_profile;

        surname.value = info.surname ?? '';
        name.value = info.name ?? '';
        fatherName.value = info.father_name ?? '';
        faculty.value = info.faculty ?? '';

        if (user.isStudent && 'group' in info)
            group.value = info.group ?? '';
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}



await start();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexColumn block wide">
            <div class="alignCenter">
                Настройки
            </div>
            <Divider/>
            <InputText v-model="surname" placeholder="Фамилия" :disabled="!editable"/>
            <InputText v-model="name" placeholder="Имя" :disabled="!editable"/>
            <InputText v-model="fatherName" placeholder="Отчество" :disabled="!editable"/>
            <InputText v-model="faculty" placeholder="Факультет" :disabled="!editable"/>
            <InputText v-if="user.isStudent" v-model="group" placeholder="Группа" :disabled="!editable"/>
            <Button v-if="!editable" label="Редактировать" class="alignSelfCenter" @click="enableEditing"/>
            <div v-else class="flexRow alignCenter alignSelfCenter">
                <Button label="Сохранить" @click="handleUpdating"/>
                <Button label="Отмена" severity="danger" outlined @click="disableEditing"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">

</style>