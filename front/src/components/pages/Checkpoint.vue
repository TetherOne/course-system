<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    useRoute
} from 'vue-router';

import { AxiosError } from 'axios';

import { useConfirm } from 'primevue/useconfirm';

import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Divider from 'primevue/divider';
import Badge from 'primevue/badge';
import ConfirmDialog from 'primevue/confirmdialog';

import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    Checkpoint,
    Question
} from '#types';

import {
    userApp,
    checkpointApp,
    questionApp,
    history
} from '#requests';

import Header from '#elements/Header';



const user = useUserStore();

const confirm = useConfirm();

const noticeSuccess: Notice = inject('noticeSuccess') as Notice;
const noticeWarn: Notice = inject('noticeWarn') as Notice;
const noticeError: Notice = inject('noticeError') as Notice;

const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;

const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(route.params.id as string));
const name: Ref<string> = ref('');
const number: Ref<number> = ref(0);
const questions: Ref<Question[]> = ref([]);

const passable: Ref<boolean> = ref(true);
const passedByCurrentStudent: Ref<boolean> = ref(false);
const grade: Ref<number> = ref(0);

const colors = {
    2: 'danger',
    3: 'warning',
    4: 'info',
    5: 'success'
};

const questionMaker = ref({
    seen: false,
    text: '',
    value: 1,
    answers: [] as {
        text: string,
        isCorrect?: boolean
    }[],
    indexOfRightAnswer: -1,
    addAnswer() {
        this.answers.push({ text: `Вопрос ${this.answers.length + 1}` });
    },
    reset() {
        this.seen = false;
        this.text = '';
        this.value = 1;
        this.answers = [];
        this.indexOfRightAnswer = -1;
    }
});



async function onComplete(): Promise<void> {
    for (const question of questions.value) {
        if (!question.chosenAnswer) {
            noticeWarn('Вы должны ответить на все вопросы', 'Не так быстро');
            return;
        }
    }

    confirm.require({
        message: 'Вы уверены, что хотите завершить прохождение КТ?',
        header: 'Завершение КТ',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-success p-button-outlined',
        rejectLabel: 'Отмена',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Завершить',
        async accept() {
            try {
                for (const question of questions.value) {
                    await history.sendQuestionChoice(user.id, question.id, question.chosenAnswer as number, id.value);
                }
                await checkpointApp.sendResult(user.id, id.value);
            } catch (error) {
                await handleRequestError(error as AxiosError);
            }
        }
    });
}

function showQuestionMaker(): void {
    questionMaker.value.reset();
    questionMaker.value.seen = true;
}

async function handleAddingQuestion(): Promise<void> {
    const questionValid = (): boolean => {
        if (!questionMaker.value.text) {
            return false;
        }

        if (questionMaker.value.indexOfRightAnswer === -1) {
            return false;
        }

        for (const answer of questionMaker.value.answers) {
            if (!answer.text) {
                return false;
            }
        }

        return true;
    }

    if (!questionValid()) {
        noticeError('Проверьте правильность введённых данных и повторите попытку', 'Недостаточно информации');
        return;
    }

    try {
        const question: Question = await questionApp.addQuestion(questionMaker.value.text, questionMaker.value.value, id.value);

        questionMaker.value.answers.forEach((answer, i) => {
            answer.isCorrect = i === questionMaker.value.indexOfRightAnswer;
        });

        for (const answer of questionMaker.value.answers) {
            question.answers.push(await questionApp.addAnswer(
                answer.text,
                answer.isCorrect as boolean,
                question.id
            ));
        }

        questions.value.push(question);
        questionMaker.value.reset();
        noticeSuccess('Вопрос успешно добавлен');
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}



try {
    const checkpoint: Checkpoint = await checkpointApp.checkpoint(id.value);

    name.value = checkpoint.name;
    number.value = checkpoint.checkpoint_number;
    questions.value = checkpoint.questions;

    if (user.isStudent) {
        const res: number | '-' = await userApp.getStudentGradeOnCheckpoint(user.id, id.value);

        if (res !== '-') {
            passedByCurrentStudent.value = true;
            passable.value = false;
            grade.value = res;
        }
    } else {
        passable.value = false;
    }
} catch (error) {
    handleRequestError(error as AxiosError);
}
</script>

<template>
    <div class="flex-column alignCenter">
        <Header/>
        <div class="flex-column block wide">
            <div class="h2">
                КТ {{ number }}. {{ name }}
            </div>
            <Divider/>
            <div v-if="passedByCurrentStudent" class="flex-row">
                <div>
                    Вы уже прошли эту КТ. Ваша оценка:
                </div>
                <Badge :value="grade" :severity="colors[grade as 2 | 3 | 4 | 5]"/>
            </div>
            <div v-for="(question, i) in questions" :key="question.id" class="flex-column alignStretch">
                <Card>
                    <template #title>
                        {{ i + 1 }}. {{ question.question_text }}
                    </template>
                    <template #content>
                        <div class="flex-column sub">
                            <div v-for="answer in question.answers" :key="answer.id" class="flex-row">
                                <RadioButton v-model="question.chosenAnswer" :inputId="`${answer.id}`"
                                             :value="answer.id" :disabled="!passable"/>
                                <label :for="`${answer.id}`">
                                    {{ answer.answer_text }}
                                </label>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
            <Button v-if="user.isTeacher" label="Добавить вопрос" @click="showQuestionMaker" :disabled="questionMaker.seen"/>
            <div v-if="questionMaker.seen" class="flex-column">
                <div class="flex-row alignCenter">
                    <div>
                        Текст вопроса
                    </div>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-question"/>
                        </InputGroupAddon>
                        <InputText v-model="questionMaker.text" :invalid="!questionMaker.text"/>
                    </InputGroup>
                </div>
                <div class="flex-row alignCenter">
                    <div>
                        Кол-во баллов
                    </div>
                    <InputNumber v-model="questionMaker.value" :min="1"/>
                </div>
                <div class="flex-column">
                    <div class="flex-row alignCenter">
                        <div>
                            Ответы
                        </div>
                        <Button icon="pi pi-plus" text @click="questionMaker.addAnswer()"/>
                    </div>
                    <div class="sub flex-column">
                        <div v-for="(answer, i) in questionMaker.answers" :key="i" class="flex-row alignCenter">
                            <RadioButton v-model="questionMaker.indexOfRightAnswer" :value="i" v-tooltip="'Нажмите, чтобы отметить ответ правильным'"/>
                            <InputText v-model="answer.text" :invalid="!answer.text"/>
                        </div>
                    </div>
                </div>
                <Button label="Сохранить" @click="handleAddingQuestion"/>
            </div>
            <Divider/>
            <Button label="Завершить" severity="danger" class="alignSelfCenter" @click="onComplete"
                    :disabled="!passable"/>
        </div>
    </div>
    <ConfirmDialog/>
</template>