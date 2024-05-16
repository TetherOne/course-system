<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div class="flexColumn alignCenter">
        <Skeleton height="4rem" class="alignSelfStretch"/>
        <div class="flexRow alignCenter wide alignSelfCenter">
            <Skeleton width="19vw" height="50vh"/>
            <div class="flexColumn alignStretch">
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

<style scoped>

</style>