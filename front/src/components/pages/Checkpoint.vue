<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    useRoute,
    Router,
    useRouter
} from 'vue-router';

// import { AxiosError } from 'axios';

import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';

import { useConfirm } from 'primevue/useconfirm';

import { Role } from '#enums';

import {
    PopUp,
    Checkpoint,
    PassedCheckpoint,
    Question
} from '#types';

import Header from '#elements/Header';

import {
    getCheckpoint,
    getStudentPassedCheckpoints,
    sendPassedCheckpoint,
    sendQuestionChoice
} from '#requests';

import useUserStore from '#store';



const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const name: Ref<string> = ref('');
const questions: Ref<Question[]> = ref([]);

const passable: Ref<boolean> = ref(true);
const passedByCurrentStudent: Ref<boolean> = ref(false);
const grade: Ref<string | null> = ref(null);

const user = useUserStore();

const confirm = useConfirm();

const showWarn: PopUp = <PopUp>inject('warnPopUp');



async function start(): Promise<void> {
    try {
        const checkpoint: Checkpoint = await getCheckpoint(id.value);

        name.value = checkpoint.name;
        questions.value = checkpoint.questions;
    } catch (error) {
        // const err: AxiosError = <AxiosError>error;
        // switch (err.response?.status) {
        //     case 403:
        //
        // }
    }

    for (const question of questions.value) {
        question.chosenAnswer = null;
    }

    if (await user.getRole() === Role.Student) {
        const studentPassedCheckpoints: PassedCheckpoint[] = await getStudentPassedCheckpoints(await user.getId());

        for (const passedCheckpoint of studentPassedCheckpoints) {
            if (passedCheckpoint.checkpoint === id.value) {
                passedByCurrentStudent.value = true;
                passable.value = false;
                grade.value = passedCheckpoint.grade;
                break;
            }
        }
    } else {
        passable.value = false;
    }
}

async function handleCompletion(): Promise<void> {
    for (const question of questions.value) {
        if (!question.chosenAnswer) {
            showWarn('Не так быстро', 'Вы должны ответить на все вопросы');
            return;
        }
    }

    confirm.require({
        message: 'Вы уверены, что хотите завершить КТ?',
        header: 'Отправка результата',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary',
        rejectLabel: 'Отмена',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Завершить',
        accept() {
            sendResult();
        }
    });
}

async function sendResult(): Promise<void> {
    try {
        for (const question of questions.value) {
            await sendQuestionChoice(user.id, question.id, <number>question.chosenAnswer, id.value);
        }

        await sendPassedCheckpoint(user.id, id.value, 0);

        router.go(0);
    } catch (error) {
        await router.push({ name: 'error' });
    }
}



start();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="block width60 flexColumn">
            <div class="alignSelfCenter upper">
                КТ "{{ name }}"
            </div>
            <Divider/>
            <div v-if="passedByCurrentStudent">
                <div>
                    Вы уже прошли эту КТ. Ваша оценка: {{ grade }}
                </div>
                <Divider/>
            </div>
            <div class="flexColumn">
                <div v-for="question in questions" :key="question.id" class="flexColumn">
                    <div class="upper">
                        {{ question.question_text }}
                    </div>
                    <div class="sub flexColumn">
                        <div v-for="answer in question.answers" :key="answer.id" class="flexRow alignCenter">
                            <RadioButton v-model="question.chosenAnswer" :inputId="`${answer.id}`" :value="answer.id"
                                         :disabled="!passable"
                            />
                            <label :for="`${answer.id}`">
                                {{ answer.answer_text }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <Divider/>
            <Button label="Отправить" severity="danger" class="alignSelfCenter" @click="handleCompletion" :disabled="!passable"/>
            <ConfirmDialog/>
        </div>
    </div>
</template>

<style scoped>

</style>