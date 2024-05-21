<script setup lang="ts">
import {
    Ref,
    ComputedRef,
    ref,
    computed,
    inject
} from 'vue';

import { AxiosError } from 'axios';

import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';

import useUserStore from '#store';

import { Role } from '#enums';
import {
    Notice,
    Student,
    Teacher,
    ErrorHandler
} from '#types';

import {
    authApp,
    updateStudent,
    updateTeacher
} from '#requests';

import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';



const user = useUserStore();

const noticeSuccess: Notice = inject('noticeSuccess') as Notice;
const handleRequestError = inject('handleRequestError') as ErrorHandler;

const surname: Ref<string> = ref('');
const name: Ref<string> = ref('');
const fatherName: Ref<string> = ref('');
const faculty: Ref<string> = ref('');
const group: Ref<string> = ref('');



const surnameChanged: ComputedRef<boolean> = computed((): boolean => surname.value !== user.surname);
const nameChanged: ComputedRef<boolean> = computed((): boolean => name.value !== user.name);
const fatherNameChanged: ComputedRef<boolean> = computed((): boolean => fatherName.value !== user.fatherName);
const facultyChanged: ComputedRef<boolean> = computed((): boolean => faculty.value !== user.faculty);
const groupChanged: ComputedRef<boolean> = computed((): boolean => group.value !== user.group);

const areChangesPresent: ComputedRef<boolean> = computed((): boolean => {
    const res: boolean = surnameChanged.value || nameChanged.value || fatherNameChanged.value || facultyChanged.value;

    if (user.isStudent)
        return res || groupChanged.value;

    return res;
});



async function handleUpdating() {
    try {
        const updated: any = {
            surname: surname.value,
            name: name.value,
            father_name: fatherName.value,
            faculty: faculty.value
        };

        if (user.isStudent)
            updated.group = group.value;

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

        await user.loadData();

        noticeSuccess('Информация обновлена');
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}

async function start(): Promise<void> {
    try {
        const info: Student | Teacher = (await authApp.currentUser()).user_profile;

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
        <div class="block wide flexColumn alignCenter">
            <div>
                Настройки
            </div>
            <Divider/>
            <UserAvatar size="xlarge" :avatar-path="user.avatar" :name="user.name"/>
            <div class="flexColumn input">
                <label>Фамилия</label>
                <InputText v-model="surname" variant="filled"/>
            </div>
            <div class="flexColumn input">
                <label>Имя</label>
                <InputText v-model="name" variant="filled"/>
            </div>
            <div class="flexColumn input">
                <label>Отчество</label>
                <InputText v-model="fatherName" variant="filled"/>
            </div>
            <div class="flexColumn input">
                <label>Факультет</label>
                <InputText v-model="faculty" variant="filled"/>
            </div>
            <div v-if="user.isStudent" class="flexColumn input">
                <label>Группа</label>
                <InputText v-model="group" variant="filled"/>
            </div>
            <Transition>
                <Button v-if="areChangesPresent" icon="pi pi-check" rounded @click="handleUpdating"/>
            </Transition>
        </div>
    </div>
</template>

<style scoped lang="sass">
.input
    gap: 1px

    label
        font-size: 14px

.v-enter-active, .v-leave-active
    transition: opacity 300ms ease-in-out

.v-enter-from, .v-leave-to
    opacity: 0

.wide
    height: 70vh
</style>