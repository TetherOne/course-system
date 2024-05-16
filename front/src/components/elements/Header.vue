<script setup lang="ts">
import UserAvatar from '#elements/UserAvatar';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

import { MenuItem } from 'primevue/menuitem';

import {
    ref,
    Ref,
    inject
} from 'vue';

import { authApp } from '#requests';
import useUserStore from '#store';
import { PopUp } from '#types';

import {
    useRouter,
    Router
} from 'vue-router';



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
            showError(`${error}`, 'Не удалось выйти');
        }
    }
}]);

const user = useUserStore();
const showError: PopUp = inject('showError') as PopUp;
const router: Router = useRouter();



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
                    <UserAvatar size="normal" :avatarPath="user.avatar" :name="user.name"/>
                    <div>
                        {{ user.name }} {{ user.surname }}
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