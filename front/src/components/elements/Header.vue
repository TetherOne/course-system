<script setup>
import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

import {computed} from 'vue';

import {useUserStore} from '#stores/user';
import {useCommonStore} from '#stores/common';


const user = useUserStore();
const common = useCommonStore();

const themeButtonIcon = computed(() => {
    switch (common.currentTheme) {
        case common.Themes.Light:
            return 'pi pi-moon';
        case common.Themes.Dark:
            return 'pi pi-sun';
    }
});
</script>

<template>
    <Panel class="alignSelfStretch">
        <template #header>
            <router-link :to="user.profileLink" class="flexRow alignCenter">
                <Avatar :image="user.hasAvatar ? user.avatar : null"
                        :label="user.hasAvatar ? null : user.nameFirstLetter" shape="circle" size="large"/>
                <span id="userName">{{ user.fullName }}</span>
            </router-link>
        </template>
        <template #icons>
            <div class="flexRow" id="buttons">
                <Button icon="pi pi-cog"/>
                <Button :icon="themeButtonIcon"/>
                <Button icon="pi pi-sign-out"/>
            </div>
        </template>
    </Panel>
</template>

<style scoped lang="scss">
@import './../../css/variables';

$headerTextColor: white;
.p-panel {
    background-color: $mainColor;

    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    & * {
        color: $headerTextColor;
    }
}

#buttons {
    gap: 1px;
}
</style>