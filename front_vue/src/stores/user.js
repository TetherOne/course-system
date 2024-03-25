import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: 1,
            role: 'student',
            info: {}
        }
    }
});