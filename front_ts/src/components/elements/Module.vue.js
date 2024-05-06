/* __placeholder__ */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store';
import API from '#src/classes/api';
import { lessonPath, checkpointPath } from '#src/router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import ToastMessage from '#elements/ToastMessage';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const props = defineProps();
const user = useUserStore();
const name = ref('{module_name}');
const lessons = ref([]);
const checkpoints = ref([]);
const toast = ref(ToastMessage);
const newLesson = ref({
    dialogVisible: false,
    name: '',
    description: '',
    video: ''
});
const newCheckpoint = ref({
    name: '',
    number: null,
    questions: []
});
async function loadModule() {
    try {
        const module = await API.module(props.id);
        name.value = module.module_name;
        lessons.value = await API.moduleLessons(props.id);
        for (const lesson of lessons.value) {
            lesson.link = lessonPath.replace(':id', lesson.id + '');
        }
        checkpoints.value = await API.moduleCheckpoints(props.id);
        for (const checkpoint of checkpoints.value) {
            checkpoint.link = checkpointPath.replace(':id', checkpoint.id + '');
        }
    }
    catch (error) {
        toast.value.showError(`Не удалось загрузить один из модулей:\n${error}`);
    }
}
async function addLesson() {
    try {
        await API.addLesson(newLesson.value.name, newLesson.value.description, props.id);
        router.go();
    }
    catch (error) {
        toast.value.showError(`Не удалось добавить модуль:\n${error}`);
    }
}
async function addCheckpoint() {
}
loadModule();
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
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    // @ts-ignore
    [Button, Button, Button, Button, Button, Button, Button, Button, Button, Button, Button, Button,];
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
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    // @ts-ignore
    [Dialog, Dialog, Dialog, Dialog,];
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
        const __VLS_0 = __VLS_intrinsicElements["div"];
        const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
        const __VLS_2 = __VLS_1({ ...{}, class: ("flexColumn"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, class: ("flexColumn"), }));
        {
            const __VLS_5 = __VLS_intrinsicElements["div"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, class: ("flexRow alignCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, class: ("flexRow alignCenter"), }));
            {
                const __VLS_10 = __VLS_intrinsicElements["div"];
                const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
                const __VLS_12 = __VLS_11({ ...{}, id: ("moduleName"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                ({}({ ...{}, id: ("moduleName"), }));
                (__VLS_ctx.index);
                (__VLS_ctx.name);
                (__VLS_13.slots).default;
                const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
            }
            {
                const __VLS_15 = __VLS_intrinsicElements["div"];
                const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                const __VLS_17 = __VLS_16({ ...{}, class: ("spacer"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                ({}({ ...{}, class: ("spacer"), }));
                const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
            }
            if (__VLS_ctx.user.isTeacher) {
                {
                    const __VLS_20 = {}.Button;
                    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{ 'onClick': {}, }, }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_22 = __VLS_21({ ...{ 'onClick': {}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                    ({}({ ...{ 'onClick': {}, }, }));
                    let __VLS_25 = { 'click': __VLS_pickEvent(__VLS_24['click'], {}.onClick) };
                    __VLS_25 = { click: $event => {
                            if (!((__VLS_ctx.user.isTeacher)))
                                return;
                            __VLS_ctx.newLesson.dialogVisible = true;
                            // @ts-ignore
                            [index, name, user, newLesson,];
                        }
                    };
                    (__VLS_23.slots).default;
                    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
                    let __VLS_24;
                }
            }
            if (__VLS_ctx.user.isTeacher) {
                {
                    const __VLS_26 = {}.Button;
                    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ ...{ 'onClick': {}, }, }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_28 = __VLS_27({ ...{ 'onClick': {}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_27));
                    ({}({ ...{ 'onClick': {}, }, }));
                    let __VLS_31 = { 'click': __VLS_pickEvent(__VLS_30['click'], {}.onClick) };
                    __VLS_31 = { click: $event => {
                            if (!((__VLS_ctx.user.isTeacher)))
                                return;
                            __VLS_ctx.newCheckpoint.dialogVisible = true;
                            // @ts-ignore
                            [user, newCheckpoint,];
                        }
                    };
                    (__VLS_29.slots).default;
                    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
                    let __VLS_30;
                }
            }
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        {
            const __VLS_32 = __VLS_intrinsicElements["div"];
            const __VLS_33 = __VLS_elementAsFunctionalComponent(__VLS_32);
            const __VLS_34 = __VLS_33({ ...{}, class: ("group"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            ({}({ ...{}, class: ("group"), }));
            (__VLS_35.slots).default;
            const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
        }
        {
            const __VLS_37 = __VLS_intrinsicElements["div"];
            const __VLS_38 = __VLS_elementAsFunctionalComponent(__VLS_37);
            const __VLS_39 = __VLS_38({ ...{}, class: ("flexColumn sub"), }, ...__VLS_functionalComponentArgsRest(__VLS_38));
            ({}({ ...{}, class: ("flexColumn sub"), }));
            for (const [lesson, i] of __VLS_getVForSourceType((__VLS_ctx.lessons))) {
                {
                    const __VLS_42 = {}.RouterLink;
                    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{}, to: ((lesson.link)), }));
                    ({}.RouterLink);
                    ({}.RouterLink);
                    const __VLS_44 = __VLS_43({ ...{}, to: ((lesson.link)), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
                    ({}({ ...{}, to: ((lesson.link)), }));
                    (i + 1);
                    (lesson.lesson_name);
                    (__VLS_45.slots).default;
                    const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
                }
                // @ts-ignore
                [lessons,];
            }
            if (__VLS_ctx.lessons.length === 0) {
                {
                    const __VLS_47 = __VLS_intrinsicElements["div"];
                    const __VLS_48 = __VLS_elementAsFunctionalComponent(__VLS_47);
                    const __VLS_49 = __VLS_48({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_48));
                    ({}({ ...{}, }));
                    (__VLS_50.slots).default;
                    const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_47, __VLS_49);
                }
                // @ts-ignore
                [lessons,];
            }
            (__VLS_40.slots).default;
            const __VLS_40 = __VLS_pickFunctionalComponentCtx(__VLS_37, __VLS_39);
        }
        {
            const __VLS_52 = __VLS_intrinsicElements["div"];
            const __VLS_53 = __VLS_elementAsFunctionalComponent(__VLS_52);
            const __VLS_54 = __VLS_53({ ...{}, class: ("group"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
            ({}({ ...{}, class: ("group"), }));
            (__VLS_55.slots).default;
            const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54);
        }
        {
            const __VLS_57 = __VLS_intrinsicElements["div"];
            const __VLS_58 = __VLS_elementAsFunctionalComponent(__VLS_57);
            const __VLS_59 = __VLS_58({ ...{}, class: ("flexColumn sub"), }, ...__VLS_functionalComponentArgsRest(__VLS_58));
            ({}({ ...{}, class: ("flexColumn sub"), }));
            for (const [checkpoint, i] of __VLS_getVForSourceType((__VLS_ctx.checkpoints))) {
                {
                    const __VLS_62 = {}.RouterLink;
                    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ ...{}, to: ((checkpoint.link)), }));
                    ({}.RouterLink);
                    ({}.RouterLink);
                    const __VLS_64 = __VLS_63({ ...{}, to: ((checkpoint.link)), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
                    ({}({ ...{}, to: ((checkpoint.link)), }));
                    (i + 1);
                    (checkpoint.title);
                    (__VLS_65.slots).default;
                    const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
                }
                // @ts-ignore
                [checkpoints,];
            }
            if (__VLS_ctx.checkpoints.length === 0) {
                {
                    const __VLS_67 = __VLS_intrinsicElements["div"];
                    const __VLS_68 = __VLS_elementAsFunctionalComponent(__VLS_67);
                    const __VLS_69 = __VLS_68({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_68));
                    ({}({ ...{}, }));
                    (__VLS_70.slots).default;
                    const __VLS_70 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69);
                }
                // @ts-ignore
                [checkpoints,];
            }
            (__VLS_60.slots).default;
            const __VLS_60 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    {
        const __VLS_72 = {}.Dialog;
        const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({ ...{}, visible: ((__VLS_ctx.newLesson.dialogVisible)), modal: (true), header: ("Новый урок"), style: (({ width: '20vw' })), }));
        ({}.Dialog);
        ({}.Dialog);
        const __VLS_74 = __VLS_73({ ...{}, visible: ((__VLS_ctx.newLesson.dialogVisible)), modal: (true), header: ("Новый урок"), style: (({ width: '20vw' })), }, ...__VLS_functionalComponentArgsRest(__VLS_73));
        ({}({ ...{}, visible: ((__VLS_ctx.newLesson.dialogVisible)), modal: (true), header: ("Новый урок"), style: (({ width: '20vw' })), }));
        {
            const __VLS_77 = __VLS_intrinsicElements["div"];
            const __VLS_78 = __VLS_elementAsFunctionalComponent(__VLS_77);
            const __VLS_79 = __VLS_78({ ...{}, class: ("flexColumn"), }, ...__VLS_functionalComponentArgsRest(__VLS_78));
            ({}({ ...{}, class: ("flexColumn"), }));
            {
                const __VLS_82 = {}.InputText;
                const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ ...{}, modelValue: ((__VLS_ctx.newLesson.name)), placeholder: ("Название урока"), }));
                ({}.InputText);
                const __VLS_84 = __VLS_83({ ...{}, modelValue: ((__VLS_ctx.newLesson.name)), placeholder: ("Название урока"), }, ...__VLS_functionalComponentArgsRest(__VLS_83));
                ({}({ ...{}, modelValue: ((__VLS_ctx.newLesson.name)), placeholder: ("Название урока"), }));
                const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84);
            }
            {
                const __VLS_87 = {}.Textarea;
                const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({ ...{}, modelValue: ((__VLS_ctx.newLesson.description)), rows: ("5"), cols: ("30"), placeholder: ("Описание урока"), autoResize: (true), }));
                ({}.Textarea);
                const __VLS_89 = __VLS_88({ ...{}, modelValue: ((__VLS_ctx.newLesson.description)), rows: ("5"), cols: ("30"), placeholder: ("Описание урока"), autoResize: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_88));
                ({}({ ...{}, modelValue: ((__VLS_ctx.newLesson.description)), rows: ("5"), cols: ("30"), placeholder: ("Описание урока"), autoResize: (true), }));
                const __VLS_90 = __VLS_pickFunctionalComponentCtx(__VLS_87, __VLS_89);
            }
            {
                const __VLS_92 = __VLS_intrinsicElements["div"];
                const __VLS_93 = __VLS_elementAsFunctionalComponent(__VLS_92);
                const __VLS_94 = __VLS_93({ ...{}, class: ("flexRow justifyEnd"), }, ...__VLS_functionalComponentArgsRest(__VLS_93));
                ({}({ ...{}, class: ("flexRow justifyEnd"), }));
                {
                    const __VLS_97 = {}.Button;
                    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_99 = __VLS_98({ ...{ 'onClick': {}, }, severity: ("danger"), }, ...__VLS_functionalComponentArgsRest(__VLS_98));
                    ({}({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    let __VLS_102 = { 'click': __VLS_pickEvent(__VLS_101['click'], {}.onClick) };
                    __VLS_102 = { click: $event => {
                            __VLS_ctx.newLesson.dialogVisible = false;
                            // @ts-ignore
                            [newLesson, newLesson, newLesson, newLesson,];
                        }
                    };
                    (__VLS_100.slots).default;
                    const __VLS_100 = __VLS_pickFunctionalComponentCtx(__VLS_97, __VLS_99);
                    let __VLS_101;
                }
                {
                    const __VLS_103 = {}.Button;
                    const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({ ...{ 'onClick': {}, }, }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_105 = __VLS_104({ ...{ 'onClick': {}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_104));
                    ({}({ ...{ 'onClick': {}, }, }));
                    let __VLS_108 = { 'click': __VLS_pickEvent(__VLS_107['click'], {}.onClick) };
                    __VLS_108 = { click: (__VLS_ctx.addLesson) };
                    (__VLS_106.slots).default;
                    const __VLS_106 = __VLS_pickFunctionalComponentCtx(__VLS_103, __VLS_105);
                    let __VLS_107;
                }
                (__VLS_95.slots).default;
                const __VLS_95 = __VLS_pickFunctionalComponentCtx(__VLS_92, __VLS_94);
            }
            (__VLS_80.slots).default;
            const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_77, __VLS_79);
        }
        (__VLS_75.slots).default;
        const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
    }
    {
        const __VLS_109 = {}.Dialog;
        const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({ ...{}, visible: ((__VLS_ctx.newCheckpoint.dialogVisible)), modal: (true), header: ("Новая КТ"), style: (({ width: '20vw' })), }));
        ({}.Dialog);
        ({}.Dialog);
        const __VLS_111 = __VLS_110({ ...{}, visible: ((__VLS_ctx.newCheckpoint.dialogVisible)), modal: (true), header: ("Новая КТ"), style: (({ width: '20vw' })), }, ...__VLS_functionalComponentArgsRest(__VLS_110));
        ({}({ ...{}, visible: ((__VLS_ctx.newCheckpoint.dialogVisible)), modal: (true), header: ("Новая КТ"), style: (({ width: '20vw' })), }));
        {
            const __VLS_114 = __VLS_intrinsicElements["div"];
            const __VLS_115 = __VLS_elementAsFunctionalComponent(__VLS_114);
            const __VLS_116 = __VLS_115({ ...{}, class: ("flexColumn alignStart"), }, ...__VLS_functionalComponentArgsRest(__VLS_115));
            ({}({ ...{}, class: ("flexColumn alignStart"), }));
            {
                const __VLS_119 = {}.InputText;
                const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({ ...{}, modelValue: ((__VLS_ctx.newLesson.name)), placeholder: ("Название КТ"), }));
                ({}.InputText);
                const __VLS_121 = __VLS_120({ ...{}, modelValue: ((__VLS_ctx.newLesson.name)), placeholder: ("Название КТ"), }, ...__VLS_functionalComponentArgsRest(__VLS_120));
                ({}({ ...{}, modelValue: ((__VLS_ctx.newLesson.name)), placeholder: ("Название КТ"), }));
                const __VLS_122 = __VLS_pickFunctionalComponentCtx(__VLS_119, __VLS_121);
            }
            {
                const __VLS_124 = __VLS_intrinsicElements["div"];
                const __VLS_125 = __VLS_elementAsFunctionalComponent(__VLS_124);
                const __VLS_126 = __VLS_125({ ...{}, class: ("flexRow alignSelfEnd"), }, ...__VLS_functionalComponentArgsRest(__VLS_125));
                ({}({ ...{}, class: ("flexRow alignSelfEnd"), }));
                {
                    const __VLS_129 = {}.Button;
                    const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_131 = __VLS_130({ ...{ 'onClick': {}, }, severity: ("danger"), }, ...__VLS_functionalComponentArgsRest(__VLS_130));
                    ({}({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    let __VLS_134 = { 'click': __VLS_pickEvent(__VLS_133['click'], {}.onClick) };
                    __VLS_134 = { click: $event => {
                            __VLS_ctx.newLesson.dialogVisible = false;
                            // @ts-ignore
                            [addLesson, newCheckpoint, newLesson, newLesson,];
                        }
                    };
                    (__VLS_132.slots).default;
                    const __VLS_132 = __VLS_pickFunctionalComponentCtx(__VLS_129, __VLS_131);
                    let __VLS_133;
                }
                {
                    const __VLS_135 = {}.Button;
                    const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({ ...{ 'onClick': {}, }, }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_137 = __VLS_136({ ...{ 'onClick': {}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_136));
                    ({}({ ...{ 'onClick': {}, }, }));
                    let __VLS_140 = { 'click': __VLS_pickEvent(__VLS_139['click'], {}.onClick) };
                    __VLS_140 = { click: (__VLS_ctx.addCheckpoint) };
                    (__VLS_138.slots).default;
                    const __VLS_138 = __VLS_pickFunctionalComponentCtx(__VLS_135, __VLS_137);
                    let __VLS_139;
                }
                (__VLS_127.slots).default;
                const __VLS_127 = __VLS_pickFunctionalComponentCtx(__VLS_124, __VLS_126);
            }
            (__VLS_117.slots).default;
            const __VLS_117 = __VLS_pickFunctionalComponentCtx(__VLS_114, __VLS_116);
        }
        (__VLS_112.slots).default;
        const __VLS_112 = __VLS_pickFunctionalComponentCtx(__VLS_109, __VLS_111);
    }
    {
        const __VLS_141 = {}.ToastMessage;
        const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({ ...{}, ref: ("toast"), }));
        ({}.ToastMessage);
        const __VLS_143 = __VLS_142({ ...{}, ref: ("toast"), }, ...__VLS_functionalComponentArgsRest(__VLS_142));
        ({}({ ...{}, ref: ("toast"), }));
        // @ts-ignore
        (__VLS_ctx.toast);
        const __VLS_144 = __VLS_pickFunctionalComponentCtx(__VLS_141, __VLS_143);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignCenter"];
        __VLS_styleScopedClasses["spacer"];
        __VLS_styleScopedClasses["group"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["sub"];
        __VLS_styleScopedClasses["group"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["sub"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["justifyEnd"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["alignStart"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignSelfEnd"];
    }
    var __VLS_slots;
    // @ts-ignore
    [addCheckpoint, toast,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            Button: Button,
            InputText: InputText,
            Textarea: Textarea,
            Dialog: Dialog,
            ToastMessage: ToastMessage,
            user: user,
            name: name,
            lessons: lessons,
            checkpoints: checkpoints,
            toast: toast,
            newLesson: newLesson,
            newCheckpoint: newCheckpoint,
            addLesson: addLesson,
            addCheckpoint: addCheckpoint,
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
