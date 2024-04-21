import {
    Ref,
    ref,
    computed
} from 'vue';

import {defineStore} from 'pinia';
import {buildFullName} from '#src/functions';

import {
    studentPath,
    teacherPath
} from '#src/router';

import {Course} from '#src/models';


export enum Role {
    Student,
    Teacher
}


export const useUserStore = defineStore('user', () => {
    const id = ref(1);
    const role = ref(Role.Student);

    const surname = ref('{surname}');
    const name = ref('{name}');
    const fatherName: Ref<string | null> = ref('{father_name}');

    const faculty = ref('{faculty}');
    const group = ref('{group}');

    const avatar: Ref<string | null> = ref('{avatar_path}');

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

    const fullName = computed(() => {
        return buildFullName(surname.value, name.value, fatherName.value);
    });


    const profileLink = computed(() => {
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