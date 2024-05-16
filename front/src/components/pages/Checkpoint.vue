<script setup lang="ts">
import Header from '#elements/Header';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';

import {
    userApp,
    checkpointApp,
    history
} from '#requests';

import useUserStore from '#store';

import {
    Checkpoint,
    Question,
    PopUp
} from '#types';

import { handleRequestError } from '#functions';

import {
    ref,
    Ref,
    inject
} from 'vue';

import {
    useRoute,
    RouteLocationNormalizedLoaded
} from 'vue-router';

import { AxiosError } from 'axios';



const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(route.params.id as string));
const name: Ref<string> = ref('');
const number: Ref<number> = ref(0);
const questions: Ref<Question[]> = ref([]);

const user = useUserStore();

const showWarn: PopUp = inject('showWarn') as PopUp;

const confirm = useConfirm();

const passable: Ref<boolean> = ref(true);
const passedByCurrentStudent: Ref<boolean> = ref(false);
const grade: Ref<number> = ref(0);

const colors = {
    2: 'danger',
    3: 'warning',
    4: 'info',
    5: 'success'
};



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
        } else {
            passable.value = false;
        }
    }
} catch (error) {
    handleRequestError(error as AxiosError);
}



async function onComplete(): Promise<void> {
    for (const question of questions.value) {
        if (!question.chosenAnswer) {
            showWarn('Вы должны ответить на все вопросы', 'Не так быстро');
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
                handleRequestError(error as AxiosError);
            }
        }
    });
}
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexColumn block wide">
            <div class="h2">
                КТ {{ number }}. {{ name }}
            </div>
            <Divider/>
            <div v-if="passedByCurrentStudent" class="flexRow">
                <div>
                    Вы уже прошли эту КТ. Ваша оценка:
                </div>
                <Badge :value="grade" :severity="colors[grade as 2 | 3 | 4 | 5]"/>
            </div>
            <div v-for="(question, i) in questions" :key="question.id" class="flexColumn alignStretch">
                <Card>
                    <template #title>
                        {{ i + 1 }}. {{ question.question_text }}
                    </template>
                    <template #content>
                        <div class="flexColumn sub">
                            <div v-for="answer in question.answers" :key="answer.id" class="flexRow">
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
            <Button label="Завершить" severity="danger" class="alignSelfCenter" @click="onComplete"
                    :disabled="!passable"/>
        </div>
    </div>
    <ConfirmDialog/>
</template>

<style scoped>

</style>