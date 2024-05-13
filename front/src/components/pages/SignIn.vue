<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import { AxiosError } from 'axios';

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

import {
    FunctionNoParamsNoReturn,
    PopUp
} from '#types';

import useUserStore from '#store';

import { signIn as signInRequest } from '#requests';



const redirectToUserProfile: FunctionNoParamsNoReturn = <FunctionNoParamsNoReturn>inject('redirectToUserProfile');

const showError: PopUp = <PopUp>inject('errorPopUp');

const user = useUserStore();

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const keepSigned: Ref<boolean> = ref(false);



async function start(): Promise<void> {
    if (await user.signedIn()) {
        if (!user.id) {
            await user.loadData();
        }
        redirectToUserProfile();
    }
}

async function signIn(): Promise<void> {
    try {
        await signInRequest(email.value, password.value);

        if (await user.signedIn()) {
            await user.loadData();
            redirectToUserProfile();
        } else {
            showError('Не удалось войти', 'Неверная почта и/или пароль');
        }
    } catch (error) {
        const err: AxiosError = <AxiosError>error;
        showError('Не удалось войти', `Код ошибки: ${err.response?.status}`);
    }
}



start();
</script>

<template>
    <div class="authWrapper flexRow justifyCenter alignCenter">
        <form method="post" action="/api/authapp/login/" class="authForm block flexColumn">
            <div class="upper">
                Вход
            </div>
            <div>
                Пожалуйста, введите свои данные
            </div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"/>
                </InputGroupAddon>
                <InputText v-model="email" name="username" required/>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"/>
                </InputGroupAddon>
                <Password v-model="password" :inputProps="{ 'name': 'password' }" :feedback="false" toggleMask
                          required/>
            </InputGroup>
            <div class="flexRow justifyBetween alignCenter">
                <div class="flexRow alignCenter">
                    <InputSwitch v-model="keepSigned"/>
                    <div>
                        Запомнить меня
                    </div>
                </div>
                <router-link class="secondary" :to="{ name: 'resetPassword' }">
                    Сбросить пароль
                </router-link>
            </div>
            <Button label="Войти" @click="signIn"/>
            <Divider/>
            <router-link class="alignSelfCenter" :to="{ name: 'signUp' }">
                <Button label="Регистрация" severity="danger"/>
            </router-link>
        </form>
    </div>
</template>