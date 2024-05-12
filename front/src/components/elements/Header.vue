<script setup lang="ts">
import {
    AxiosError
} from 'axios';

import {
    Ref,
    ref,
    inject
} from 'vue';

import {
    Router,
    useRouter
} from 'vue-router';

import {
    MenuItem
} from 'primevue/menuitem';

import Button from 'primevue/button';
import Menu from 'primevue/menu';

import {
    PopUp
} from '#types';

import useUserStore from '#store';

import UserAvatar from '#elements/UserAvatar';

import {
    signOut
} from '#requests';



const showError: PopUp = <PopUp>inject('errorPopUp');

const user = useUserStore();

const router: Router = useRouter();

const menuItems: Ref<MenuItem[]> = ref([{
    label: 'Настройки',
    icon: 'pi pi-cog',
    command: (): void => {
        router.push({ name: 'settings' });
    }
}, {
    label: 'Выйти',
    icon: 'pi pi-sign-out',
    command: async (): Promise<void> => {
        try {
            await signOut();
            window.location.pathname = '/sign-in';
        } catch (error) {
            const err: AxiosError = <AxiosError>error;
            showError('Не удалось выйти', `Код ошибки: ${err.response?.status}`);
        }
    }
}]);

const menu: Ref<any> = ref(null);



function toggleMenu(event: Event): void {
    menu.value.toggle(event);
}
</script>

<template>
    <div id="header" class="block flexRow alignCenter alignSelfStretch">
        <router-link :to="user.profileLink">
            Scart
        </router-link>
        <div class="spacer"/>
        <Button @click="toggleMenu" outlined>
            <UserAvatar size="normal"/>
            <i class="pi pi-angle-down"/>
        </Button>
        <Menu :model="menuItems" ref="menu" popup/>
    </div>
</template>

<style scoped lang="scss">
@import './../../style';

#header {
    padding: 7px;
    border: none;
    border-bottom: 1px solid $borderColor;
    border-radius: 0;
}

Button {
    padding: 1px;
}
</style>