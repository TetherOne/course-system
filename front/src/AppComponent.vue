<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';

import Main from '#pages/Main';
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