<script setup lang="ts">
import {useUserStore} from '#store';

import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';


const user = useUserStore();
</script>

<template>
    <Panel>
        <template #header>
            <div class="flexRow alignCenter">
                <Avatar :image="user.hasAvatar ? user.avatar : null" :label="user.hasAvatar ? null : user.nameFirstLetter"
                        shape="circle" size="large"/>
                <router-link :to="user.profileLink">{{ user.fullName }}</router-link>
            </div>
        </template>
        <template #icons>
            <Button icon="pi pi-cog"/>
            <Button icon="pi pi-sign-out"/>
        </template>
    </Panel>
</template>

<style scoped lang="scss">
@import './../../style';

$headerTextColor: var(--primary-color-text);


.p-panel {
    @extend .alignSelfStretch;
    background-color: $mainColor;

    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    & * {
        color: $headerTextColor;
    }
}
</style>