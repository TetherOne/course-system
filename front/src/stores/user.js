import {
    defineStore
} from 'pinia';

import {
    studentLink,
    teacherLink
} from '../router.js';


const userStoreName = 'user';

const standardUserId = 1;

export const guestRole = 0;
export const studentRole = 1;
export const teacherRole = 2;

export const useUserStore = defineStore(userStoreName, {
    state: () => {
        return {
            id: standardUserId,
            role: studentRole,
            surname: '',
            name: '',
            fatherName: '',
            group: '',
            faculty: '',
            avatar: '',
            courses: []
        }
    },
    getters: {
        fullName: (state) => {
            return `${state.surname} ${state.name} ${state.fatherName}`;
        },
        profileLink: (state) => {
            return state.role === studentRole ? studentLink : `${teacherLink}/${state.id}`;
        }
    }
});