<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div class="flexColumn alignStretch">
        <Skeleton height="4rem"/>
        <div class="flexRow alignCenter wide alignSelfCenter">
            <Skeleton shape="circle" size="5rem"/>
            <div class="flexColumn">
                <Skeleton width="10rem" height="2rem"/>
                <Skeleton width="10rem" height="2rem"/>
                <Skeleton width="10rem" height="2rem"/>
            </div>
        </div>
        <div class="flexRow alignSelfCenter">
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
        </div>
        <div class="flexRow alignSelfCenter">
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
            <Skeleton width="19vw" height="50vh"/>
        </div>
    </div>
</template>