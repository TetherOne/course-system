<script setup>

</script>

<script>
import {getLesson} from "../../requests.js";

export default {
    data() {
        return {
            name: '__lessonName__',
            description: '__lessonDescription__',
            video: '__videoPath__'
        }
    },
    computed: {
        id() {
            return this.$route.params.lessonId;
        }
    },
    async created() {
        const lesson = await getLesson(this.id);
        this.name = lesson.lesson_name;
        this.description = lesson.description;
        this.video = lesson.video;
    }
}
</script>

<template>

</template>

<style scoped>

</style>