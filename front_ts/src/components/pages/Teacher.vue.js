/* __placeholder__ */
import { ref, computed } from 'vue';
import API from '#src/classes/api';
import { buildFullName } from '#src/functions';
import { useRoute, useRouter } from 'vue-router';
import { Role, useUserStore } from '#store';
import Avatar from 'primevue/avatar';
import CoursesList from '#elements/CoursesList';
import { forbiddenPath } from '#src/router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const router = useRouter();
const user = useUserStore();
const id = ref(parseInt(route.params.id));
const surname = ref('{surname}');
const name = ref('{name}');
const fatherName = ref('{father_name}');
const faculty = ref('{faculty}');
const avatar = ref('{avatar_path}');
const legend = ref('{legend}');
const fullName = computed(() => {
    return buildFullName(surname.value, name.value, fatherName.value);
});
const nameFirstLetter = computed(() => {
    return name.value.slice(0, 1);
});
const hasAvatar = computed(() => {
    return avatar.value !== null;
});
function handleVisit() {
    if (user.role === Role.Teacher && user.id !== id.value) {
        router.push(forbiddenPath);
    }
}
function setLegend() {
    switch (user.role) {
        case Role.Student:
            legend.value = 'Курсы';
            break;
        case Role.Teacher:
            legend.value = 'Мои курсы';
            break;
    }
}
async function loadTeacher() {
    const teacher = await API.teacher(id.value);
    surname.value = teacher.surname;
    name.value = teacher.name;
    fatherName.value = teacher.father_name;
    faculty.value = teacher.faculty;
    avatar.value = teacher.avatar;
}
function prepare() {
    handleVisit();
    setLegend();
    loadTeacher();
}
prepare();
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
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_components.Avatar;
    __VLS_components.Avatar;
    // @ts-ignore
    [Avatar,];
    __VLS_intrinsicElements.span;
    __VLS_intrinsicElements.span;
    __VLS_components.CoursesList;
    __VLS_components.CoursesList;
    // @ts-ignore
    [CoursesList,];
    {
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("flexColumn alignCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("flexColumn alignCenter"), }));
        if (__VLS_ctx.user.isStudent) {
            {
                const __VLS_5 = __VLS_intrinsicElements["div"];
                const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
                const __VLS_7 = __VLS_6({ ...{}, class: ("flexColumn alignStart"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
                ({}({ ...{}, class: ("flexColumn alignStart"), }));
                {
                    const __VLS_10 = __VLS_intrinsicElements["div"];
                    const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
                    const __VLS_12 = __VLS_11({ ...{}, class: ("flexRow alignCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                    ({}({ ...{}, class: ("flexRow alignCenter"), }));
                    {
                        const __VLS_15 = {}.Avatar;
                        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({ ...{}, image: ((__VLS_ctx.hasAvatar ? __VLS_ctx.avatar : null)), label: ((__VLS_ctx.hasAvatar ? null : __VLS_ctx.nameFirstLetter)), size: ("large"), shape: ("circle"), }));
                        ({}.Avatar);
                        const __VLS_17 = __VLS_16({ ...{}, image: ((__VLS_ctx.hasAvatar ? __VLS_ctx.avatar : null)), label: ((__VLS_ctx.hasAvatar ? null : __VLS_ctx.nameFirstLetter)), size: ("large"), shape: ("circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                        ({}({ ...{}, image: ((__VLS_ctx.hasAvatar ? __VLS_ctx.avatar : null)), label: ((__VLS_ctx.hasAvatar ? null : __VLS_ctx.nameFirstLetter)), size: ("large"), shape: ("circle"), }));
                        const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
                    }
                    {
                        const __VLS_20 = __VLS_intrinsicElements["span"];
                        const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
                        const __VLS_22 = __VLS_21({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                        ({}({ ...{}, }));
                        (__VLS_ctx.fullName);
                        (__VLS_23.slots).default;
                        const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
                    }
                    (__VLS_13.slots).default;
                    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
                }
                {
                    const __VLS_25 = __VLS_intrinsicElements["div"];
                    const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                    const __VLS_27 = __VLS_26({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                    ({}({ ...{}, }));
                    (__VLS_ctx.faculty);
                    (__VLS_28.slots).default;
                    const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
                }
                (__VLS_8.slots).default;
                const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
            }
            // @ts-ignore
            [user, hasAvatar, avatar, hasAvatar, nameFirstLetter, fullName, faculty,];
        }
        {
            const __VLS_30 = {}.CoursesList;
            const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{}, legend: ((__VLS_ctx.legend)), }));
            ({}.CoursesList);
            const __VLS_32 = __VLS_31({ ...{}, legend: ((__VLS_ctx.legend)), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
            ({}({ ...{}, legend: ((__VLS_ctx.legend)), }));
            const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["alignCenter"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["alignStart"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignCenter"];
    }
    var __VLS_slots;
    // @ts-ignore
    [legend,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            Avatar: Avatar,
            CoursesList: CoursesList,
            user: user,
            faculty: faculty,
            avatar: avatar,
            legend: legend,
            fullName: fullName,
            nameFirstLetter: nameFirstLetter,
            hasAvatar: hasAvatar,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
