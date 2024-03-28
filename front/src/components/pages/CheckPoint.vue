<script setup>

</script>

<script>
import axios from 'axios';
import {mapStores} from 'pinia';

import {getCheckPoint} from '../../requests.js';
import {checkPointAppAPI} from '../../requests.js';
import {useUserStore} from '../../stores/user.js';


export default {
    data() {
        return {
            id: parseInt(this.$route.params.id),
            title: '',
            questions: [],
            finished: false,
            score: 0,
            maxScore: 0,
            grade: 0,
            percent: 0
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    async created() {
        const info = await getCheckPoint(this.id);
        this.title = info.title;
        this.questions = info.questions;

        for (const question of this.questions) {
            this.maxScore += question.max_points;

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

            this.percent = this.score / this.maxScore;
            this.grade = this.calcGrade();
            this.uploadGrade();
        },
        calcGrade() {
            if (this.percent >= 0.8) {
                return 5;
            } else if (this.percent >= 0.6) {
                return 4;
            } else if (this.percent >= 0.4) {
                return 3;
            } else {
                return 2;
            }
        },
        async uploadGrade() {
            const data = {
                points: this.score,
                percent: this.percent,
                status: this.grade >= 3 ? 'Зачёт' : "Незачёт",
                grade: this.grade,
                student: this.userStore.id,
                checkpoint: this.id
            };
            await axios.post(`${checkPointAppAPI}/passed-checkpoints/`, data);
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
        <div v-if="finished">Ваша оценка: {{ grade }}</div>
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