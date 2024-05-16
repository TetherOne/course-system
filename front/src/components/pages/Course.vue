<script setup lang="ts">
import Header from '#elements/Header';
import CourseCard from '#elements/CourseCard';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ModuleComponent from '#elements/Module';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import {
    useRoute,
    RouteLocationNormalizedLoaded
} from 'vue-router';

import {
    courseApp,
    userApp
} from '#requests';

import useUserStore from '#store';

import {
    ref,
    Ref
} from 'vue';

import {
    Course,
    Module,
    Student,
    Checkpoint
} from '#types';

import {
    shortenName,
    buildFullName,
    handleRequestError
} from '#functions';

import { AxiosError } from 'axios';



const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(route.params.id as string));
const course: Ref<Course> = ref({} as Course);
const modules: Ref<Module[]> = ref([]);
const teacherFullName: Ref<string> = ref('');

const user = useUserStore();

const studentGrades: Ref<any[]> = ref([]);
const studentGradesVisible: Ref<boolean> = ref(false);

const studentsGrades: Ref<any[]> = ref([]);
const studentsGradesVisible: Ref<boolean> = ref(false);

const checkpoints: Ref<Checkpoint[]> = ref([]);



try {
    course.value = await courseApp.course(id.value);
    modules.value = await courseApp.courseModules(id.value);

    if (user.isStudent) {
        teacherFullName.value = buildFullName(await userApp.teacher(course.value.teacher_profile));
        studentGrades.value = await userApp.studentGradesInCourse(user.id, id.value)
    } else {
        checkpoints.value = await courseApp.courseCheckpoints(id.value);
        const students: Student[] = await courseApp.courseStudents(id.value);
        for (const student of students) {
            const grades: any[] = [];
            for (const cp of checkpoints.value) {
                grades.push(await userApp.getStudentGradeOnCheckpoint(student.id, cp.id));
            }
            studentsGrades.value.push({
                student: shortenName(student),
                group: student.group,
                grades
            });
        }
    }
} catch (error) {
    handleRequestError(error as AxiosError);
}



function showStudentGrades(): void {
    studentGradesVisible.value = true;
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
            </div>
            <Accordion>
                <AccordionTab v-for="(module, i) in modules" :key="module.id" :header="`${i + 1}. ${module.name}`">
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