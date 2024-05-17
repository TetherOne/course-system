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
                Доступ запрещён
            </div>
            <div>
                У Вас нет разрешения на данный ресурс
            </div>
            <Button label="Назад" icon="pi pi-arrow-left" @click="router.go(-1)"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.specialPage {
    background-image: url('./../../assets/forbiddenBackground.png');
}

.veryLargeText {
    text-align: center;
    font-size: 6rem;
}

.p-button {
    background-color: #c084fc;
    border: none;
    color: #3b0764;
    transition: background-color 300ms;
    &:hover {
        background-color: #d8b4fe;
    }
}
</style>