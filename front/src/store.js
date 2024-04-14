import { defineStore } from 'pinia';
import {
    ref,
    computed
} from 'vue';

import {
    studentPath,
    teacherPath
} from '#router';


const storeName = 'user';
export const UserRoles = {
    Guest: 0,
    Student: 1,
    Teacher: 2
};


export default defineStore(storeName, () => {
    const id = ref(1);
    const role = ref(UserRoles.Student);

    const surname = ref('__surname__');
    const name = ref('__name__');
    const father_name = ref('__fatherName__');

    const faculty = ref('__faculty__');
    const group = ref('__group__');

    const avatar = ref('__avatarPath__');

    const fullName = computed(() => {
        let storeFatherName = father_name.value;
        if (storeFatherName === null) {
            storeFatherName = '';
        }
        return `${surname.value} ${name.value} ${storeFatherName}`;
    });

    const profileLink = computed(() => {
        return role.value === UserRoles.Student ? studentPath : teacherPath.replace(':id', id.value);
    });

    const nameFirstLetter = computed(() => {
        return name.value.slice(0, 1);
    });

    return {
        id,
        role,
        surname,
        name,
        father_name,
        faculty,
        group,
        avatar,
        fullName,
        profileLink,
        nameFirstLetter
    };
});