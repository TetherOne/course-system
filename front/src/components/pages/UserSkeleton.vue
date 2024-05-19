<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div class="flex-column alignStretch">
        <Skeleton height="4rem"/>
        <div class="flex-row alignCenter wide alignSelfCenter">
            <Skeleton shape="circle" size="5rem"/>
            <div class="flex-column">
                <Skeleton width="10rem" height="2rem"/>
                <Skeleton width="10rem" height="2rem"/>
                <Skeleton width="10rem" height="2rem"/>
            </div>
        </div>
        <div class="flex-row alignSelfCenter">
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
        </div>
        <div class="flex-row alignSelfCenter">
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
        </div>
    </div>
</template>