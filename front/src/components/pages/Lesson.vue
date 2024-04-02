<script>
import {
    getLesson
} from '../../requests.js';


export default {
    data() {
        return {
            id: this.$route.params.id,
            name: '',
            description: '',
            video: ''
        }
    },

    created() {
        this.loadData();
    },

    methods: {
        async loadData() {
            const lesson = await getLesson(this.id);
            this.name = lesson.name;
            this.description = lesson.description;
            this.video = lesson.video;
        }
    },

    computed: {
        hasVideo() {
            return this.video !== null;
        }
    }
}
</script>


<template>
    <div id="lesson-wrapper" class="flex-column">
        <h2 id="title">{{ name }}</h2>
        <div id="description" class="label">
            {{ description}}
        </div>
        <video width="320" height="240" v-if="hasVideo">
            <source :src="video">
        </video>
    </div>
</template>


<style scoped>
#lesson-wrapper {
    background-color: #e6e6e6;
    padding: var(--std-padding);
    border-radius: var(--std-corner-radius);
    max-width: 60vw;
}

#title {
    align-self: center;
}
</style>