<script setup lang="ts">
import {ref} from 'vue';
import API from '#src/classes/api';
import {useUserStore} from '#store';
import {Role} from '#store';
import Header from '#elements/Header';

import {
    Student,
    Teacher
} from '#src/models';

import ToastMessage from '#elements/ToastMessage';


const toast = ref(ToastMessage);

const user = useUserStore();


async function loadUser() {
    try {
        let data: Student | Teacher;

        switch (user.role) {
            case Role.Student:
                data = await API.student(user.id);

                if ('group' in data) {
                    user.group = data.group;
                }

                break;
            case Role.Teacher:
                data = await API.teacher(user.id);
                break;
        }

        user.surname = data.surname;
        user.name = data.name;
        user.fatherName = data.father_name;
        user.avatar = data.avatar;
        user.faculty = data.faculty;
    } catch (error) {
        toast.value.showError(`Не удалось загрузить информацию о Вас:\n${error}`);
    }
}


loadUser();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <router-view/>
    </div>
    <ToastMessage ref="toast"/>
</template>

<style lang="scss">
@import './style';


body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: $textColor;
}
</style>