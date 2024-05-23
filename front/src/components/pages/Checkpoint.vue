<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import {
    Router,
    RouteLocationNormalizedLoaded,
    useRouter,
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
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    Checkpoint,
    Question, QuestionFile
} from '#types';

import Path from '#classes/Path';

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

const router: Router = useRouter();
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
    files: {
        visible: false,
        items: [],
        toggle() {
            this.visible = !this.visible;
        }
    },
    addAnswer() {
        this.answers.push({ text: '' });
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
                router.go(0);
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

        if (questionMaker.value.answers.length < 2)
            return false;

        for (const answer of questionMaker.value.answers) {
            if (!answer.text) {
                return false;
            }
        }

        return true;
    };

    if (!questionValid()) {
        noticeError('Проверьте правильность введённых данных и повторите попытку', 'Недостаточно информации');
        return;
    }

    try {
        const question: Question = await questionApp.addQuestion(questionMaker.value.text, questionMaker.value.value, id.value);

        question.files = <QuestionFile[]><unknown>[];
        for (const file of questionMaker.value.files.items) {
            question.files?.push(await questionApp.addQuestionFile(file, question.id));
        }

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

function handleSelectionFiles(event: FileUploadSelectEvent): void {
    questionMaker.value.files.items = event.files;
}



try {
    const checkpoint: Checkpoint = await checkpointApp.checkpoint(id.value);

    name.value = checkpoint.name;
    number.value = checkpoint.checkpoint_number;
    questions.value = checkpoint.questions;
    for (const question of questions.value) {
        question.files = await questionApp.getQuestionFiles(question.id);
    }

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
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexColumn block">
            <div class="h2 alignSelfCenter">
                КТ {{ number }}. {{ name }}
            </div>
            <Divider/>
            <div v-if="passedByCurrentStudent" class="flexRow">
                <div>
                    Вы уже прошли эту КТ. Ваша оценка:
                </div>
                <Badge :value="grade" :severity="colors[grade as 2 | 3 | 4 | 5]"/>
            </div>
            <div class="flexColumn alignSelfCenter alignStretch">
                <Card v-for="(question, i) in questions" :key="question.id">
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
                    <template v-if="question.files?.length" #footer>
                        <Accordion>
                            <AccordionTab>
                                <template #header>
                                    <div class="alignSelfStart">
                                        Дополнительные файлы
                                    </div>
                                </template>
                                <template #headericon>
                                    <div style="display: none;"></div>
                                </template>
                                <div class="flexColumn">
                                    <a v-for="file in question.files" :key="file.id" :href="file.question_file">
                                        {{ Path.getLastElement(file.question_file) }}
                                    </a>
                                </div>
                            </AccordionTab>
                        </Accordion>
                    </template>
                </Card>
            </div>
            <Divider class="alignSelfStretch"/>
            <Button v-if="user.isTeacher" class="alignSelfStart" label="Добавить вопрос" @click="showQuestionMaker"
                    :disabled="questionMaker.seen"/>
            <div v-if="questionMaker.seen" class="flexColumn alignSelfStretch">
<!--                <div class="flexRow alignCenter">-->
<!--                    <div>-->
<!--                        Текст вопроса-->
<!--                    </div>-->
<!--                    <InputGroup>-->
<!--                        <InputGroupAddon>-->
<!--                            <i class="pi pi-question"/>-->
<!--                        </InputGroupAddon>-->
<!--                        <InputText v-model="questionMaker.text" :invalid="!questionMaker.text"/>-->
<!--                    </InputGroup>-->
<!--                </div>-->
<!--                <div class="flexRow alignCenter">-->
<!--                    <div>-->
<!--                        Кол-во баллов-->
<!--                    </div>-->
<!--                    <InputNumber v-model="questionMaker.value" :min="1"/>-->
<!--                </div>-->

                <div class="flexColumn alignStretch alignSelfStart">
                    <div class="grid">
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-question"/>
                            </InputGroupAddon>
                            <InputText v-model="questionMaker.text" placeholder="Текст вопроса" variant="filled" />
                        </InputGroup>
                        <Button icon="pi pi-file" text v-tooltip="'Доп. файлы'" @click="questionMaker.files.toggle()" />
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-sort-numeric-down"/>
                            </InputGroupAddon>
                            <InputNumber v-model="questionMaker.value" :min="1" placeholder="Балл" variant="filled" />
                        </InputGroup>
                    </div>
                </div>

                <div v-show="questionMaker.files.visible" class="flexColumn">
                    <div>Файлы к вопросу</div>
                    <FileUpload multiple @select="handleSelectionFiles">
                        <template #header="{ chooseCallback }">
                            <Button label="Выбрать" @click="chooseCallback"/>
                        </template>
                    </FileUpload>
                </div>

                <div class="flexColumn alignSelfStretch">
                    <div class="flexRow alignCenter alignSelfStart" style="margin-left: 30px;">
                        <div>
                            Ответы
                        </div>
                        <Button icon="pi pi-plus" text @click="questionMaker.addAnswer()"/>
                    </div>
                    <div class="flexColumn">
                        <div v-for="(answer, i) in questionMaker.answers" :key="i" class="flexRow alignCenter">
                            <RadioButton v-model="questionMaker.indexOfRightAnswer" :value="i"
                                         v-tooltip="'Нажмите, чтобы отметить ответ правильным'"/>
                            <InputText v-model="answer.text" placeholder="Текст ответа" variant="filled" :invalid="!answer.text"/>
                        </div>
                    </div>
                </div>
                <Button class="alignSelfEnd" label="Сохранить" @click="handleAddingQuestion"/>
            </div>
            <Button v-if="user.isStudent" label="Завершить" severity="danger" class="alignSelfCenter"
                    @click="onComplete" :disabled="!passable" />
        </div>
    </div>
    <ConfirmDialog/>
</template>

<style scoped lang="sass">
.grid
    display: grid
    grid-template-columns: 3fr 1fr
    gap: 8px
</style>