<script setup>
import {useUserStore} from '../../stores/user.js';


const user = useUserStore();
</script>


<script>
export default {
    data() {
        return {
            addCourseFormVisible: false,
            courseToBeCreatedName: ''
        }
    },
    async created() {

    },
    methods: {
        addCourse() {
            
        }
    }
}
</script>


<template>
    <div>Мои курсы</div>
    <div id="courses" class="area flex-column">
        <div class="flex-row course-info" v-for="course in user.courses">
            <a :href="`/course/${course.id}`">{{ course.course_name }}</a>
        </div>
    </div>
    <button v-if="user.role === 'teacher'" @click="addCourseFormVisible = true">Добавить курс</button>
    <div class="flex-column area" v-if="addCourseFormVisible">
        <div class="flex-row">
            <label for="">Название:</label>
            <input v-model="courseToBeCreatedName">
        </div>
        <button @click="addCourse">Добавить</button>
    </div>
    <div v-if="!user.courses.length">У вас пока нет курсов...</div>
</template>

<style scoped>

</style>