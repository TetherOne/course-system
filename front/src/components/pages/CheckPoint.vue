<script>
import axios from 'axios';

import {
    getCheckPoint,
    getStudentPassedCheckPoints,
    getCheckPointResults,
    checkPointAPI
} from '../../requests.js';

import {
    studentRole,
    useUserStore
} from '../../stores/user.js';


export default {
    setup() {
        const user = useUserStore();

        return {
            user
        }
    },

    data() {
        return {
            id: parseInt(this.$route.params.id),
            title: '',
            questions: [],
            isPassedByStudent: false,
            grade: 0,
            score: 0
        }
    },

    async created() {
        await this.loadData();
        this.prepareAnswers();

        this.isPassedByStudent = this.user.role === studentRole && await this.F_isPassedByStudent();

        if (this.isPassedByStudent) {
            const info = await getCheckPointResults(this.user.id, this.id);
            this.grade = info.grade;
        }
    },

    methods: {
        studentRole() {
            return studentRole
        },
        async F_isPassedByStudent() {
            let passedCheckPoints = await getStudentPassedCheckPoints(this.user.id);
            if (passedCheckPoints.length === 0) {
                return false;
            }

            passedCheckPoints = passedCheckPoints.filter(cp => {
                return cp.checkpoint === this.id;
            });

            return passedCheckPoints.length !== 0;
        },

        async loadData() {
            const checkPoint = await getCheckPoint(this.id);
            this.title = checkPoint.title;
            this.questions = checkPoint.questions;
        },

        async handleCompletion() {
            this.estimate();
            await this.sendResult();
            window.location.reload();
        },

        estimate() {
            for (const question of this.questions) {
                for (const answer of question.answers) {
                    if (answer.is_correct && answer.chosen) {
                        this.score += question.max_points;
                        break;
                    }
                }
            }
        },

        prepareAnswers() {
            for (const question of this.questions) {
                for (const answer of question.answers) {
                    answer.chosen = false;
                }
            }
        },

        async sendResult() {
            console.log({
                student: this.user.id,
                checkpoint: this.id,
                points: this.score
            })
            await axios.post(`${checkPointAPI}/passed-checkpoints/`, {
                student: this.user.id,
                checkpoint: this.id,
                points: this.score
            });
        }
    },

    computed: {
        gradeColor() {
            const map = {
                '2': 'red',
                '3': 'orange',
                '4': 'yellow',
                '5': 'green'
            }

            return map[this.grade];
        }
    }
}
</script>


<template>
    <div id="check-point-wrapper" class="flex-column">
        <h2>КТ "{{ title }}"</h2>
        <div v-if="isPassedByStudent">Вы уже прошли данную КТ. Ваша оценка: <span :style="{'color': gradeColor}" id="grade">{{ grade }}</span></div>
        <div class="flex-column">
            <div class="flex-column question" v-for="question in questions">
                <div>{{ question.question_text }}</div>
                <div class="flex-row sub" v-for="answer in question.answers">
                    <input type="radio" :name="question.id" :id="answer.id" v-model="answer.chosen">
                    <label :for="answer.id">{{ answer.answer_text }}</label>
                </div>
            </div>
        </div>
        <input v-if="user.role === studentRole()" type="submit" value="Отправить" class="submit-btn"
               @click="handleCompletion">
    </div>
</template>


<style scoped>
#check-point-wrapper {
    padding: var(--std-padding);
    border-radius: var(--std-corner-radius);
    background-color: #e6e6e6;
}

.question {
    padding: var(--std-padding);
    border-radius: var(--std-corner-radius);
    background-color: white;
}
</style>