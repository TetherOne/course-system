<script>
import { useUserStore } from '#store';
import { API } from '#classes/api';
import axios from 'axios';

import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';

import {
    UserRoles,
    Toasts
} from '#app';

import {
    coursePath,
    teacherPath
} from '#router';


export default {
    name: 'CoursesList',
    data() {
        return {
            legend: '_legend_',
            courses: [],
            newCourse: {
                formVisible: false,
                name: '',
                description: '',
                password: ''
            }
        };
    },
    props: {
        pageUserRole: {
            type: Number,
            required: true
        }
    },
    components: {
        Fieldset,
        Divider,
        Card,
        InputGroup,
        InputText,
        Button,
        Panel,
        FloatLabel,
        Textarea
    },
    setup() {
        const user = useUserStore();

        return {
            user,
            UserRoles
        };
    },
    methods: {
        getLegend() {
            switch (this.pageUserRole) {
                case UserRoles.Student:
                    return 'Моё обучение';
                case UserRoles.Teacher:
                    switch (this.user.role) {
                        case UserRoles.Student:
                            return 'Курсы';
                        case UserRoles.Teacher:
                            return 'Мои курсы';
                }
            }
        },
        getTeacherShortName(teacher) {
            const name = `${teacher.name.slice(0, 1)}.`;

            let fatherName = '';
            if (teacher.father_name !== null) {
                fatherName = `${teacher.father_name.slice(0, 1)}.`;
            }

            return `${teacher.surname} ${name} ${fatherName}`;
        },
        async loadCourses() {
            try {
                switch (this.pageUserRole) {
                    case UserRoles.Student:
                        this.courses = await API.studentCourses(this.user.id);

                        for (const course of this.courses) {
                            try {
                                const teacher = await API.teacher(course.teacher_profile);
                                course.teacherShortName = this.getTeacherShortName(teacher);
                            } catch (error) {
                                this.user.showToast(Toasts.Error, `Ошибка загрузки информации о преподавателе
                                курса ${course.course_name}`);
                            }
                        }

                        break;
                    case UserRoles.Teacher:
                        this.courses = await API.teacherCourses(parseInt(this.$route.params.id));

                        if (this.pageUserRole === UserRoles.Student) {
                            for (const course of this.courses) {
                                course.enteredPassword = '';
                            }
                        }

                        break;
                }
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки курсов:\n${error}`);
            }
        },
        courseLink(courseId) {
            console.log('courseLink');
            return coursePath.replace(':id', courseId);
        },
        teacherLink(teacherId) {
            return teacherPath.replace(':id', teacherId);
        },
        enroll() {
            // In development
        },
        async addCourse() {
            if (!this.newCourse.name || !this.newCourse.password) {
                this.user.showToast(Toasts.Error, 'Поля "Название курса" и "Пароль курса" обязательны');
                return;
            }

            try {
                await axios.post(`${API.coursesAPI}/`, {
                    course_name: this.newCourse.name,
                    description: this.newCourse.description,
                    status: true,
                    course_password: this.newCourse.password,
                    teacher_profile: this.user.id
                });

                this.$router.go();
                this.user.showToast(Toasts.Success, 'Курс добавлен');
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка добавления курса:\n${error}`);
            }
        }
    },
    created() {
        this.legend = this.getLegend();
        this.loadCourses();
    }
};
</script>

<template>
    <Fieldset :legend="legend">
        <div class="flexColumn">

            <div class="flexColumn" v-for="(course, courseIndex) in courses">
                <Card>
                    <template #title>
                        <router-link :to="courseLink(course.id)">{{ course.course_name }}</router-link>
                    </template>

                    <template #subtitle v-if="user.isStudent">
                        <router-link :to="teacherLink(course.teacher_profile)">{{
                                course.teacherShortName
                            }}
                        </router-link>
                    </template>

                    <template #content>
                        {{ course.description }}
                    </template>

                    <template #footer v-if="user.isStudent && pageUserRole === UserRoles.Teacher">
                        <InputGroup v-if="user.hasCourse(course.id)">
                            <Button class="pi pi-check" disabled/>
                            <InputText placeholder="Вы уже зачислены на этот курс" disabled/>
                        </InputGroup>
                        <InputGroup v-if="!user.hasCourse(course.id)">
                            <Button class="pi pi-user-plus" @click="enroll"/>
                            <InputText placeholder="Пароль" v-model="course.enteredPassword"/>
                        </InputGroup>
                    </template>
                </Card>
                <Divider v-if="courseIndex < courses.length - 1"/>
            </div>

            <div class="flexColumn alignCenter alignSelfCenter" v-if="user.role === UserRoles.Teacher">
                <Button
                    @click="newCourse.formVisible = !newCourse.formVisible"
                    class="alignSelfStart"
                >Новый курс</Button>

                <Panel header="Новый курс" v-if="newCourse.formVisible">
                    <div class="flexColumn align-items-start">
                        <InputText v-model="newCourse.name" placeholder="Название курса"/>
                        <Textarea v-model="newCourse.description" rows="10" cols="100" placeholder="Описание курса"/>
                        <InputText v-model="newCourse.password" placeholder="Пароль курса"/>

                        <Button class="alignSelfCenter" @click="addCourse">Добавить</Button>
                    </div>
                </Panel>
            </div>

        </div>
    </Fieldset>
</template>

<style scoped>
.p-fieldset {
    min-width: 60vw;
    max-width: 80vw;
}
</style>