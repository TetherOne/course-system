<script setup>
import {useRouter} from 'vue-router';
import {forbiddenPath} from '#router';

import Fieldset from 'primevue/fieldset';
import CoursesList from '#elements/CoursesList';

import {useUserStore} from '#stores/user';



const router = useRouter();

const user = useUserStore();


function handleVisit() {
    switch (user.role) {
        case user.Roles.Teacher:
            router.push(forbiddenPath);
    }
}


handleVisit();
</script>

<template>
    <Fieldset legend="Моё обучение"
    <CoursesList :courses="user.courses"/>
</template>

<style scoped lang="scss">

</style>