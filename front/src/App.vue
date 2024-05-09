<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import Button from 'primevue/button';

import { Role } from '#enums';

import Student from '#classes/Student';
import Teacher from '#classes/Teacher';

import useUserStore from '#store';

import {
    getStudent,
    getTeacher
} from '#requests';

import ToastMessage from '#elements/ToastMessage';
import Header from '#elements/Header';



const toast: Ref<any> = ref(null);

const user = useUserStore();



async function start() {
    let data: Student | Teacher = <Student>{};

    try {
        switch (user.role) {
            case Role.Student:
                data = new Student(await getStudent(user.id));
                if (data instanceof Student) {
                    user.group = data.group;
                }
                break;
            case Role.Teacher:
                data = new Teacher(await getTeacher(user.id));
                break;
        }

        user.surname = data.surname;
        user.name = data.name;
        user.fatherName = data.fatherName;
        user.faculty = data.faculty;
        user.avatar = data.avatar;
    } catch (error) {
        toast.value.showError(`Дополнительные сведения:\n${error}`, 'Ошибка загрузки данных');
    }

    try {
        await data.loadCourses();
        user.courses = data.courses;
    } catch (error) {
        toast.value.showError(`Дополнительные сведения:\n${error}`, 'Ошибка загрузки курсов');
    }
}

function debug() {
    toast.value.showSuccess('Success');
}



start();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header />
        <router-view />
        <Button @click="debug" icon="pi pi-wrench" />
    </div>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">

</style>
