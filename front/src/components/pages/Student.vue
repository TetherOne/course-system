<script setup>
import {useUserStore} from '../../stores/user.js';


const user = useUserStore();
</script>

<script>
import {mapStores} from 'pinia';

import {useUserStore} from '../../stores/user.js';


export default {
    data() {
        return {}
    },
    computed: {
        ...mapStores(useUserStore)
    }
}
</script>

<template>
    <div>Моё обучение</div>
    <div id="courses" class="area flex-column">
        <div class="flex-row course-info" v-for="course in user.courses">
            <a :href="`/course/${course.id}`">{{ course.course_name }}</a>
            <a :href="`/teacher/${course.teacher_profile}`">{{ course.teacherNameWithInitials }}</a>
        </div>
    </div>
    <div v-if="!user.courses.length">У вас пока нет курсов...</div>
</template>

<style scoped>
header {
    align-self: stretch;
}

#courses {
    gap: var(--gap);
}

.course-info {
    gap: var(--gap);
}
</style>