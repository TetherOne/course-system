<script setup lang="ts">
import Button from 'primevue/button';

import useUserStore from '#store';



const user = useUserStore();
</script>

<template>
    <div class="specialPage flexRow justifyCenter alignCenter">
        <div class="flexColumn alignCenter">
            <div id="title">
                404
            </div>
            <div>
                Похоже, вы наткнулись на несуществующую страницу
            </div>
            <router-link :to="user.profileLink">
                <Button label="К профилю"/>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.specialPage {
    background-image: url('./../../assets/notFoundBackground.png');
}

Button {
    background-color: #f97316;
    border: none;
    color: white;
    box-shadow: 1px 1px 5px black;
    transition: background-color 300ms;
    &:hover {
        background-color: #ea580c;
    }
}
</style>