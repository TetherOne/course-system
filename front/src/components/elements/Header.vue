<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import { MenuItem } from 'primevue/menuitem';

import Panel from 'primevue/panel';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';

import { Role } from '#enums';

import useUserStore from '#store';



const user = useUserStore();

const menu: Ref<any> = ref(null);

const items: Ref<MenuItem[]> = ref([{
    icon: 'pi pi-cog',
    label: 'Настройки'
}, {
    icon: 'pi pi-sign-out',
    label: 'Выйти'
}]);



function toggleMenu(event: Event) {
    menu.value.toggle(event);
}
</script>

<template>
    <div id="wrapper" class="flexRow justifyBetween alignCenter alignSelfStretch">
        <router-link
            :to="user.role === Role.Student ? { name: 'student' } : { name: 'teacher', params: { id: user.id } }"
        >
            Scart
        </router-link>
        <Button @click="toggleMenu" outlined>
            <Avatar
                :image="user.avatar ? user.avatar : null"
                :label="!user.avatar ? user.name[0] : null"
                size="normal" shape="circle"
            />
            <i class="pi pi-angle-down"/>
        </Button>
        <Menu ref="menu" :model="items" popup>
            <template #start>
                <div class="flexColumn alignCenter">
                    <Avatar
                        :image="user.avatar ? user.avatar : null"
                        :label="!user.avatar ? user.name[0] : null"
                        size="large" shape="circle"
                    />
                    <div>{{ user.name }} {{ user.surname }}</div>
                </div>
            </template>
        </Menu>
    </div>
</template>

<style scoped lang="scss">
@import './../../style';

#wrapper {
    background-color: $secondColor;
    padding: .5em;
    border-bottom: 1px solid var(--surface-200);
}

Button {
    padding: 2px;
}
</style>