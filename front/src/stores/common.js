import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';


const storeName = 'common';
const toast = useToast();

const Toasts = {
    Success: 'success',
    Info: 'info',
    Warn: 'warn',
    Error: 'error'
};

export const useCommonStore = defineStore(storeName, () => {
    function showError(message, duration = 10_000) {
        showToast(Toasts.Error, message, 'Ошибка', duration);
    }

    return {
        showError
    };
});


function showToast(type, message, title = '', duration = 10_000) {
    const config = {
        severity: type,
        detail: message,
        summary: title,
        life: duration
    };

    toast.add(config);
}