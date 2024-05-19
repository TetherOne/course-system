<script setup lang="ts">
import {
    Ref,
    ComputedRef,
    ref,
    computed,
    inject
} from 'vue';

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

import { AxiosError } from 'axios';

import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    PromiseNoParamsNoReturn
} from '#types';

import { authApp } from '#requests';



const user = useUserStore();

const noticeError = inject('noticeError') as Notice;
const handleRequestError = inject('handleRequestError') as ErrorHandler;
const redirectToUserProfile = inject('redirectToUserProfile') as PromiseNoParamsNoReturn;

const btnWasPressed: Ref<boolean> = ref(false);

const username: Ref<string> = ref('');
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const isTeacher: Ref<boolean> = ref(false);

const usernameInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !username.value;
});

const emailInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !email.value;
});

const passwordInvalid: ComputedRef<boolean> = computed((): boolean => {
    return btnWasPressed.value && !password.value;
});



async function handleRegistration(): Promise<void> {
    try {
        btnWasPressed.value = true;

        if (!areFieldsValid()) {
            noticeError('Заполните все поля');
            return;
        }

        await authApp.signUp(username.value, email.value, password.value, isTeacher.value);

        if (await authApp.userSignedIn()) {
            await user.loadData();
            await redirectToUserProfile();
        } else {
            noticeError('Попробуйте повторить регистрацию позже', 'Не удалось зарегистрироваться');
        }
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}

function areFieldsValid(): boolean {
    return !!username.value && !!email.value && !!password.value;
}
</script>

<template>
    <div class="authBackground">
        <div class="absolutelyCentered authForm flex-column">
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
            <div class="flex-row alignCenter">
                <InputSwitch v-model="isTeacher"/>
                <div>
                    Я преподаватель
                </div>
            </div>
            <Button label="Зарегистрироваться" icon="pi pi-sign-up" iconPos="right" class="alignSelfCenter"
                    @click="handleRegistration"/>
            <Divider/>
            <div class="flex-row alignCenter alignSelfCenter">
                <div>Уже зарегистрированы?</div>
                <router-link class="signReverse" :to="{ name: 'signIn' }">
                    Войти
                </router-link>
            </div>
        </div>
    </div>
</template>