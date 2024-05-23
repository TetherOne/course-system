<script setup lang="ts">
import {
    Ref,
    ref,
    computed,
    inject, ComputedRef
} from 'vue';

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import {
    // Notice,
    PromiseNoParamsNoReturn
} from '#types';

import { authApp } from '#requests';
import InlineMessage from 'primevue/inlinemessage';



//
// const noticeError: Notice = inject('noticeError') as Notice;
const redirectToUserProfile: PromiseNoParamsNoReturn = inject('redirectToUserProfile') as PromiseNoParamsNoReturn;

const wasBtnPressed: Ref<boolean> = ref(false);

const email: Ref<string> = ref('');
const isEmailInvalid: ComputedRef<boolean> = computed((): boolean => !email.value && wasBtnPressed.value);



async function handleReset(): Promise<void> {
    wasBtnPressed.value = true;

    if (isEmailInvalid.value) {
        return;
    }


}



if (await authApp.isUserSignedIn()) {
    await redirectToUserProfile();
}
</script>

<template>
    <div class="authBackground">
        <div class="absolutelyCentered authForm flexColumn alignCenter">
            <div class="h1">Восстановление пароля</div>
            <div>Введите Вашу электронную почту</div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-envelope"/>
                </InputGroupAddon>
                <InputText v-model="email" type="email" :invalid="isEmailInvalid" />
            </InputGroup>
            <InlineMessage v-if="isEmailInvalid">Обязательное поле</InlineMessage>
            <Button label="Пришлите мне ссылку!" @click="handleReset" severity="success" />
        </div>
    </div>
    <img class="ScartLogo" src="./../../assets/ScartLogo.png" alt="Логотип Scart">
</template>

<style scoped lang="scss">
.p-inline-message {
    position: relative;
}

.p-inline-message::after {
    content: '';
    position: absolute; /* Абсолютное позиционирование */
    width: 10px;
    height: 10px;
    left: 5%; top: -6px; /* Положение треугольника */
    transform: rotate(45deg);
    background-color: #3a1f22;
    border: 1px solid #681e20;
    border-right: none;
    border-bottom: none;
}
</style>