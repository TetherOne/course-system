<script setup lang="ts">
import axios from 'axios';

import ProgressSpinner from 'primevue/progressspinner';

import Main from '#pages/Main';

import { getCSRF_token } from '#functions';



axios.defaults.headers.common['X-CSRFTOKEN'] = getCSRF_token();
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