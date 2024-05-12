<script setup lang="ts">
import {
    Router,
    useRouter
} from 'vue-router';

import Button from 'primevue/button';



const router: Router = useRouter();
</script>

<template>
    <div class="specialPage flexRow justifyCenter alignCenter">
        <div class="flexColumn alignCenter">
            <div id="title">
                ОШИБКА
            </div>
            <div>
                Что-то пошло не так...
            </div>
            <Button label="Назад" @click="router.go(-1)"/>
        </div>
    </div>
</template>

<style scoped>
.specialPage {
    background-image: url('./../../assets/errorBackground.png');
}

Button {
    background-color: #ff3d32;
    border: none;
    color: white;
    box-shadow: 1px 1px 5px black;
    transition: background-color 300ms;
    &:hover {
        background-color: #dc2626;
    }
}
</style>