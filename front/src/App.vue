<script setup lang="ts">
import {
    provide
} from 'vue';

import {
    Router,
    useRouter
} from 'vue-router';

import {
    useToast
} from 'primevue/usetoast';

import {
    ToastServiceMethods
} from 'primevue/toastservice';

import Toast from 'primevue/toast';

import {
    PopUpType, Role
} from '#enums';

import useUserStore from '#store';



const router: Router = useRouter();

const toast: ToastServiceMethods = useToast();

const user = useUserStore();



function redirectToUserProfile(): void {
    switch (user.role) {
        case Role.Student:
            router.push({ name: 'student' });
            break;
        case Role.Teacher:
            router.push({ name: 'teacher', params: { id: user.id } });
            break;
    }
}

function inAuth(): boolean {
    const currentRouteName: string = <string>router.currentRoute.value.name;

    return currentRouteName === 'signIn' || currentRouteName === 'signUp';
}

function showPopUp(type: PopUpType, summary: string, detail: string): void {
    toast.add({
        severity: type,
        summary: summary,
        detail: detail,
        life: 10_000
    });
}

function showSuccess(summary: string, detail: string): void {
    showPopUp(PopUpType.Success, summary, detail);
}

function showWarn(summary: string, detail: string): void {
    showPopUp(PopUpType.Warn, summary, detail);
}

function showError(summary: string, detail: string): void {
    showPopUp(PopUpType.Error, summary, detail);
}

async function start() {
    if (!await user.signedIn()) {
        if (!inAuth()) {
            await router.push({ name: 'signIn' });
        }
    } else {
        await user.loadData();
    }
}



start();

provide('redirectToUserProfile', redirectToUserProfile);

provide('successPopUp', showSuccess);
provide('warnPopUp', showWarn);
provide('errorPopUp', showError);
</script>

<template>
    <router-view/>
    <Toast/>
</template>