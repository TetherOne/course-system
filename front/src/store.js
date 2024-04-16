import { defineStore } from 'pinia';

import { UserRoles } from '#app';


const storeName = 'user';

export const useUserStore = defineStore(storeName, {
    state: () => {
        return {
            id: 1,
            role: UserRoles.Student,

            surname: '_surname_',
            name: '_name_',
            fatherName: '_fatherName_',

            faculty: '_faculty_',
            group: '_group_',

            avatar: '_avatarPath_'
        }
    },
    getters: {
        isGuest: (state) => state.role === UserRoles.Guest,
        isStudent: (state) => state.role === UserRoles.Student,
        isTeacher: (state) => state.role === UserRoles.Teacher,

        nameFirstLetter: (state) => state.name.slice(0, 1),

        fullName: (state) => {
            const fullName = `${state.surname} ${state.name} ${state.fatherName}`;
            return fullName;
        }
    }
});