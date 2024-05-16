<script setup lang="ts">
import Divider from 'primevue/divider';
import CourseCard from '#elements/CourseCard';

import { Course } from '#types';



interface Props {
    title: string;
    courses: Course[];
}



const props = defineProps<Props>();
</script>

<template>
    <div class="flexColumn block wide">
        <div class="alignSelfCenter h1">
            {{ title }}
        </div>
        <Divider/>
        <div id="cards" class="flexRow">
            <CourseCard v-for="course in props.courses" :course="course"/>
        </div>
        <div v-if="!courses.length">
            Пока нет курсов...
        </div>
    </div>
</template>

<style scoped>
#cards {
    flex-wrap: wrap;
}
</style>