<script>
import {
    getCheckPoint,
    getStudentPassedCheckPoints
} from '../../requests.js';

import {
    useUserStore
} from '../../stores/user.js';

import {
    studentRole
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
            id: this.$route.params.id,
            title: '',
            questions: [],
            isPassedByStudent: false
        }
    },

    created() {
        this.loadData();

        this.isPassedByStudent = this.user.role === studentRole && this.F_isPassedByStudent();


    },

    methods: {
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
        }
    }
}
</script>


<template>
    <div id="check-point-wrapper" class="flex-column">
        <h2>КТ "{{ title }}"</h2>
        <div v-if="isPassedByStudent">Вы уже прошли данную КТ</div>
        <div class="flex-column">
            <div class="flex-column question" v-for="question in questions">
                <div>{{ question.question_text }}</div>
                <div class="flex-row sub" v-for="answer in question.answers">
                    <input type="radio" :name="question.id" :id="answer.id">
                    <label :for="answer.id">{{ answer.answer_text }}</label>
                </div>
            </div>
        </div>
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