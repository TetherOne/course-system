<script setup>

</script>

<script>
export default {
    props: [
        'courses'
    ],
    methods: {
        shortenNameElem(elem) {
            return elem.slice(0, 1) + '.';
        }
    }
}
</script>

<template>
    <div id="wrapper" class="flex-column">
        <div id="course-info" class="flex-row" v-for="course in courses">
            <a :href="`/courses/${course.id}`" class="label">
                {{course.course_name}}
            </a>
            <div class="spacer"></div>
            <a :href="`/teacher/${course.teacher_profile}`" class="label">
                {{shortenNameElem(course.teacher_name.name)}}
                <span v-if="course.teacher_name.father_name">{{shortenNameElem(course.teacher_name.father_name)}}</span>
                {{course.teacher_name.surname}}
            </a>
        </div>
    </div>
</template>

<style scoped>
    #wrapper {
        align-self: center;
        background-color: #e4e4e4;
        padding: 10px;
        border-radius: 5px;
    }

    #course-info {
        background-color: #b9b8b8;
        padding: 10px;
        border-radius: 10px;
    }
</style>