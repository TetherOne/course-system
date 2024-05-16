import {
    defineStore
} from 'pinia';

import {
    ref,
    Ref,
    computed,
    ComputedRef
} from 'vue';

import { authApp } from '#requests';

import { Role } from '#enums';

import {
    Student,
    Teacher
} from '#types';

import { buildFullName } from '#functions';



const name: string = 'user';

const useUserStore = defineStore(name, () => {
    const id: Ref<number> = ref(0);
    const role: Ref<Role> = ref(Role.Guest);

    const surname: Ref<string> = ref('');
    const name: Ref<string> = ref('');
    const fatherName: Ref<string | null> = ref('');

    const faculty: Ref<string> = ref('');
    const group: Ref<string> = ref('');

    const avatar: Ref<string | null> = ref('');

    const isStudent: ComputedRef<boolean> = computed((): boolean => role.value === Role.Student);
    const isTeacher: ComputedRef<boolean> = computed((): boolean => role.value === Role.Teacher);

    const fullName: ComputedRef<string> = computed((): string => {
        return buildFullName({
            surname: surname.value,
            name: name.value,
            father_name: fatherName.value
        } as Student);
    });

    async function loadData(): Promise<void> {
        const data: Student | Teacher = (await authApp.currentUser()).user_profile;

        id.value = data.id;
        role.value = data.is_teacher ? Role.Teacher : Role.Student;
        surname.value = data.surname;
        name.value = data.name;
        fatherName.value = data.father_name;
        faculty.value = data.faculty;
        group.value = 'group' in data ? data.group : '';
        avatar.value = data.avatar;
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
        isStudent,
        isTeacher,
        fullName,
        loadData
    };
});



export default useUserStore;