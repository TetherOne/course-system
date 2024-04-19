import {defineStore} from 'pinia';

import {useToast} from 'primevue/usetoast';

import {ref} from 'vue';


export const useCommonStore = defineStore('common', () => {
    const Toasts = {
        Success: 'success',
        Info: 'info',
        Warn: 'warn',
        Error: 'error'
    };

    const toast = useToast();

    const Themes = {
        Light: 0,
        Dark: 1
    };

    const currentTheme = ref(Themes.Light);


    function showToast(type, message, title = '') {
        toast.add({
            severity: type,
            detail: message,
            summary: title,
            life: 10_000
        });
    }

    function showError(message) {
        showToast(Toasts.Error, message, 'Ошибка');
    }


    function shortenName(surname, name, fatherName) {
        let result = `${surname} ${name.slice(0, 1)}.`;

        if (fatherName !== null) {
            result = `${result} ${fatherName.slice(0, 1)}.`;
        }

        return result;
    }


    return {
        Toasts,
        toast,
        showToast,
        showError,
        Themes,
        currentTheme,
        shortenName
    };
});