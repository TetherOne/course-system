<script>
export const studentBySelf = 1;
export const teacherBySelf = 2;
export const teacherByStudent = 3;

export default {
    setup() {
        return {
            studentBySelf,
            teacherBySelf,
            teacherByStudent
        }
    },

    props: {
        courses: {
            type: Array
        },

        view: {
            type: Number
        }
    }
}
</script>

<template>
    <div class="flex-column">
        <div class="flex-column course-card" v-for="course in courses">
            <a :href="`/course/${course.id}`">{{ course.name }}</a>
            <a :href="`/teacher/${course.teacherId}`" v-if="view === studentBySelf">{{ course.teacherShortName }}</a>
        </div>
    </div>
</template>

<style scoped>
.course-card {
    background-color: var(--course-card-background-color);
    border-radius: var(--std-corner-radius);
    padding: var(--std-padding);
    transition: 100ms;
    font-size: 1.5rem
}

.course-card:hover {
    transform: translateX(10px);
    box-shadow: 0 0 7px gray;
}

.course-card a {
    color: black;
    text-decoration: none;
}

.course-card a:hover {
    text-decoration: underline;
}
</style>