<script setup>
import Toast from 'primevue/toast';

import {API} from '#classes/API';

import Header from '#elements/Header'

import {useUserStore} from '#stores/user';
import {useCommonStore} from '#stores/common';


const user = useUserStore();
const common = useCommonStore();


async function loadData() {
    try {
        let data = {};

        switch (user.role) {
            case user.Roles.Student:
                data = await API.student(user.id);
                user.group = data.group;
                break;
            case user.Roles.Teacher:
                data = await API.teacher(user.id);
                break;
        }

        user.surname = data.surname;
        user.name = data.name;
        user.fatherName = data.father_name;

        user.faculty = data.faculty;
        user.avatar = data.avatar;
    } catch (error) {
        common.showError(`Не удалось загрузить Ваши данные:\n${error}`);
    }
}

async function loadCourses() {
    try {
        switch (user.role) {
            case user.Roles.Student:
                user.courses = await API.studentCourses(user.id);

                for (const course of user.courses) {
                    try {
                        const teacher = await API.teacher(course.teacher_profile);
                        course.teacherShortName = common.shortenName(teacher.surname, teacher.name, teacher.father_name);
                    } catch (error) {
                        common.showError(`Не удалось загрузить преподавателя курса "${course.course_name}"`);
                    }
                }

                break;
            case user.Roles.Teacher:
                user.courses = await API.teacherCourses(user.id);
        }
    } catch (error) {
        common.showError(`Не удалось загрузить Ваши курсы:\n${error}`);
    }
}

loadData();
loadCourses();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <router-view/>
        <Toast/>
    </div>
</template>

<style lang="scss">
@import './css/variables';

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.flex {
    display: flex;
    gap: $standardGap;
}

.flexRow {
    @extend .flex;
}

.flexColumn {
    @extend .flex;
    flex-direction: column;
}


$alignments: (
    Start: flex-start,
    End: flex-end,
    Center: center,
    Stretch: stretch
);

@each $alignmentName, $alignment in $alignments {
    .justify#{$alignmentName} {
        justify-content: $alignment;
    }

    .align#{$alignmentName} {
        align-items: $alignment;
    }

    .alignSelf#{$alignmentName} {
        align-self: $alignment;
    }
}


.sub {
    margin-left: $subMargin;
}

a {
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>