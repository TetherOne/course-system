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
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';



import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    Course,
    Module,
    Student,
    Checkpoint
} from '#types';

import {
    shortenName,
    buildFullName
} from '#functions';

import {
    courseApp,
    userApp
} from '#requests';

import Header from '#elements/Header';
import CourseCard from '#elements/CourseCard';
import ModuleComponent from '#elements/Module';



const user = useUserStore();

const confirm = useConfirm();



const noticeSuccess: Notice = inject('noticeSuccess') as Notice;
const noticeError: Notice = inject('noticeError') as Notice;

const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;



const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(route.params.id as string));
const course: Ref<Course> = ref({} as Course);
const modules: Ref<Module[]> = ref([]);
const teacherFullName: Ref<string> = ref('');

const studentGrades: Ref<any[]> = ref([]);
const studentGradesVisible: Ref<boolean> = ref(false);

const studentsGrades: Ref<any[]> = ref([]);
const studentsGradesVisible: Ref<boolean> = ref(false);

const checkpoints: Ref<Checkpoint[]> = ref([]);

const newModule = ref({
    visible: false,
    btnWasPressed: false,
    name: ''
});



function showStudentGrades(): void {
    studentGradesVisible.value = true;
}

async function onAddModule(): Promise<void> {
    newModule.value.btnWasPressed = true;

    if (!newModule.value.name) {
        noticeError('Имя модуля обязательно');
        return;
    }

    try {
        modules.value.push(await courseApp.addModule(newModule.value.name, id.value));
        newModule.value.visible = false;
        noticeSuccess('Модуль добавлен');
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}

async function handleCourseDeletion(index: number): Promise<void> {
    const moduleToBeDeleted: Module = modules.value[index];

    confirm.require({
        message: `Вы уверены, что хотите удалить модуль "${moduleToBeDeleted.name}"?`,
        header: 'Удаление модуля',
        icon: 'pi pi-trash',
        rejectClass: 'p-button-success p-button-outlined',
        acceptClass: 'p-button-danger',
        async accept() {
            try {
                await courseApp.deleteModule(moduleToBeDeleted.id);
                router.go(0);
            } catch (error) {
                const err: AxiosError = <AxiosError>error;
                noticeError(`Ошибка ${err.response?.status}\n${err.message}`, 'Не удалось удалить курс');
            }
        }
    });
}



try {
    course.value = await courseApp.course(id.value);
    modules.value = await courseApp.courseModules(id.value);

    if (user.isStudent) {
        teacherFullName.value = buildFullName(await userApp.teacher(course.value.teacher_profile));
        studentGrades.value = await userApp.studentGradesInCourse(user.id, id.value);
    } else {
        checkpoints.value = await courseApp.courseCheckpoints(id.value);
        const students: Student[] = await courseApp.courseStudents(id.value);
        for (const student of students) {
            const grades: any[] = [];
            for (const cp of checkpoints.value) {
                grades.push(await userApp.getStudentGradeOnCheckpoint(student.id, cp.id, true));
            }
            studentsGrades.value.push({
                student: shortenName(student),
                group: student.group,
                grades
            });
        }
    }
} catch (error) {
    await handleRequestError(error as AxiosError);
}
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="flexRow block wide">
            <div class="flexColumn">
                <CourseCard :course="course"/>
                <div v-if="user.isStudent" class="flexColumn">
                    <div>
                        Курс ведёт:
                    </div>
                    <router-link :to="{ name: 'teacher', params: { id: course.teacher_profile } }">
                        {{ teacherFullName }}
                    </router-link>
                </div>
                <Button v-if="user.isStudent" label="Оценки" text @click="showStudentGrades"/>
                <Button v-else label="Успеваемость студентов" text @click="studentsGradesVisible = true"/>
                <Button v-if="user.isTeacher" label="Добавить модуль" text @click="newModule.visible=true"/>
            </div>
            <Accordion>
                <AccordionTab v-for="(module, i) in modules" :key="module.id">
                    <template #header>
                        <div class="flexRow justifyBetween alignCenter">
                            <div>
                                {{ i + 1 }}. {{ module.name }}
                            </div>
                            <Button v-if="user.isTeacher" icon="pi pi-trash" rounded @click="handleCourseDeletion(i)"/>
                        </div>
                    </template>
                    <ModuleComponent :module="module"/>
                </AccordionTab>
            </Accordion>
        </div>
    </div>
    <Dialog v-model:visible="studentGradesVisible" modal header="Оценки">
        <div class="flexColumn">
            <div v-for="grade in studentGrades" class="flexRow alignEnd">
                <div class="h1">
                    {{ grade.number }}. {{ grade.name }}
                </div>
                <div>
                    Оценка {{ grade.grade }}
                </div>
            </div>
        </div>
    </Dialog>
    <Dialog v-model:visible="studentsGradesVisible" modal header="Успеваемость студентов">
        <table>
            <tr>
                <th>Студент</th>
                <th>Группа</th>
                <th v-for="cp in checkpoints">
                    {{ cp.checkpoint_number }}. {{ cp.name }}
                </th>
            </tr>
            <tr v-for="student in studentsGrades">
                <td>{{ student.student }}</td>
                <td>{{ student.group }}</td>
                <td v-for="grade in student.grades">
                    {{ grade }}
                </td>
            </tr>
        </table>
    </Dialog>
    <Dialog v-model:visible="newModule.visible" modal header="Новый модуль">
        <label for="name">Название</label>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-file"/>
            </InputGroupAddon>
            <InputText v-model="newModule.name" id="name" aria-describedby="name-help"
                       :invalid="newModule.btnWasPressed&&!newModule.name"/>
        </InputGroup>
        <small id="name-help">Введите название модуля</small>
        <template #footer>
            <Button label="Отмена" severity="danger" @click="newModule.visible=false"/>
            <Button label="Добавить" @click="onAddModule"/>
        </template>
    </Dialog>
    <ConfirmDialog/>
</template>

<style scoped lang="scss">
.p-accordion {
    flex-grow: 1;
}

:deep(.p-accordion-content) {
    border-radius: 5px;
}

table, th, td {
    border: 1px solid rgba(255, 255, 255, .1);
    border-collapse: collapse;
}

th, td {
    padding: 5px;
}
</style>