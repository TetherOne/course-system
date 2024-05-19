<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div class="flex-column alignCenter">
        <Skeleton height="4rem" class="alignSelfStretch"/>
        <div class="flex-row alignCenter wide alignSelfCenter">
            <Skeleton width="19vw" height="50vh"/>
            <div class="flex-column alignStretch">
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
                <Skeleton width="50vw" height="2rem"/>
            </div>
        </div>
    </div>
</template>