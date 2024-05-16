<script setup lang="ts">
import {
    Ref,
    ComputedRef,
    ref,
    computed
} from 'vue';

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

import { AxiosError } from 'axios';

// import { authApp } from '#requests';
import { handleRequestError } from '#functions';



const btnWasPressed: Ref<boolean> = ref(false);

const username: Ref<string> = ref('');
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const isTeacher: Ref<boolean> = ref(false);
const surname: Ref<string> = ref('');
const name: Ref<string> = ref('');
const fatherName: Ref<string> = ref('');
const faculty: Ref<string> = ref('');
const group: Ref<string> = ref('');

const usernameInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !username.value;
});

const emailInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !email.value;
});

const passwordInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !password.value;
});

const surnameInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !surname.value;
});

const nameInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !name.value;
});

const facultyInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !faculty.value;
});

const groupInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !isTeacher.value && !group.value;
});



async function onSignUp(): Promise<void> {
    try {
        // const data = await authApp.signUp(username.value, email.value, password.value, isTeacher.value);
        // console.log(data);
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}
</script>

<template>
    <div class="authBackground">
        <div class="absolutelyCentered authForm flexColumn">
            <div class="h1">
                Регистрация
            </div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"/>
                </InputGroupAddon>
                <InputText v-model="username" placeholder="Логин" :invalid="usernameInvalid"/>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"/>
                </InputGroupAddon>
                <InputText v-model="email" type="email" placeholder="Эл. почта" :invalid="emailInvalid"/>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"/>
                </InputGroupAddon>
                <Password v-model="password" placeholder="Пароль" toggleMask :invalid="passwordInvalid"/>
            </InputGroup>
            <div class="flexRow alignCenter">
                <InputSwitch v-model="isTeacher"/>
                <div>
                    Я преподаватель
                </div>
            </div>
            <InputText v-model="surname" placeholder="Фамилия" :invalid="surnameInvalid"/>
            <InputText v-model="name" placeholder="Имя" :invalid="nameInvalid"/>
            <InputText v-model="fatherName" placeholder="Отчество"/>
            <InputText v-model="faculty" placeholder="Факультет" :invalid="facultyInvalid"/>
            <InputText v-model="group" placeholder="Группа" :invalid="groupInvalid"/>
            <Button label="Зарегистрироваться" icon="pi pi-sign-up" iconPos="right" class="alignSelfCenter" @click="onSignUp"/>
            <Divider/>
            <div class="flexRow alignCenter">
                <div>Уже зарегистрированы?</div>
                <router-link class="signReverse" :to="{ name: 'signIn' }">
                    Войти
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>