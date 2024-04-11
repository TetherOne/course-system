<script lang="ts">
import {
    useUserStore
} from '../../stores/user.js';
import Avatar from 'primevue/avatar';
import 'primeicons/primeicons.css'
let a = 5;
let b: number = 5;


export default {
    setup() {
        const user = useUserStore();

        return {
            user
        }
    },
    components: {
        Avatar
    },
    computed: {
        getNameFirstLetter() {
            return this.user.name.slice(0, 1);
        }
    }
}
</script>


<template>
    <div id="header" class="flex-row">
        <router-link :to="user.profileLink" class="flex-row label">
            <Avatar v-if="user.avatar === null" :label="getNameFirstLetter" shape="circle" size="large"/>
            <Avatar v-if="user.avatar !== null" :image="user.avatar" shape="circle" size="large"/>

            <div>{{ user.fullName }}</div>
        </router-link>
        <div class="spacer"></div>
        <span class="pi pi-moon"></span>
        <a href="/settings">
            <img class="ico" src="/src/assets/settings.svg" alt="Настройки" title="Настройки">
        </a>
        <a href="/exit">
            <img src="/src/assets/logOut.svg" alt="Выход" class="ico" title="Выход">
        </a>
    </div>
</template>


<style scoped>
#header {
    background-color: var(--header-background-color);
    align-self: stretch;
    padding: var(--std-padding);
    align-items: center;
}

#avatar {
    width: var(--avatar-width);
    height: var(--avatar-width);
}

#header a {
    color: black;
    text-decoration: none;
}
</style>