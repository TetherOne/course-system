import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: 2,
            role: 'teacher',
            info: {},
            courses: []
        }
    },
    getters: {
        fullName: (state) => {
            return `${state.info.surname} ${state.info.name} ${state.info.father_name}`;
        },
        profileLink: (state) => {
            return state.role === 'student' ? '/student' : `/teacher/${state.id}`;
        }
    }
});