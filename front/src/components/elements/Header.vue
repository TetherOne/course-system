<script>
import {
    useUserStore
} from '../../stores/user.js';


export default {
    setup() {
        const user = useUserStore();

        return {
            user
        }
    }
}
</script>


<template>
    <div id="header" class="flex-row">
        <a :href="user.profileLink" class="flex-row label">
            <img id="avatar" :src="user.avatar" alt="Ваш аватар">
            <div>{{ user.fullName }}</div>
        </a>
        <div class="spacer"></div>
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