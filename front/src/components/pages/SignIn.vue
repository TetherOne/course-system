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
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Divider from 'primevue/divider';

import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    PromiseNoParamsNoReturn
} from '#types';

import { authApp } from '#requests';



const user = useUserStore();

const noticeWarn: Notice = inject('noticeWarn') as Notice;
const noticeError: Notice = inject('noticeError') as Notice;

const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;
const redirectToUserProfile: PromiseNoParamsNoReturn = inject('redirectToUserProfile') as PromiseNoParamsNoReturn;

if (await authApp.userSignedIn()) {
    await redirectToUserProfile();
}

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const keepSigned: Ref<boolean> = ref(false);

const btnWasPressed: Ref<boolean> = ref(false);

const emailInvalid: ComputedRef<boolean> = computed((): boolean => btnWasPressed.value && !email.value);
const passwordInvalid: ComputedRef<boolean> = computed((): boolean => btnWasPressed.value && !password.value);



async function onSignIn(): Promise<void> {
    btnWasPressed.value = true;

    if (emailInvalid.value || passwordInvalid.value) {
        noticeWarn('Заполните оба поля для входа');
        return;
    }

    try {
        await authApp.signIn(email.value, password.value);

        if (await authApp.userSignedIn()) {
            await user.loadData();
            await redirectToUserProfile();
        } else {
            noticeError('Проверьте правильность введённых данных и повторите попытку', 'Не удалось войти');
        }
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}
</script>

<template>
    <div class="authBackground">
        <div class="absolutelyCentered authForm flexColumn">
            <div class="h1">
                Вход
            </div>
            <div>
                Пожалуйста, введите свои данные
            </div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"/>
                </InputGroupAddon>
                <InputText v-model="email" type="email" placeholder="Эл. почта" variant="filled"
                           :invalid="emailInvalid"/>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"/>
                </InputGroupAddon>
                <Password v-model="password" placeholder="Пароль" toggleMask :feedback="false" variant="filled"
                          :invalid="passwordInvalid"/>
            </InputGroup>
            <div class="flexRow justifyBetween alignCenter alignSelfStretch">
                <div class="flexRow alignCenter">
                    <InputSwitch v-model="keepSigned" inputId="keepSignedSwitch"/>
                    <label for="keepSignedSwitch">
                        Запомнить меня
                    </label>
                </div>
                <router-link class="secondary" :to="{ name: 'resetPassword' }">
                    Сброс пароля
                </router-link>
            </div>
            <Button label="Войти" icon="pi pi-sign-in" iconPos="right" class="alignSelfCenter" @click="onSignIn"/>
            <Divider/>
            <div class="flexRow alignCenter">
                <div>Ещё нет аккаунта?</div>
                <router-link class="signReverse" :to="{ name: 'signUp' }">
                    Зарегистрироваться
                </router-link>
            </div>
        </div>
    </div>
    <img class="ScartLogo" src="./../../assets/ScartLogo.png" alt="Логотип Scart">
</template>

<style scoped lang="scss">
label {
    cursor: pointer;
}
</style>