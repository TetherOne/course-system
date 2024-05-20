<script setup lang="ts">
import { inject } from 'vue';

import Button from 'primevue/button';

import { PromiseNoParamsNoReturn } from '#types';



const redirect: PromiseNoParamsNoReturn = inject('redirectToUserProfile') as PromiseNoParamsNoReturn;
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
            <Button label="В профиль" icon="pi pi-arrow-left" @click="redirect"/>
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