import {
    Ref,
    ComputedRef,
    ref,
    computed,
} from 'vue';

import {
    defineStore
} from 'pinia';

import { Role } from '#enums';

import {
    CurrentUser,
    Student,
    Teacher
} from '#types';

import { buildFullName } from '#functions';

import { authApp } from '#requests';



const name: string = 'user';

const useUserStore = defineStore(name, () => {
    const id: Ref<number> = ref(0);
    const role: Ref<Role> = ref(Role.Guest);

    const login: Ref<string> = ref('');
    const email: Ref<string> = ref('');

    const surname: Ref<string | null> = ref('');
    const name: Ref<string | null> = ref('');
    const fatherName: Ref<string | null> = ref('');

    const faculty: Ref<string | null> = ref('');
    const group: Ref<string | null> = ref('');

    const avatar: Ref<string | null> = ref('');

    const isStudent: ComputedRef<boolean> = computed((): boolean => role.value === Role.Student);
    const isTeacher: ComputedRef<boolean> = computed((): boolean => role.value === Role.Teacher);

    const fullName: ComputedRef<string> = computed((): string => {
        if (surname.value && name.value)
            return buildFullName({
                surname: surname.value,
                name: name.value,
                father_name: fatherName.value
            } as Student);
        else
            return login.value;
    });

    async function loadData(): Promise<void> {
        const dataAsUser: CurrentUser = await authApp.currentUser();
        const data: Student | Teacher = dataAsUser.user_profile;

        id.value = data.id;
        role.value = data.is_teacher ? Role.Teacher : Role.Student;
        login.value = dataAsUser.username;
        email.value = dataAsUser.email;
        surname.value = data.surname ?? '';
        name.value = data.name ?? '';
        fatherName.value = data.father_name;
        faculty.value = data.faculty ?? '';
        group.value = 'group' in data ? data.group ?? '' : '';
        avatar.value = data.avatar;
    }

    return {
        id,
        role,
        login,
        email,
        surname,
        name,
        fatherName,
        faculty,
        group,
        avatar,
        isStudent,
        isTeacher,
        fullName,
        loadData
    };
});



export default useUserStore;