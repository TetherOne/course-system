<script>
import CoursesList from '../elements/CoursesList.vue';
import {useUserStore} from '../../stores/user.js';
import {studentBySelf} from '../elements/CoursesList.vue';
import Button from 'primevue/button';


export default {
    components: {
        CoursesList,
        Button
    },

    setup() {
        const user = useUserStore();

        return {
            user,
            studentBySelf
        }
    },

    data() {
        return {
            noCoursesWarn: 'У вас пока нет курсов...'
        }
    },

    created() {

    },

    computed: {
        noCourses() {
            return !this.user.courses.length;
        }
    }
}
</script>


<template>
    <CoursesList :courses="user.courses" :view="studentBySelf"></CoursesList>
    <div v-if="noCourses">{{ noCoursesWarn }}</div>
    <Button label="Some text"/>
</template>


<style scoped>

</style>