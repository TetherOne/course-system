import {defineStore} from 'pinia';

import {
    ref,
    computed
} from 'vue';

import {
    studentPath,
    teacherPath
} from '#router';


export const useUserStore = defineStore('user', () => {
    const Roles = {
        Guest: 0,
        Student: 1,
        Teacher: 2
    };

    const id = ref(1);
    const role = ref(Roles.Student);

    const surname = ref('{surname}');
    const name = ref('{name}');
    const fatherName = ref('{fatherName}');

    const faculty = ref('{faculty}');
    const group = ref('{group}');

    const avatar = ref('{avatarPath}');
    const courses = ref([]);


    const nameFirstLetter = computed(() => {
        return name.value.slice(0, 1);
    });

    const hasAvatar = computed(() => {
        return avatar.value !== null;
    });

    const profileLink = computed(() => {
        switch (role.value) {
            case Roles.Student:
                return studentPath;
            case Roles.Teacher:
                return teacherPath.replace(':id', id.value);
        }
    });

    const fullName = computed(() => {
        return `${surname.value} ${name.value} ${fatherName.value}`;
    });


    return {
        Roles,
        id,
        role,
        surname,
        name,
        fatherName,
        faculty,
        group,
        avatar,
        courses,
        nameFirstLetter,
        hasAvatar,
        profileLink,
        fullName
    };
});