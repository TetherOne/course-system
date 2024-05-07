<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';



enum Type {
    Success = 'success',
    Error = 'error',
    Warn = 'warn'
}



const toast = useToast();



function showMessage(type: Type, message: string, title: string) {
    toast.add({
        severity: type,
        summary: title,
        detail: message,
        life: 10_000
    });
}

function showSuccess(message: string, title: string = 'Успех') {
    showMessage(Type.Success, message, title);
}

function showError(message: string, title: string = 'Ошибка') {
    showMessage(Type.Error, message, title);
}

function showWarn(message: string, title: string = 'Предупреждение') {
    showMessage(Type.Warn, message, title);
}



defineExpose({
    showSuccess,
    showError,
    showWarn
});
</script>

<template>
    <Toast/>
</template>