<script setup lang="ts">
import { provide } from 'vue';

import {
    Router,
    RouteLocationNormalizedLoaded,
    useRouter,
    useRoute
} from 'vue-router';

import { AxiosError } from 'axios';

import { ToastServiceMethods } from 'primevue/toastservice';
import { useToast } from 'primevue/usetoast';

import Toast from 'primevue/toast';

import { PopUpType } from '#enums';
import useUserStore from '#store';

import UserSkeleton from '#pages/UserSkeleton';
import CourseSkeleton from '#pages/CourseSkeleton';

import {
    authApp
} from '#requests';



const user = useUserStore();

const toast: ToastServiceMethods = useToast();

const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();



function notice(type: PopUpType, message: string, title: string): void {
    toast.add({
        severity: type,
        summary: title,
        detail: message,
        life: 7_000
    });
}

function noticeSuccess(message: string, title: string = 'Успех'): void {
    notice(PopUpType.Success, message, title);
}

function noticeWarn(message: string, title: string = 'Внимание'): void {
    notice(PopUpType.Warn, message, title);
}

function noticeError(message: string, title: string = 'Ошибка'): void {
    notice(PopUpType.Error, message, title);
}

async function handleRequestError(error: AxiosError): Promise<void> {
    switch (error.response?.status) {
        case 403:
            await router.push({ name: 'forbidden' });
            break;
        case 404:
            await router.push({ name: 'notFound' });
            break;
        default:
            await router.push({
                name: 'error',
                query: {
                    code: error.response?.status,
                    message: error.request?.responseText
                }
            });
            break;
    }
}

function userInAuth(): boolean {
    return ['signIn', 'signUp', 'resetPassword'].includes(route.name as string);
}

async function redirectToUserProfile(): Promise<void> {
    if (user.isStudent) {
        await router.push({ name: 'student' });
    } else {
        await router.push({ name: 'teacher', params: { id: user.id } });
    }
}



await authApp.setCSRF_token();

if (await authApp.isUserSignedIn()) {
    await user.loadData();
    if (userInAuth())
        await redirectToUserProfile();
} else {
    if (!userInAuth())
        await router.push({ name: 'signIn' });
}

provide('noticeSuccess', noticeSuccess);
provide('noticeWarn', noticeWarn);
provide('noticeError', noticeError);
provide('handleRequestError', handleRequestError);
provide('redirectToUserProfile', redirectToUserProfile);
</script>

<template>
    <RouterView :key="route.fullPath" v-slot="{ Component }">
        <template v-if="Component">
            <Suspense>
                <component :is="Component"/>
                <template #fallback>
                    <UserSkeleton v-if="['student', 'teacher'].includes(route.name as string)"/>
                    <CourseSkeleton v-else-if="route.name === 'course'"/>
                </template>
            </Suspense>
        </template>
    </RouterView>
    <Toast/>
</template>