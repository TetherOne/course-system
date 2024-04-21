<script setup lang="ts">
import {
    Ref,
    ref,
    computed
} from 'vue';

import API from '#src/classes/api';
import {buildFullName} from '#src/functions';

import {
    useRoute,
    useRouter
} from 'vue-router';

import {
    Role,
    useUserStore
} from '#store';

import Avatar from 'primevue/avatar';
import CoursesList from '#elements/CoursesList';

import {
    coursePath,
    forbiddenPath
} from '#src/router';


const route = useRoute();
const router = useRouter();

const user = useUserStore();

const id: Ref<number> = ref(parseInt(<string>route.params.id));

const surname: Ref<string> = ref('{surname}');
const name: Ref<string> = ref('{name}');
const fatherName: Ref<string | null> = ref('{father_name}');

const faculty: Ref<string> = ref('{faculty}');
const avatar: Ref<string | null> = ref('{avatar_path}');

const legend = ref('{legend}');

const fullName = computed(() => {
    return buildFullName(surname.value, name.value, fatherName.value);
});

const nameFirstLetter = computed(() => {
    return name.value.slice(0, 1);
});

const hasAvatar = computed(() => {
    return avatar.value !== null;
});


function handleVisit() {
    if (user.role === Role.Teacher && user.id !== id.value) {
        router.push(forbiddenPath);
    }
}

function setLegend() {
    switch (user.role) {
        case Role.Student:
            legend.value = 'Курсы';
            break;
        case Role.Teacher:
            legend.value = 'Мои курсы';
            break;
    }
}


async function loadTeacher() {
    const teacher = await API.teacher(id.value);

    surname.value = teacher.surname;
    name.value = teacher.name;
    fatherName.value = teacher.father_name;

    faculty.value = teacher.faculty;
    avatar.value = teacher.avatar;
}


function prepare() {
    handleVisit();
    setLegend();
    loadTeacher();
}


prepare();
</script>

<template>
    <div class="flexColumn alignCenter">
        <div v-if="user.isStudent" class="flexColumn alignStart">
            <div class="flexRow alignCenter">
                <Avatar :image="hasAvatar ? avatar : null" :label="hasAvatar ? null : nameFirstLetter"
                        size="large" shape="circle"/>
                <span>{{ fullName }}</span>
            </div>
            <div>Факультет: {{ faculty }}</div>
        </div>
        <CoursesList :legend="legend"/>
    </div>
</template>

<style scoped lang="scss">

</style>