<script setup>
import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

import useUserStore from '#store';


const user = useUserStore();
</script>

<template>
    <Panel class="align-self-stretch">
        <template #header>
            <router-link :to="user.profileLink" class="flex-row align-items-center">
                <Avatar v-if="user.avatar === null" :label="user.nameFirstLetter" size="large" shape="circle"/>
                <Avatar v-if="user.avatar !== null" :image="user.avatar" size="large" shape="circle"/>
                <div id="username">{{ user.fullName }}</div>
            </router-link>
        </template>
        <template #icons>
            <div class="flex-row buttons">
                <Button icon="pi pi-cog"/>
                <Button icon="pi pi-moon"/>
                <Button icon="pi pi-sign-out"/>
            </div>
        </template>
    </Panel>
</template>

<style scoped>
.p-panel {
    background-color: var(--theme-color);
    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

#username {
    color: white;
}
</style>