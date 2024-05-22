<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import {
    useRouter,
    Router
} from 'vue-router';

import { MenuItem } from 'primevue/menuitem';

import Button from 'primevue/button';
import Menu from 'primevue/menu';

import useUserStore from '#store';
import { Notice } from '#types';

import { authApp } from '#requests';

import UserAvatar from '#elements/UserAvatar';



const user = useUserStore();

const noticeError: Notice = inject('noticeError') as Notice;
const router: Router = useRouter();

const menu: Ref<any> = ref(null);
const menuItems: Ref<MenuItem[]> = ref([{
    label: 'Настройки',
    icon: 'pi pi-cog',
    async command() {
        await router.push({ name: 'settings' });
    }
}, {
    label: 'Выйти',
    icon: 'pi pi-sign-out',
    async command() {
        try {
            await authApp.signOut();
            window.location.pathname = '/sign-in';
        } catch (error) {
            noticeError(`${error}`, 'Не удалось выйти');
        }
    }
}]);



function toggleMenu(event: Event): void {
    menu.value.toggle(event);
}
</script>

<template>
    <div class="block flexRow justifyBetween alignCenter alignSelfStretch">
        <router-link :to="user.isStudent ? { name: 'student' } : { name: 'teacher', params: { id: user.id } }">
            Scart
        </router-link>
        <Button class="flexRow alignCenter" text rounded @click="toggleMenu">
            <UserAvatar size="normal" :avatarPath="user.avatar" :name="user.name"/>
            <i class="pi pi-angle-down"/>
        </Button>
        <Menu :model="menuItems" popup ref="menu">
            <template #start>
                <div class="flexColumn alignCenter">
                    <UserAvatar size="xlarge" :avatarPath="user.avatar" :name="user.name"/>
                    <div>
                        {{ user.fullName }}
                    </div>
                </div>
            </template>
        </Menu>
    </div>
</template>

<style scoped lang="scss">
@import './../../style';

.block {
    border: none;
    border-bottom: 1px solid $borderColor;
    border-radius: 0;
    padding: 2px;
}
</style>