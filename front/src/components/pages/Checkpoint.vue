<script>
import { API } from '#classes/api';
import { useUserStore } from '#store';
import { Toasts } from '#app';
import { UserRoles } from '#app';
import axios from 'axios';

import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Badge from 'primevue/badge';


export default {
    name: 'Checkpoint',
    components: {
        Fieldset,
        Button,
        RadioButton,
        Card,
        Divider,
        Badge
    },
    data() {
        return {
            id: parseInt(this.$route.params.id),
            name: '_checkpointName_',
            questions: [],
            passed: false,

            grade: 0,

            colors: {
                2: 'danger',
                3: 'warning',
                4: 'info',
                5: 'success'
            }
        };
    },
    setup() {
        const user = useUserStore();

        return {
            user
        };
    },
    methods: {
        async loadData() {
            try {
                const checkpoint = await API.checkpoint(this.id);

                this.name = checkpoint.title;
                this.questions = checkpoint.questions;
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки данных КТ:\n${error}`);
            }
        },
        prepareQuestions() {
            for (const question of this.questions) {
                question.chosenAnswer = null;
            }
        },
        async alreadyPassed() {
            try {
                const result = await API.didStudentPassCheckpoint(this.user.id, this.id);
                return result;
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки вашего результата по данной КТ:\n${error}`);
            }
        },
        async send() {
            if (!this.allQuestionsAnswered()) {
                this.user.showToast(Toasts.Warn, `Вы должны ответить на все вопросы`);
            }

            const score = this.calcScore();

            try {
                await axios.post(`${API.passedCheckpointsAPI}/`, {
                    student: this.user.id,
                    checkpoint: this.id,
                    points: score
                });

                for (const question of this.questions) {
                    await axios.post(`${API.historyOfPassedAnswersAPI}/`, {
                        student: this.user.id,
                        checkpoint: this.id,
                        question: question.id,
                        selected_answer: question.chosenAnswer
                    });
                }

                this.$router.go();
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка отправки результата:\n${error}`);
            }
        },
        calcScore() {
            let score = 0;
            for (const question of this.questions) {
                const chosenAnswerId = question.chosenAnswer;

                for (const answer of question.answers) {
                    if (answer.id === chosenAnswerId) {
                        score += question.max_points;
                        break;
                    }
                }
            }
            return score;
        },
        allQuestionsAnswered() {
            for (const question of this.questions) {
                if (question.chosenAnswer === null) {
                    return false;
                }
            }
            return true;
        }
    },
    async created() {
        await this.loadData();
        this.prepareQuestions();

        if (this.user.role === UserRoles.Student) {
            this.passed = await this.alreadyPassed();
        }

        if (this.passed) {
            const checkpoint = await API.studentCheckpointResult(this.user.id, this.id);
            this.grade = checkpoint.grade;
        }
    }
}
</script>

<template>
    <Fieldset :legend="`КТ '${name}'`">
        <div class="flex-column">
            <div v-if="passed">
                Вы уже прошли данную КТ. Ваша оценка: <Badge :value="grade" :severity="colors[grade]"/>
            </div>
            <div class="flex-column" v-for="(question, questionIndex) in questions">
                <Card>
                    <template #title>{{ questionIndex + 1 }}. {{ question.question_text }}</template>
                    <template #content>
                        <div class="flex-column">
                            <div class="flex-row" v-for="answer in question.answers">
                                <RadioButton v-model="question.chosenAnswer" :inputId="`${answer.id}`" :value="answer.id" :disabled="passed"/>
                                <label :for="`${answer.id}`">{{ answer.answer_text }}</label>
                            </div>
                        </div>
                    </template>
                </Card>
                <Divider v-if="questionIndex < questions.length - 1"/>
            </div>
            <Button @click="send" :disabled="passed">Отправить</Button>
        </div>
    </Fieldset>
</template>

<style scoped>

</style>