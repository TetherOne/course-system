import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: 0,
            role: 'student',
            surname: '__surname__',
            name: '__name__',
            fatherName: '__fatherName__',
            faculty: '__faculty__',
            group: '__group__'
        }
    }
});