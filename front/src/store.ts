import { defineStore } from 'pinia';

import {
    computed,
    ComputedRef,
    Ref,
    ref
} from 'vue';

import { Role } from '#enums';

import {
    CurrentUser,
    Student,
    Teacher
} from '#types';

import { getCurrentUser } from '#requests';



const name: string = 'user';

const useUserStore = defineStore(name, () => {
    const id: Ref<number> = ref(0);
    const role: Ref<Role> = ref(Role.Guest);

    const surname: Ref<string> = ref('');
    const name: Ref<string> = ref('');
    const fatherName: Ref<string | null> = ref('');

    const faculty: Ref<string> = ref('');
    const group: Ref<string | undefined> = ref('');

    const avatar: Ref<string | null> = ref('');

    const profileLink: Ref<string> = computed((): string => {
        switch (role.value) {
            case Role.Student:
                return '/student';
            case Role.Teacher:
                return `/teacher/${id.value}`;
            default:
                return '';
        }
    });

    const hasAvatar: ComputedRef<boolean> = computed((): boolean => {
        return !!avatar.value;
    });

    const firstLetterOfName: ComputedRef<string> = computed((): string => {
        return name.value.slice(0, 1);
    });

    const fullName: ComputedRef<string> = computed((): string => {
        const fatherName_: string = fatherName.value ?? '';
        return `${surname.value} ${name.value} ${fatherName_}`;
    });

    const isStudent: ComputedRef<boolean> = computed((): boolean => {
        return role.value === Role.Student;
    });

    const isTeacher: ComputedRef<boolean> = computed((): boolean => {
        return role.value === Role.Teacher;
    });



    async function signedIn(): Promise<boolean> {
        const data: CurrentUser = await getCurrentUser();
        return !!data.id;
    }

    async function loadData(): Promise<void> {
        const data: Student | Teacher = (await getCurrentUser()).user_profile;

        id.value = data.id;
        role.value = data.is_teacher ? Role.Teacher : Role.Student;

        surname.value = data.surname;
        name.value = data.name;
        fatherName.value = data.father_name;

        faculty.value = data.faculty;

        if ('group' in data) {
            group.value = data.group;
        }

        avatar.value = data.avatar;
    }

    async function getId(): Promise<number> {
        return (await getCurrentUser()).user_profile.id;
    }



    return {
        id,
        role,

        surname,
        name,
        fatherName,

        faculty,
        group,

        avatar,

        profileLink,
        hasAvatar,
        firstLetterOfName,
        fullName,

        isStudent,
        isTeacher,

        signedIn,
        loadData,
        getId
    };
});



export default useUserStore;