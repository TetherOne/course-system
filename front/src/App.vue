<script>
import Header from '#elements/Header';
import { useUserStore } from '#store';
import { API } from '#classes/api';

import Toast from 'primevue/toast';


export const UserRoles = {
    Guest: 0,
    Student: 1,
    Teacher: 2
};

export const Toasts = {
    Success: 'success',
    Info: 'info',
    Warn: 'warn',
    Error: 'error'
};

export default {
    name: 'App',
    components: {
        Header,
        Toast
    },
    setup() {
        const user = useUserStore();

        return {
            user
        };
    },
    created() {
        this.loadUserData();
        this.loadUserCourses();
    },
    methods: {
        async loadUserData() {
            let data = {};
            const id = this.user.id;

            try {
                if (this.user.isStudent) {
                    data = await API.student(id);
                    this.user.group = data.group;
                } else if (this.user.isTeacher) {
                    data = await API.teacher(id);
                }

                this.user.surname = data.surname;
                this.user.name = data.name;
                this.user.fatherName = data.father_name === null ? '' : data.father_name;
                this.user.faculty = data.faculty;
                this.user.avatar = data.avatar;
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки данных:\n${error}`);
            }
        },
        async loadUserCourses() {
            try {
                switch (this.user.role) {
                    case UserRoles.Student:
                        this.user.courses = await API.studentCourses(this.user.id);
                        break;
                    case UserRoles.Teacher:
                        this.user.courses = await API.teacherCourses(this.user.id);
                        break;
                }
            } catch (error) {
                this.user.showToast(Toasts.Error, `Ошибка загрузки ваших курсов:\n${error}`);
            }
        }
    }
};
</script>

<template>
    <div class="flex-column align-items-center">
        <Header/>
        <router-view/>
        <Toast/>
    </div>
</template>

<style scoped>

</style>