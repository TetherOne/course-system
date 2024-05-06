/* __placeholder__ */
import { ref } from 'vue';
import { coursePath, studentPath, teacherPath } from '#src/router';
import API from '#src/classes/api';
import ToastMessage from '#elements/ToastMessage';
import { shortenName } from '#src/functions';
import { useRoute, useRouter } from 'vue-router';
import { Role, useUserStore } from '#store';
import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const courses = ref([]);
const user = useUserStore();
const props = defineProps();
const router = useRouter();
const route = useRoute();
const toast = ref(ToastMessage);
const newCourse = ref({
    dialogVisible: false,
    name: '',
    description: '',
    password: ''
});
async function loadCourses() {
    try {
        const currentRoute = window.location.pathname;
        if (currentRoute.includes(studentPath)) {
            courses.value = await API.studentCourses(user.id);
            for (const course of courses.value) {
                try {
                    course.teacher = await API.teacher(course.teacher_profile);
                    course.teacherShortName = getTeacherShortName(course.teacher);
                    course.teacherLink = getTeacherLink(course.teacher_profile);
                    course.enterPasswordVisible = false;
                }
                catch (error) {
                    toast.value.showWarn(`Не удалось загрузить преподавателя курса ${course.course_name}.\n${error}`);
                }
            }
        }
        else if (currentRoute.includes(teacherPath.slice(1, teacherPath.lastIndexOf('/')))) {
            courses.value = await API.teacherCourses(route.params.id);
        }
        for (const course of courses.value) {
            course.link = getCourseLink(course.id);
        }
    }
    catch (error) {
        toast.value.showError(`Не удалось загрузить курсы:\n${error}`);
    }
}
function getTeacherShortName(instance) {
    return shortenName(instance.surname, instance.name, instance.father_name);
}
function getCourseLink(id) {
    return coursePath.replace(':id', id + '');
}
function getTeacherLink(id) {
    return teacherPath.replace(':id', id + '');
}
async function addCourse() {
    if (newCourse.value.name === '' || newCourse.value.password === '') {
        toast.value.showWarn('Поля "Название" и "Пароль" обязательны', 'Не хватает информации');
        return;
    }
    try {
        await API.addCourse(newCourse.value.name, newCourse.value.description, newCourse.value.password, user.id);
        router.go();
    }
    catch (error) {
        toast.value.showError(`Не удалось добавить курс:\n${error}`);
    }
}
loadCourses();
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
    __VLS_components.Fieldset;
    __VLS_components.Fieldset;
    __VLS_components.Fieldset;
    __VLS_components.Fieldset;
    // @ts-ignore
    [Fieldset, Fieldset,];
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    // @ts-ignore
    [Button, Button, Button, Button, Button,];
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    // @ts-ignore
    [Card, Card,];
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink, RouterLink, RouterLink,];
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    // @ts-ignore
    [Dialog, Dialog,];
    __VLS_components.InputText;
    __VLS_components.InputText;
    __VLS_components.InputText;
    __VLS_components.InputText;
    // @ts-ignore
    [InputText, InputText,];
    __VLS_components.Textarea;
    __VLS_components.Textarea;
    // @ts-ignore
    [Textarea,];
    __VLS_components.ToastMessage;
    __VLS_components.ToastMessage;
    // @ts-ignore
    [ToastMessage,];
    {
        const __VLS_0 = {}.Fieldset;
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, }));
        ({}.Fieldset);
        ({}.Fieldset);
        const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, }));
        {
            const __VLS_5 = __VLS_intrinsicElements["template"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, }));
            {
                (__VLS_3.slots).legend;
                {
                    const __VLS_9 = __VLS_intrinsicElements["div"];
                    const __VLS_10 = __VLS_elementAsFunctionalComponent(__VLS_9);
                    const __VLS_11 = __VLS_10({ ...{}, class: ("flexRow alignCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_10));
                    ({}({ ...{}, class: ("flexRow alignCenter"), }));
                    {
                        const __VLS_14 = __VLS_intrinsicElements["div"];
                        const __VLS_15 = __VLS_elementAsFunctionalComponent(__VLS_14);
                        const __VLS_16 = __VLS_15({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_15));
                        ({}({ ...{}, }));
                        (__VLS_ctx.legend);
                        (__VLS_17.slots).default;
                        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
                    }
                    if (__VLS_ctx.user.isTeacher) {
                        {
                            const __VLS_19 = {}.Button;
                            const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ ...{ 'onClick': {}, }, icon: ("pi pi-plus"), id: ("addCourseBtn"), }));
                            ({}.Button);
                            const __VLS_21 = __VLS_20({ ...{ 'onClick': {}, }, icon: ("pi pi-plus"), id: ("addCourseBtn"), }, ...__VLS_functionalComponentArgsRest(__VLS_20));
                            ({}({ ...{ 'onClick': {}, }, icon: ("pi pi-plus"), id: ("addCourseBtn"), }));
                            __VLS_directiveFunction(__VLS_ctx.vTooltip)(('Добавить курс'));
                            let __VLS_24 = { 'click': __VLS_pickEvent(__VLS_23['click'], {}.onClick) };
                            __VLS_24 = { click: $event => {
                                    if (!((__VLS_ctx.user.isTeacher)))
                                        return;
                                    __VLS_ctx.newCourse.dialogVisible = true;
                                    // @ts-ignore
                                    [legend, user, newCourse,];
                                }
                            };
                            const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
                            let __VLS_23;
                        }
                    }
                    (__VLS_12.slots).default;
                    const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_9, __VLS_11);
                }
            }
        }
        {
            const __VLS_25 = __VLS_intrinsicElements["div"];
            const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
            const __VLS_27 = __VLS_26({ ...{}, class: ("flexRow justifyCenter courseCards"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
            ({}({ ...{}, class: ("flexRow justifyCenter courseCards"), }));
            for (const [course] of __VLS_getVForSourceType((__VLS_ctx.courses))) {
                {
                    const __VLS_30 = {}.Card;
                    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{}, }));
                    ({}.Card);
                    ({}.Card);
                    const __VLS_32 = __VLS_31({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                    ({}({ ...{}, }));
                    {
                        const __VLS_35 = __VLS_intrinsicElements["template"];
                        const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
                        const __VLS_37 = __VLS_36({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                        ({}({ ...{}, }));
                        {
                            (__VLS_33.slots).title;
                            {
                                const __VLS_39 = {}.RouterLink;
                                const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({ ...{}, to: ((course.link)), }));
                                ({}.RouterLink);
                                ({}.RouterLink);
                                const __VLS_41 = __VLS_40({ ...{}, to: ((course.link)), }, ...__VLS_functionalComponentArgsRest(__VLS_40));
                                ({}({ ...{}, to: ((course.link)), }));
                                (course.course_name);
                                (__VLS_42.slots).default;
                                const __VLS_42 = __VLS_pickFunctionalComponentCtx(__VLS_39, __VLS_41);
                            }
                            // @ts-ignore
                            [courses,];
                        }
                    }
                    if (__VLS_ctx.user.role === __VLS_ctx.Role.Student) {
                        {
                            const __VLS_44 = __VLS_intrinsicElements["template"];
                            const __VLS_45 = __VLS_elementAsFunctionalComponent(__VLS_44);
                            const __VLS_46 = __VLS_45({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_45));
                            ({}({ ...{}, }));
                            {
                                (__VLS_33.slots).subtitle;
                                {
                                    const __VLS_48 = {}.RouterLink;
                                    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{}, to: ((course.teacherLink)), }));
                                    ({}.RouterLink);
                                    ({}.RouterLink);
                                    const __VLS_50 = __VLS_49({ ...{}, to: ((course.teacherLink)), }, ...__VLS_functionalComponentArgsRest(__VLS_49));
                                    ({}({ ...{}, to: ((course.teacherLink)), }));
                                    (course.teacherShortName);
                                    (__VLS_51.slots).default;
                                    const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
                                }
                                // @ts-ignore
                                [user, Role,];
                            }
                        }
                    }
                    {
                        const __VLS_53 = __VLS_intrinsicElements["template"];
                        const __VLS_54 = __VLS_elementAsFunctionalComponent(__VLS_53);
                        const __VLS_55 = __VLS_54({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_54));
                        ({}({ ...{}, }));
                        {
                            (__VLS_33.slots).content;
                            (course.description);
                        }
                    }
                    const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
                }
            }
            (__VLS_28.slots).default;
            const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
        }
        if (__VLS_ctx.courses.length === 0) {
            {
                const __VLS_57 = __VLS_intrinsicElements["div"];
                const __VLS_58 = __VLS_elementAsFunctionalComponent(__VLS_57);
                const __VLS_59 = __VLS_58({ ...{}, class: ("alignSelfCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_58));
                ({}({ ...{}, class: ("alignSelfCenter"), }));
                (__VLS_60.slots).default;
                const __VLS_60 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59);
            }
            // @ts-ignore
            [courses,];
        }
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    {
        const __VLS_62 = {}.Dialog;
        const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ ...{}, visible: ((__VLS_ctx.newCourse.dialogVisible)), style: (({ width: '20vw' })), modal: (true), header: ("Новый курс"), }));
        ({}.Dialog);
        ({}.Dialog);
        const __VLS_64 = __VLS_63({ ...{}, visible: ((__VLS_ctx.newCourse.dialogVisible)), style: (({ width: '20vw' })), modal: (true), header: ("Новый курс"), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
        ({}({ ...{}, visible: ((__VLS_ctx.newCourse.dialogVisible)), style: (({ width: '20vw' })), modal: (true), header: ("Новый курс"), }));
        {
            const __VLS_67 = __VLS_intrinsicElements["div"];
            const __VLS_68 = __VLS_elementAsFunctionalComponent(__VLS_67);
            const __VLS_69 = __VLS_68({ ...{}, class: ("flexColumn alignStart"), }, ...__VLS_functionalComponentArgsRest(__VLS_68));
            ({}({ ...{}, class: ("flexColumn alignStart"), }));
            {
                const __VLS_72 = {}.InputText;
                const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({ ...{}, placeholder: ("Название курса"), modelValue: ((__VLS_ctx.newCourse.name)), }));
                ({}.InputText);
                const __VLS_74 = __VLS_73({ ...{}, placeholder: ("Название курса"), modelValue: ((__VLS_ctx.newCourse.name)), }, ...__VLS_functionalComponentArgsRest(__VLS_73));
                ({}({ ...{}, placeholder: ("Название курса"), modelValue: ((__VLS_ctx.newCourse.name)), }));
                const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
            }
            {
                const __VLS_77 = {}.Textarea;
                const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({ ...{}, placeholder: ("Описание курса"), modelValue: ((__VLS_ctx.newCourse.description)), rows: ("5"), cols: ("30"), autoResize: (true), }));
                ({}.Textarea);
                const __VLS_79 = __VLS_78({ ...{}, placeholder: ("Описание курса"), modelValue: ((__VLS_ctx.newCourse.description)), rows: ("5"), cols: ("30"), autoResize: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_78));
                ({}({ ...{}, placeholder: ("Описание курса"), modelValue: ((__VLS_ctx.newCourse.description)), rows: ("5"), cols: ("30"), autoResize: (true), }));
                const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_77, __VLS_79);
            }
            {
                const __VLS_82 = {}.InputText;
                const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ ...{}, placeholder: ("Пароль курса"), modelValue: ((__VLS_ctx.newCourse.password)), }));
                ({}.InputText);
                const __VLS_84 = __VLS_83({ ...{}, placeholder: ("Пароль курса"), modelValue: ((__VLS_ctx.newCourse.password)), }, ...__VLS_functionalComponentArgsRest(__VLS_83));
                ({}({ ...{}, placeholder: ("Пароль курса"), modelValue: ((__VLS_ctx.newCourse.password)), }));
                const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84);
            }
            {
                const __VLS_87 = __VLS_intrinsicElements["div"];
                const __VLS_88 = __VLS_elementAsFunctionalComponent(__VLS_87);
                const __VLS_89 = __VLS_88({ ...{}, class: ("flexRow alignSelfEnd"), }, ...__VLS_functionalComponentArgsRest(__VLS_88));
                ({}({ ...{}, class: ("flexRow alignSelfEnd"), }));
                {
                    const __VLS_92 = {}.Button;
                    const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_94 = __VLS_93({ ...{ 'onClick': {}, }, severity: ("danger"), }, ...__VLS_functionalComponentArgsRest(__VLS_93));
                    ({}({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    let __VLS_97 = { 'click': __VLS_pickEvent(__VLS_96['click'], {}.onClick) };
                    __VLS_97 = { click: $event => {
                            __VLS_ctx.newCourse.dialogVisible = false;
                            // @ts-ignore
                            [newCourse, newCourse, newCourse, newCourse, newCourse,];
                        }
                    };
                    (__VLS_95.slots).default;
                    const __VLS_95 = __VLS_pickFunctionalComponentCtx(__VLS_92, __VLS_94);
                    let __VLS_96;
                }
                {
                    const __VLS_98 = {}.Button;
                    const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({ ...{ 'onClick': {}, }, }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_100 = __VLS_99({ ...{ 'onClick': {}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_99));
                    ({}({ ...{ 'onClick': {}, }, }));
                    let __VLS_103 = { 'click': __VLS_pickEvent(__VLS_102['click'], {}.onClick) };
                    __VLS_103 = { click: (__VLS_ctx.addCourse) };
                    (__VLS_101.slots).default;
                    const __VLS_101 = __VLS_pickFunctionalComponentCtx(__VLS_98, __VLS_100);
                    let __VLS_102;
                }
                (__VLS_90.slots).default;
                const __VLS_90 = __VLS_pickFunctionalComponentCtx(__VLS_87, __VLS_89);
            }
            (__VLS_70.slots).default;
            const __VLS_70 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69);
        }
        (__VLS_65.slots).default;
        const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
    }
    {
        const __VLS_104 = {}.ToastMessage;
        const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({ ...{}, ref: ("toast"), }));
        ({}.ToastMessage);
        const __VLS_106 = __VLS_105({ ...{}, ref: ("toast"), }, ...__VLS_functionalComponentArgsRest(__VLS_105));
        ({}({ ...{}, ref: ("toast"), }));
        // @ts-ignore
        (__VLS_ctx.toast);
        const __VLS_107 = __VLS_pickFunctionalComponentCtx(__VLS_104, __VLS_106);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignCenter"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["justifyCenter"];
        __VLS_styleScopedClasses["courseCards"];
        __VLS_styleScopedClasses["alignSelfCenter"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["alignStart"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignSelfEnd"];
    }
    var __VLS_slots;
    // @ts-ignore
    [addCourse, toast,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            ToastMessage: ToastMessage,
            Role: Role,
            Fieldset: Fieldset,
            Card: Card,
            Button: Button,
            Dialog: Dialog,
            InputText: InputText,
            Textarea: Textarea,
            courses: courses,
            user: user,
            toast: toast,
            newCourse: newCourse,
            addCourse: addCourse,
        };
    },
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {},
});
