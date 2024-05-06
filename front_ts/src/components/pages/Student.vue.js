/* __placeholder__ */
import { useUserStore, Role } from '#store';
import { forbiddenPath } from '#src/router';
import { useRouter } from 'vue-router';
import CoursesList from '#elements/CoursesList';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const user = useUserStore();
const router = useRouter();
function handleVisit() {
    switch (user.role) {
        case Role.Teacher:
            router.push(forbiddenPath);
            break;
    }
}
handleVisit();
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
    __VLS_components.CoursesList;
    __VLS_components.CoursesList;
    // @ts-ignore
    [CoursesList,];
    {
        const __VLS_0 = {}.CoursesList;
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, legend: ("Моё обучение"), courses: ((__VLS_ctx.user.courses)), }));
        ({}.CoursesList);
        const __VLS_2 = __VLS_1({ ...{}, legend: ("Моё обучение"), courses: ((__VLS_ctx.user.courses)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, legend: ("Моё обучение"), courses: ((__VLS_ctx.user.courses)), }));
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    // @ts-ignore
    [user,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            CoursesList: CoursesList,
            user: user,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
