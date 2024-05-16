<script setup lang="ts">
import Main from '#pages/Main';
import ProgressSpinner from 'primevue/progressspinner';
</script>

<template>
    <Suspense>
        <Main/>
        <template #fallback>
            <ProgressSpinner/>
        </template>
    </Suspense>
</template>

<style scoped lang="scss">
@import './style';

.p-progress-spinner {
    @extend .absolutelyCentered;
}
</style>