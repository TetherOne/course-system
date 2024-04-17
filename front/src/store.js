import { defineStore } from 'pinia';
import { UserRoles } from '#app';
import { useToast } from 'primevue/usetoast';


const storeName = 'user';

export const useUserStore = defineStore(storeName, {
    state: () => {
        return {
            id: 1,
            role: UserRoles.Teacher,

            surname: '_surname_',
            name: '_name_',
            fatherName: '_fatherName_',

            faculty: '_faculty_',
            group: '_group_',

            avatar: '_avatarPath_',
            courses: [],
            toast: useToast()
        };
    },
    getters: {
        isGuest: (state) => state.role === UserRoles.Guest,
        isStudent: (state) => state.role === UserRoles.Student,
        isTeacher: (state) => state.role === UserRoles.Teacher,

        nameFirstLetter: (state) => state.name.slice(0, 1),
        fullName: (state) => `${state.surname} ${state.name} ${state.fatherName}`
    },
    actions: {
        showToast(type, message, title = '') {
            this.toast.add({
                severity: type,
                summary: title,
                detail: message,
                life: 10000
            });
        },
        hasCourse(courseId) {
            for (const course of this.courses) {
                if (course.id === courseId) {
                    return true;
                }
            }
            return false;
        }
    }
});