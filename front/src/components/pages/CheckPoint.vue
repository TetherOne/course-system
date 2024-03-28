<script setup>

</script>

<script>
import {getCheckPoint} from '../../requests.js';


export default {
    data() {
        return {
            id: this.$route.params.id,
            title: '',
            questions: [],
            finished: false,
            score: 0
        }
    },
    async created() {
        const info = await getCheckPoint(this.id);
        this.title = info.title;
        this.questions = info.questions;

        for (const question of this.questions) {
            for (const answer of question.answers) {
                answer.chosen = false;
            }
        }
    },
    methods: {
        check() {
            let score = 0;
            for (const question of this.questions) {
                for (const answer of question.answers) {
                    if (answer.is_correct && answer.chosen) {
                        score += question.max_points;
                        break;
                    }
                }
            }

            this.score = score;
            this.finished = true;
        }
    }
}
</script>

<template>
    <div class="flex-column">
        <div id="title">КТ "{{ title }}"</div>
        <div class="area flex-column" v-for="(question, i) in questions">
            <div>{{ i + 1 }}. {{ question.question_text }}</div>
            <div class="flex-row answer-wrapper" v-for="answer in question.answers">
                <input type="radio" :name="question.id" v-model="answer.chosen">
                <label for="">{{ answer.answer_text }}</label>
            </div>
        </div>
        <input type="submit" name="" id="" @click="check">
        <div v-if="finished">Ваша оценка: {{ score }}</div>
    </div>
</template>

<style scoped>
#title {
    align-self: center;
}

input[type="submit"] {
    align-self: center;
}
</style>