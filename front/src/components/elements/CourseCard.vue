<script setup lang="ts">
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import Button from 'primevue/button';

import { Course } from '#types';



interface Props {
    course: Course;
}



const props = defineProps<Props>();
</script>

<template>
    <Card>
        <template #header>
            <img v-if="course.image" :src="course.image" alt="Ава курса">
            <img v-else src="./../../assets/courseDefaultImage.png" alt="Ава курса">
        </template>
        <template #title>
            <router-link :to="{ name: 'course', params: { id: course.id } }">
                {{ props.course.course_name }}
            </router-link>
        </template>
        <template v-if="course.teacherShortName" #subtitle>
            <router-link :to="{ name: 'teacher', params: { id: course.teacher_profile } }">
                {{ course.teacherShortName }}
            </router-link>
        </template>
        <template #content>
            <ScrollPanel v-if="course.description" style="width: 100%; height: 15vh;">
                {{ course.description }}
            </ScrollPanel>
            <div v-else>
                Пока нет описания...
            </div>
        </template>
        <template v-if="course.studentHasIt !== undefined" #footer>
            <Button v-if="course.studentHasIt" icon="pi pi-check" v-tooltip="'Вы зачислены на этот курс'" text/>
            <Button v-else icon="pi pi-user-plus" text v-tooltip="'Ввести пароль для зачисления'"/>
        </template>
    </Card>
</template>

<style scoped lang="scss">
.p-card {
    width: 19vw;
    height: 52vh;
    overflow: hidden;
}

:deep(.p-card-content) {
    height: 15vh;
}

img {
    width: 100%;
    height: auto;
}
</style>