<script setup>
import { onBeforeMount } from 'vue';

import Button from 'primevue/button';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import useUserStore, { UserRoles } from '#store';
import {
    getStudent,
    getTeacher
} from '#requests';

import Header from '#elements/Header';

import { showToast } from '#functions';
import { Toasts } from '#config';


const user = useUserStore();
const toast = useToast();


async function loadUserData() {
    const userId = user.id;
    let data = {};

    try {
        switch (user.role) {
            case UserRoles.Student:
                data = await getStudent(userId);
                user.group = data.group;

                break;
            case UserRoles.Teacher:
                data = await getTeacher(userId);
                break;
        }

        user.surname = data.surname;
        user.name = data.name;
        user.father_name = data.father_name;
        user.faculty = data.faculty;
        user.avatar = data.avatar;
    } catch (error) {
        showToast(toast, Toasts.Error, `Не удалось получить информацию о вас. Описание ошибки:\n${error}`, 'Ошибка');
    }
}

function debug() {
    showToast(toast, Toasts.Info, 'Test');
}


onBeforeMount(() => {
    loadUserData();
})
</script>


<template>
    <div class="flex-column align-items-center">
        <Header/>
        <router-view/>
        <Toast/>
        <Button @click="debug">Отладка</Button>
        <ToastMessage ref="toastMessage"/>
    </div>
</template>


<style scoped>

</style>