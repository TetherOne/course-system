<script setup lang="ts">
import { authApp } from '#requests';

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

import {
    ref,
    Ref,
    computed,
    ComputedRef,
    inject
} from 'vue';

import { PopUp } from '#types';

import { handleRequestError } from '#functions';

import { AxiosError } from 'axios';
import useUserStore from '#store';

import {
    Router,
    useRouter
} from 'vue-router';



async function onSignIn(): Promise<void> {
    btnWasPressed.value = true;

    if (emailInvalid.value || passwordInvalid.value) {
        showWarn('Заполните оба поля для входа');
        return;
    }

    try {
        await authApp.signIn(email.value, password.value);

        if (await authApp.userSignedIn()) {
            await user.loadData();
            await redirectToUserProfile();
        } else {
            showError('Проверьте правильность введённых данных и повторите попытку', 'Не удалось войти');
        }
    } catch (error) {
        handleRequestError(error as AxiosError);
    }
}

async function redirectToUserProfile(): Promise<void> {
    if (user.isStudent) {
        await router.push({ name: 'student' });
    } else {
        await router.push({ name: 'teacher', params: { id: user.id } });
    }
}



const user = useUserStore();
const router: Router = useRouter();

if (await authApp.userSignedIn()) {
    await redirectToUserProfile();
}

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const keepSigned: Ref<boolean> = ref(false);

const btnWasPressed: Ref<boolean> = ref(false);

const emailInvalid: ComputedRef<boolean> = computed((): boolean => btnWasPressed.value && !email.value);
const passwordInvalid: ComputedRef<boolean> = computed((): boolean => btnWasPressed.value && !password.value);

const showWarn: PopUp = inject('showWarn') as PopUp;
const showError: PopUp = inject('showError') as PopUp;
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