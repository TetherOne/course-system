<script setup lang="ts">
import UserSkeleton from '#pages/UserSkeleton';
import CourseSkeleton from '#pages/CourseSkeleton';

import useUserStore from '#store';

import {
    useRoute,
    RouteLocationNormalizedLoaded
} from 'vue-router';

import { authApp } from '#requests';

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { ToastServiceMethods } from 'primevue/toastservice';
import { PopUpType } from '#enums';

import { provide } from 'vue';



function showPopUp(type: PopUpType, message: string, title: string): void {
    toast.add({
        severity: type,
        summary: title,
        detail: message,
        life: 7_000
    });
}

function showSuccess(message: string, title: string = 'Успех'): void {
    showPopUp(PopUpType.Success, message, title);
}

function showWarn(message: string, title: string = 'Внимание'): void {
    showPopUp(PopUpType.Warn, message, title);
}

function showError(message: string, title: string = 'Ошибка'): void {
    showPopUp(PopUpType.Error, message, title);
}



const user = useUserStore();

if (await authApp.userSignedIn()) {
    await user.loadData();
}

const route: RouteLocationNormalizedLoaded = useRoute();
const toast: ToastServiceMethods = useToast();



provide('showSuccess', showSuccess);
provide('showWarn', showWarn);
provide('showError', showError);
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