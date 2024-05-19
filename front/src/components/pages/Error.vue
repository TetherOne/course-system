<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import {
    Router,
    RouteLocationNormalizedLoaded,
    useRouter,
    useRoute
} from 'vue-router';

import Button from 'primevue/button';
import Inplace from 'primevue/inplace';



const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const code: Ref<string> = ref(route.query.code as string);
const message: Ref<string> = ref(route.query.message as string);
</script>

<template>
    <div class="specialPage">
        <div class="absolutelyCentered flex-column alignCenter">
            <div class="veryLargeText">
                ОШИБКА
            </div>
            <div>
                Что-то пошло не так!
            </div>
            <Inplace>
                <template #display>
                    Детали...
                </template>
                <template #content>
                    <div>
                        Код ошибки: {{ code }}
                    </div>
                    <div>
                        Текст ошибки:
                    </div>
                    <div class="sub">
                        {{ message }}
                    </div>
                </template>
            </Inplace>
            <Button label="Назад" icon="pi pi-arrow-left" @click="router.go(-1)"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './../../style';

.specialPage {
    background-image: url('./../../assets/errorBackground.png');
}

:deep(.p-inplace-content) {
    @extend .flex-column;
    @extend .block;
}

.p-button {
    background-color: #f87171;
    border: none;
    color: #450a0a;
    transition: background-color 300ms;
    &:hover {
        background-color: #fca5a5;
    }
}
</style>