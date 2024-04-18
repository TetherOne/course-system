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
    <div class="flexColumn alignCenter">
        <Header/>
        <router-view/>
        <Toast/>
    </div>
</template>

<style lang="sass">
$standardGap: 10px
$subMargin: 24px


body
    margin: 0
    padding: 0
    box-sizing: border-box


.flex
    display: flex
    gap: $standardGap

.flexRow
    @extend .flex

.flexColumn
    @extend .flex
    flex-direction: column


@mixin justify($type)
    justify-content: $type

.justifyStart
    @include justify(flex-start)

.justifyEnd
    @include justify(flex-end)

.justifyCenter
    @include justify(center)


@mixin align($type)
    align-items: $type

.alignStart
    @include align(flex-start)

.alignEnd
    @include align(flex-end)

.alignCenter
    @include align(center)


@mixin alignSelf($type)
    align-self: $type

.alignSelfStart
    @include alignSelf(flex-start)

.alignSelfEnd
    @include alignSelf(flex-end)

.alignSelfStretch
    @include alignSelf(stretch)

.alignSelfCenter
    @include alignSelf(center)


.sub
    margin-left: $subMargin

a
    color: inherit
    text-decoration: none

    &:hover
        text-decoration: underline
</style>