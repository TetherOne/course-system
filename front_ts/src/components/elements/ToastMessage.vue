<script setup lang="ts">
import Toast from 'primevue/toast';
import {useToast} from 'primevue/usetoast';


enum Severity {
    Success = 'success',
    Info = 'info',
    Warn = 'warn',
    Error = 'error'
}


const toast = useToast();


function show(type: Severity, title: string, message: string) {
    toast.add({
        severity: type,
        summary: title,
        detail: message,
        life: 10_000
    });
}

function showSuccess(message: string, title = 'Успех') {
    show(Severity.Success, title, message);
}

function showInfo(message: string, title = 'Информация') {
    show(Severity.Info, title, message);
}

function showWarn(message: string, title = 'Предупреждение') {
    show(Severity.Warn, title, message);
}

function showError(message: string, title = 'Ошибка') {
    show(Severity.Error, title, message);
}


defineExpose({
    showSuccess,
    showInfo,
    showWarn,
    showError
});
</script>

<template>
    <Toast/>
</template>