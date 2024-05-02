import {
    Ref,
    ComputedRef,
    ref,
    computed
} from 'vue';

import { defineStore } from 'pinia';

import { Course } from '#src/models';

import { buildFullName } from '#src/functions';

import {
    studentPath,
    teacherPath
} from '#src/router';



export enum Role {
    Student,
    Teacher
}


export const useUserStore = defineStore('user', () => {
    const id: Ref<number> = ref(4);
    const role: Ref<Role> = ref(Role.Student);

    const surname: Ref<string> = ref('');
    const name: Ref<string> = ref('');
    const fatherName: Ref<string | null> = ref('');

    const faculty: Ref<string> = ref('');
    const group: Ref<string> = ref('');

    const avatar: Ref<string | null> = ref('');

    const courses: Ref<Course[]> = ref([]);


    const isStudent = computed(() => {
        return role.value === Role.Student;
    });

    const isTeacher = computed(() => {
        return role.value === Role.Teacher;
    });


    const hasAvatar = computed(() => {
        return avatar.value !== null;
    });

    const nameFirstLetter = computed(() => {
        return name.value.slice(0, 1);
    });

    const fullName: ComputedRef<string> = computed(() => {
        return buildFullName(surname.value, name.value, fatherName.value);
    });


    const profileLink: ComputedRef<string> = computed(() => {
        switch (role.value) {
            case Role.Student:
                return studentPath;
            case Role.Teacher:
                return teacherPath.replace(':id', id.value + '');
        }
    });

    return {
        id,
        role,
        surname,
        name,
        fatherName,
        faculty,
        group,
        avatar,
        courses,
        isStudent,
        isTeacher,
        hasAvatar,
        nameFirstLetter,
        fullName,
        profileLink
    };
});