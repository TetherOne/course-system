<script>
import { useUserStore } from '#store';
import { API } from '#classes/api';

import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import Card from 'primevue/card';

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
            courses: []
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
        Card
    },
    setup() {
        const user = useUserStore();

        return {
            user
        };
    },
    methods: {
        getLegend() {
            switch (this.user.role) {
                case UserRoles.Student:
                    return 'Моё обучение';
                case UserRoles.Teacher:
                    switch (this.pageUserRole) {
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
                switch (this.user.role) {
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
                        break;
                }
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки курсов:\n${error}`);
            }
        }
    },
    computed: {
        courseLink(courseId) {
            return coursePath.replace(':id', courseId);
        },
        teacherLink(teacherId) {
            return teacherPath.replace(':id', teacherId);
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
        <div class="flex-column">

            <div class="flex-column" v-for="course in courses">
                <Card>
                    <template #header>
                        <router-link :to="courseLink(course.id)">{{ course.course_name }}</router-link>
                    </template>

                    <template #subtitle v-if="user.isStudent">
                        <router-link :to="teacherLink(course.teacher_profile)">{{ course.teacherShortName }}</router-link>
                    </template>

                    <template #content>
                        {{ course.description }}
                    </template>
                </Card>
            </div>

        </div>
    </Fieldset>
</template>

<style scoped>
.p-fieldset {
    min-width: 60vw;
}
</style>