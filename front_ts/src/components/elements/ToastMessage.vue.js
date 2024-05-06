/* __placeholder__ */
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
var Severity;
(function (Severity) {
    Severity["Success"] = "success";
    Severity["Info"] = "info";
    Severity["Warn"] = "warn";
    Severity["Error"] = "error";
})(Severity || (Severity = {}));
const toast = useToast();
function show(type, title, message) {
    toast.add({
        severity: type,
        summary: title,
        detail: message,
        life: 10000
    });
}
function showSuccess(message, title = 'Успех') {
    show(Severity.Success, title, message);
}
function showInfo(message, title = 'Информация') {
    show(Severity.Info, title, message);
}
function showWarn(message, title = 'Предупреждение') {
    show(Severity.Warn, title, message);
}
function showError(message, title = 'Ошибка') {
    show(Severity.Error, title, message);
}
const __VLS_exposed = {
    showSuccess,
    showInfo,
    showWarn,
    showError
};
defineExpose({
    showSuccess,
    showInfo,
    showWarn,
    showError
});
let __VLS_modelEmitsType;
const __VLS_componentsOption = {};
let __VLS_name;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    /* CSS variable injection */
    /* CSS variable injection end */
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_components.Toast;
    __VLS_components.Toast;
    // @ts-ignore
    [Toast,];
    {
        const __VLS_0 = {}.Toast;
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, }));
        ({}.Toast);
        const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, }));
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            Toast: Toast,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
});
