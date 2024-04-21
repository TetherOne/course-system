<script setup lang="ts">
import {
    useUserStore,
    Role
} from '#store';

import {forbiddenPath} from '#src/router';
import {useRouter} from 'vue-router';

import CoursesList from '#elements/CoursesList';


const user = useUserStore();

const router = useRouter();


function handleVisit() {
    switch (user.role) {
        case Role.Teacher:
            router.push(forbiddenPath);
            break;
    }
}


handleVisit();
</script>

<template>
    <CoursesList legend="Моё обучение" :courses="user.courses"/>
</template>

<style scoped lang="scss">

</style>