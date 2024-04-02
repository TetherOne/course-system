<script>
import {
    useUserStore
} from '../../stores/user.js';
import CoursesList from "../elements/CoursesList.vue";

import {
    teacherByStudent,
    teacherBySelf
} from '../elements/CoursesList.vue';


export default {
    components: {
        CoursesList
    },

    setup() {
        const user = useUserStore();

        return {
            user,
            teacherByStudent,
            teacherBySelf
        }
    },

    computed: {
        view() {
            if (this.user.id == this.$route.params.id) {
                return teacherBySelf;
            } else {
                return teacherByStudent;
            }
        }
    }
}
</script>


<template>
    <CoursesList :courses="user.courses" :view="view"></CoursesList>
</template>


<style scoped>

</style>