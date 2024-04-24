<script setup lang="ts">
import axios from 'axios'; // Временно???

import { PassedCheckpoint, Question } from '#src/models';

import {ref, Ref} from 'vue';

import API from '#src/classes/api';

import {
    useRoute,
    useRouter
} from 'vue-router';

import {Role, useUserStore} from '#store';

import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import Dialog from 'primevue/dialog';
import ToastMessage from '#elements/ToastMessage';


const user = useUserStore();

const route = useRoute();
const router = useRouter();
const toast = ref(ToastMessage);

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const name: Ref<string> = ref('{checkpoint_name}');
const questions: Ref<Question[]> = ref([]);

const passable: Ref<boolean> = ref(true);
const passed: Ref<boolean> = ref(false);
const grade: Ref<string> = ref('');

const sendConfirmVisible = ref(false);

const colors = {
    '2': 'danger',
    '3': 'warning',
    '4': 'info',
    '5': 'success'
};


async function loadCheckpoint() {
    try {
        const checkpoint = await API.checkpoint(id.value);

        name.value = checkpoint.title;

        questions.value = checkpoint.questions;
        for (const question of questions.value) {
            question.chosenAnswer = null;
        }
    } catch (error) {
        toast.value.showError(`Не удалось загрузить контрольную точку:\n${error}`);
    }
}

function allQuestionsAnswered() {
    for (const question of questions.value) {
        if (question.chosenAnswer === null) {
            return false;
        }
    }
    return true;
}

function handleSend() {
    if (!allQuestionsAnswered()) {
        toast.value.showWarn('Вы должны ответить на все вопросы', 'Без пропущенных');
        return;
    }
    sendConfirmVisible.value = true;
}

async function send() {
    try {
        for (const question of questions.value) {
            await API.sendQuestionChoice(user.id, question.id, question.chosenAnswer, id.value);
        }

        // Временно????
        await axios.post(API.passedCheckpoints, {
            student: user.id,
            checkpoint: id.value,
            points: 0
        });
        // Временно ???

        router.go();
    } catch (error) {
        toast.value.showError(`Не удалось отправить результат:\n${error}`);
    }
}

async function setGrade() {
    const passedCheckpoints = await API.studentPassedCheckpoints(user.id);
    let thisCheckpoint: PassedCheckpoint;
    for (const passedCheckpoint of passedCheckpoints) {
        if (passedCheckpoint.checkpoint === id.value) {
            thisCheckpoint = passedCheckpoint;
            break;
        }
    }
    grade.value = thisCheckpoint.grade ?? 'Не выставлено';
}

async function passedByStudent() {
    try {
        const passedCheckpoints = await API.studentPassedCheckpoints(user.id);
        for (const passedCheckpoint of passedCheckpoints) {
            if (passedCheckpoint.checkpoint === id.value) {
                return true;
            }
        }
        return false;
    } catch (error) {
        toast.value.showWarn(`Не удалось установить результат КТ:\n${error}\nПрохождение недоступно`);
        return true;
    }
}

async function prepare() {
    switch (user.role) {
        case Role.Student:
            passed.value = await passedByStudent();
            passable.value = !passed.value;
            await setGrade();
            break;
        case Role.Teacher:
            passable.value = false;
    }
}


loadCheckpoint();
prepare();
</script>

<template>
    <Fieldset :legend="name">
        <div v-if="user.role === Role.Student && passed" class="flexRow alignCenter alignSelfCenter">
            Вы уже прошли данную КТ. Ваша оценка:
            <Badge :value="grade" :severity="colors[grade]"/>
        </div>
        <div v-for="(question, i) in questions" class="flexColumn">
            <Card>
                <template #title>{{ i + 1 }}. {{ question.question_text }}</template>
                <template #content>
                    <div v-for="answer in question.answers" class="flexRow alignCenter">
                        <RadioButton v-model="question.chosenAnswer" :inputId="answer.id + ''" :value="answer.id"
                                     :disabled="!passable"/>
                        <label :for="answer.id + ''">{{ answer.answer_text }}</label>
                    </div>
                </template>
            </Card>
        </div>
        <Divider/>
        <Button class="alignSelfCenter" @click="handleSend" :disabled="!passable">Отправить</Button>
        <Dialog v-model:visible="sendConfirmVisible" modal header="Завершить" :style="{ width: '20vw' }">
            <div class="flexColumn">
                <div>Вы уверены, что хотите отправить результаты? Это действие нельзя отменить</div>
                <div class="flexRow justifyEnd">
                    <Button severity="danger" @click="sendConfirmVisible = false">Отмена</Button>
                    <Button @click="send">Отправить</Button>
                </div>
            </div>
        </Dialog>
    </Fieldset>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
@import './../../style';


.p-fieldset {
    width: 60vw;
}

:deep(.p-fieldset-content) {
    @extend .flexColumn;
}

:deep(.p-card-content) {
    @extend .flexColumn;
    @extend .sub;
}
</style>