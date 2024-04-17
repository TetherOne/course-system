<script>
import { API } from '#classes/api';
import { useUserStore } from '#store';

import {
    teacherPath,
    lessonPath,
    checkpointPath
} from '#router';

import {
    Toasts,
    UserRoles
} from '#app';

import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';


export default {
    name: 'Course',
    components: {
        Fieldset,
        Card,
        Divider,
        Button,
        Panel,
        InputText,
        Textarea,
        Dialog
    },
    data() {
        return {
            id: parseInt(this.$route.params.id),
            name: '_courseName_',
            description: '_courseDescription_',
            teacherId: 0,
            teacherLink: '',
            teacherName: '_teacherName_',
            modules: [],

            newModule: {
                formVisible: false,
                name: ''
            }
        }
    },
    setup() {
        const user = useUserStore();

        return {
            user,
            UserRoles
        };
    },
    methods: {
        async loadData() {
            try {
                const course = await API.course(this.id);

                this.name = course.course_name;
                this.description = course.description;
                this.teacherId = course.teacher_profile;
                this.teacherLink = teacherPath.replace(':id', this.teacherId);

                try {
                    this.modules = await API.courseModules(this.id);

                    for (const module of this.modules) {
                        module.lessons = await this.getModuleLessons(module.id);console.log(module.lessons)
                    }

                } catch (error) {
                    this.user.showToast(Toasts.Error, `Ошибка загрузки модулей:\n${error}`);
                }

                if (this.user.role === UserRoles.Student) {
                    try {
                        const teacher = await API.teacher(this.teacherId);

                        if (teacher.father_name === null) {
                            teacher.father_name = '';
                        }

                        this.teacherName = `${teacher.surname} ${teacher.name} ${teacher.father_name}`;
                    } catch (error) {
                        this.user.showToast(Toasts.Error, `Ошибка загрузки данных преподавателя:\n${error}`);
                    }
                }
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки данных курса:\n${error}`);
            }
        },
        async getModuleLessons(moduleId) {
            try {
                const lessons = await API.moduleLessons(moduleId);
                return lessons;
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки уроков модуля ${moduleId}:\n${error}`);
            }
        },
        async loadModulesCheckpoints() {
            for (const module of this.modules) {
                try {
                    module.checkpoints = await API.moduleCheckpoints(module.id);
                } catch (error) {
                    this.user.showToast(Toasts.Error, `Ошибка загрузки контрольных точек модуля ${module.id}:\n${error}`);
                }
            }
        },
        lessonLink(lessonId) {
            return lessonPath.replace(':id', lessonId);
        },
        checkpointLink(checkpointId) {
            return checkpointPath.replace(':id', checkpointId);
        },
        async addModule() {
            if (this.newModule.name === '') {
                this.user.showToast(Toasts.Error, 'Поле "Название модуля" обязательно для заполнения');
                return;
            }

            try {
                await API.addModule(this.newModule.name, this.id);
                this.$router.go();
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка добавления модуля:${error}`);            }
        },
        async addLesson(moduleId) {
            const module = this.modules.filter(module => module.id === moduleId)[0];

            if (module.newLesson.name === '') {
                this.user.showToast(Toasts.Error, 'Поле "Название урока" обязательно для заполнения"');
                return;
            }

            try {
                await API.addLesson(moduleId, module.newLesson.name, module.newLesson.description);
                this.$router.go();
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка добавления урока:\n${error}`);
            }
        }
    },
    async created() {
        await this.loadData();
        await this.loadModulesCheckpoints();

        for (const module of this.modules) {
            module.newLesson = {
                formVisible: false,
                name: '',
                description: ''
            };
            module.newCheckpoint = {
                formVisible: false,
                name: ''
            }
        }
    }
};
</script>

<template>
    <Fieldset :legend="name">
        <div class="flex-column">
            <router-link v-if="user.role === UserRoles.Student" :to="teacherLink">
                <small>
                    Преподаватель: {{ teacherName }}
                </small>
            </router-link>

            <div class="flex-column" v-for="(module, moduleIndex) in modules">
                <Card>
                    <template #title>
                        Модуль {{ moduleIndex + 1 }}. {{ module.module_name }}
                    </template>

                    <template #content>
                        <div class="flex-column">
                            <router-link v-for="(lesson, lessonIndex) in module.lessons" :to="lessonLink(lesson.id)">
                                Урок {{ lessonIndex + 1 }}. {{ lesson.lesson_name }}
                            </router-link>
                        </div>
                        <div v-if="module.lessons !== undefined && !module.lessons.length">
                            Пока нет уроков
                        </div>

                        <Divider/>

                        <div class="flex-column align-items-center align-self-center" v-if="user.role === UserRoles.Teacher && module.newLesson">
                            <Button
                                @click="module.newLesson.formVisible = true"
                                class="align-self-start"
                            >Новый урок</Button>

                            <Dialog v-model:visible="module.newLesson.formVisible" modal header="Добавить урок">
                                <div class="flex-column">
                                    <div class="flex-row align-items-center">
                                        <label for="lessonName">Название урока</label>
                                        <InputText id="lessonName" v-model="module.newLesson.name"/>
                                    </div>
                                    <div class="flex-column">
                                        <label for="description">Описание</label>
                                        <Textarea id="description" v-model="module.newLesson.description"/>
                                    </div>
                                    <div class="flex-row justify-end">
                                        <Button @click="module.newLesson.formVisible = false" label="Отмена"/>
                                        <Button @click="addLesson(module.id)" label="Сохранить"/>
                                    </div>
                                </div>
                            </Dialog>
                        </div>

                        <Divider/>

                        <div class="flex-column">
                            <router-link v-for="(checkpoint, checkpointId) in module.checkpoints" :to="checkpointLink(checkpoint.id)">
                                КТ {{ checkpointId + 1 }}. {{ checkpoint.title }}
                            </router-link>
                        </div>

                        <div v-if="module.checkpoints !== undefined && !module.checkpoints.length">
                            Пока нет контрольных точек
                        </div>
                    </template>
                </Card>
                <Divider v-if="moduleIndex < modules.length - 1"/>
            </div>
        </div>

        <Divider/>

        <div class="flex-column align-items-center align-self-center" v-if="user.role === UserRoles.Teacher">
            <Button
                @click="newModule.formVisible = !newModule.formVisible"
                class="align-self-start"
            >Новый модуль</Button>

            <Panel header="Новый курс" v-if="newModule.formVisible">
                <div class="flex-column align-items-start">
                    <InputText v-model="newModule.name" placeholder="Название модуля"/>

                    <Button class="align-self-center" @click="addModule">Добавить</Button>
                </div>
            </Panel>
        </div>
    </Fieldset>
</template>

<style scoped>

</style>