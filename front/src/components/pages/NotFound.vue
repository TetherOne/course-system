<script setup lang="ts">
import {
    Router,
    useRouter
} from 'vue-router';

import Button from 'primevue/button';



const router: Router = useRouter();
</script>

<template>
    <div class="specialPage">
        <div class="absolutelyCentered flexColumn alignCenter">
            <div class="veryLargeText">
                Ого!
            </div>
            <div>
                Здесь ничего нет. Как Вы сюда попали?
            </div>
            <Button label="Назад" icon="pi pi-arrow-left" @click="router.go(-1)"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.specialPage {
    background-image: url('./../../assets/notFoundBackground.jpg');
}

.veryLargeText {
    text-align: center;
    font-size: 6rem;
}

.p-button {
    background-color: #fb923c;
    border: none;
    color: #431407;
    transition: background-color 300ms;
    &:hover {
        background-color: #fdba74;
    }
}
</style>