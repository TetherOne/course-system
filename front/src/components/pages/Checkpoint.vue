<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    Router,
    useRoute,
    useRouter
} from 'vue-router';

import {
    PassedCheckpoint
} from '#models';

import useUserStore from '#store';

import { useConfirm } from 'primevue/useconfirm';

import Divider from 'primevue/divider';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';

import Checkpoint from '#classes/Checkpoint';

import {
    getCheckpoint,
    getStudentPassedCheckpoints,
    sendPassedCheckpoint,
    sendQuestionChoice
} from '#requests';

import ToastMessage from '#elements/ToastMessage';



type Grade = '2' | '3' | '4' | '5';



const user = useUserStore();

const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();
const toast: Ref<any> = ref(null);
const confirm = useConfirm();

const data: Ref<Checkpoint> = ref(<Checkpoint>{});

const passable: Ref<boolean> = ref(true);
const passedByCurrentStudent: Ref<boolean> = ref(false);

const studentResult: Ref<PassedCheckpoint> = ref(<PassedCheckpoint>{});

const colors = {
    '2': 'danger',
    '3': 'warning',
    '4': 'info',
    '5': 'success'
};



async function start() {
    try {
        data.value = new Checkpoint(await getCheckpoint(parseInt(<string>route.params.id)));
        await data.value.loadQuestions();
    } catch (error) {
        toast.value.showError(`${error}`, 'Ошибка загрузки КТ');
    }

    if (user.isStudent) {
        try {
            const studentPassedCheckpoints: PassedCheckpoint[] = await getStudentPassedCheckpoints(user.id);

            if (studentPassedCheckpoints.find((passedCheckpoint) => {
                if (passedCheckpoint.checkpoint === data.value.id) {
                    studentResult.value = passedCheckpoint;
                    return true;
                }
                return false;
            })) {
                passedByCurrentStudent.value = true;
                passable.value = false;
            } else {
                passedByCurrentStudent.value = false;
            }
        } catch (error) {
            toast.value.showWarn(
                `Прохождение КТ недоступно. Дополнительные сведения:\n${error}`,
                'Ошибка загрузки результата'
            );
            passable.value = false;
        }
    } else {
        passable.value = false;
    }
}

function allQuestionsAnswered() {
    for (const question of data.value.questions) {
        if (!question.chosenAnswer) {
            return false;
        }
    }
    return true;
}

function getUnansweredQuestions() {
    const questions: string[] = [];
    for (const question of data.value.questions) {
        if (!question.chosenAnswer) {
            questions.push(question.text);
        }
    }
    return questions;
}

function handleCompletion() {
    if (!allQuestionsAnswered()) {
        const list: string[] = getUnansweredQuestions();
        const warnText: string = `Нет ответа на:\n${list.join('\n')}`;
        toast.value.showWarn(warnText, 'Вы должны ответить на все вопросы');
        return;
    }

    confirm.require({
        message: 'Вы уверены, что хотите отправить ответы?',
        header: 'Завершение КТ',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Отмена',
        acceptLabel: 'Отправить',
        accept() {
            sendResult();
        }
    });
}

async function sendResult() {
    try {
        for (const question of data.value.questions) {
            await sendQuestionChoice(user.id, question.id, <number>question.chosenAnswer, data.value.id);
        }

        await sendPassedCheckpoint(user.id, data.value.id, 0);

        router.go(0);
    } catch (error) {
        toast.value.showError(`${error}`, 'Ошибка отправки результата');
    }
}



start();
</script>

<template>
    <div class="flexColumn container">
        <div class="alignSelfCenter">{{ data.name }}</div>
        <div v-if="passedByCurrentStudent" class="flexRow alignCenter">
            <div>Вы уже прошли данную КТ. Ваша оценка:</div>
            <Badge
                v-if="studentResult.grade"
                :value="studentResult.grade"
                :severity="colors[<Grade>studentResult.grade]"
            />
            <div v-else>
                ещё не выставлено
            </div>
        </div>
        <div v-for="(question, i) in data.questions" :key="question.id">
            <Divider/>
            <Card>
                <template #title>
                    {{ i + 1 }}. {{ question.text }}
                </template>
                <template #content>
                    <div class="flexColumn sub">
                        <div v-for="answer in question.answers" :key="answer.id" class="flexRow alignCenter">
                            <RadioButton
                                v-model="question.chosenAnswer"
                                :inputId="answer.id + ''"
                                :value="answer.id"
                                :disabled="!passable"
                            />
                            <label :for="answer.id + ''">{{ answer.text }}</label>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
        <Divider/>
        <Button
            class="alignSelfCenter"
            icon="pi pi-check"
            label="Отправить"
            @click="handleCompletion"
            :disabled="!passable"
        />
        <ConfirmDialog/>
    </div>
    <ToastMessage ref="toast"/>
</template>

<style scoped lang="scss">
.container {
    min-width: 35vw;
}
</style>