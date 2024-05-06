/* __placeholder__ */
import axios from 'axios'; // Временно???
import { ref } from 'vue';
import API from '#src/classes/api';
import { useRoute, useRouter } from 'vue-router';
import { Role, useUserStore } from '#store';
import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import Dialog from 'primevue/dialog';
import ToastMessage from '#elements/ToastMessage';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const user = useUserStore();
const route = useRoute();
const router = useRouter();
const toast = ref(ToastMessage);
const id = ref(parseInt(route.params.id));
const name = ref('{checkpoint_name}');
const questions = ref([]);
const passable = ref(true);
const passed = ref(false);
const grade = ref('');
const sendConfirmVisible = ref(false);
const colors = {
    '2': 'danger',
    '3': 'warning',
    '4': 'info',
    '5': 'success'
};
async function loadCheckpoint() {
    try {
        const checkpoint = await API.checkpoint(id.value);
        name.value = checkpoint.title;
        questions.value = checkpoint.questions;
        for (const question of questions.value) {
            question.chosenAnswer = null;
        }
    }
    catch (error) {
        toast.value.showError(`Не удалось загрузить контрольную точку:\n${error}`);
    }
}
function allQuestionsAnswered() {
    for (const question of questions.value) {
        if (question.chosenAnswer === null) {
            return false;
        }
    }
    return true;
}
function handleSend() {
    if (!allQuestionsAnswered()) {
        toast.value.showWarn('Вы должны ответить на все вопросы', 'Без пропущенных');
        return;
    }
    sendConfirmVisible.value = true;
}
async function send() {
    try {
        for (const question of questions.value) {
            await API.sendQuestionChoice(user.id, question.id, question.chosenAnswer, id.value);
        }
        // Временно????
        await axios.post(API.passedCheckpoints, {
            student: user.id,
            checkpoint: id.value,
            points: 0
        });
        // Временно ???
        router.go();
    }
    catch (error) {
        toast.value.showError(`Не удалось отправить результат:\n${error}`);
    }
}
async function setGrade() {
    const passedCheckpoints = await API.studentPassedCheckpoints(user.id);
    let thisCheckpoint;
    for (const passedCheckpoint of passedCheckpoints) {
        if (passedCheckpoint.checkpoint === id.value) {
            thisCheckpoint = passedCheckpoint;
            break;
        }
    }
    grade.value = thisCheckpoint.grade ?? 'Не выставлено';
}
async function passedByStudent() {
    try {
        const passedCheckpoints = await API.studentPassedCheckpoints(user.id);
        for (const passedCheckpoint of passedCheckpoints) {
            if (passedCheckpoint.checkpoint === id.value) {
                return true;
            }
        }
        return false;
    }
    catch (error) {
        toast.value.showWarn(`Не удалось установить результат КТ:\n${error}\nПрохождение недоступно`);
        return true;
    }
}
async function prepare() {
    switch (user.role) {
        case Role.Student:
            passed.value = await passedByStudent();
            passable.value = !passed.value;
            await setGrade();
            break;
        case Role.Teacher:
            passable.value = false;
    }
}
loadCheckpoint();
// prepare();
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
    __VLS_components.Badge;
    __VLS_components.Badge;
    // @ts-ignore
    [Badge,];
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    __VLS_components.Card;
    // @ts-ignore
    [Card, Card,];
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_components.RadioButton;
    __VLS_components.RadioButton;
    // @ts-ignore
    [RadioButton,];
    __VLS_intrinsicElements.label;
    __VLS_intrinsicElements.label;
    __VLS_components.Divider;
    __VLS_components.Divider;
    // @ts-ignore
    [Divider,];
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
    [Button, Button, Button, Button, Button, Button,];
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    __VLS_components.Dialog;
    // @ts-ignore
    [Dialog, Dialog,];
    __VLS_components.ToastMessage;
    __VLS_components.ToastMessage;
    // @ts-ignore
    [ToastMessage,];
    {
        const __VLS_0 = {}.Fieldset;
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, legend: ((__VLS_ctx.name)), }));
        ({}.Fieldset);
        ({}.Fieldset);
        const __VLS_2 = __VLS_1({ ...{}, legend: ((__VLS_ctx.name)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, legend: ((__VLS_ctx.name)), }));
        if (__VLS_ctx.user.role === __VLS_ctx.Role.Student && __VLS_ctx.passed) {
            {
                const __VLS_5 = __VLS_intrinsicElements["div"];
                const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
                const __VLS_7 = __VLS_6({ ...{}, class: ("flexRow alignCenter alignSelfCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
                ({}({ ...{}, class: ("flexRow alignCenter alignSelfCenter"), }));
                {
                    const __VLS_10 = {}.Badge;
                    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({ ...{}, value: ((__VLS_ctx.grade)), severity: ((__VLS_ctx.colors[__VLS_ctx.grade])), }));
                    ({}.Badge);
                    const __VLS_12 = __VLS_11({ ...{}, value: ((__VLS_ctx.grade)), severity: ((__VLS_ctx.colors[__VLS_ctx.grade])), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                    ({}({ ...{}, value: ((__VLS_ctx.grade)), severity: ((__VLS_ctx.colors[__VLS_ctx.grade])), }));
                    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
                }
                (__VLS_8.slots).default;
                const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
            }
            // @ts-ignore
            [name, user, Role, passed, grade, colors, grade,];
        }
        for (const [question, i] of __VLS_getVForSourceType((__VLS_ctx.questions))) {
            {
                const __VLS_15 = __VLS_intrinsicElements["div"];
                const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                const __VLS_17 = __VLS_16({ ...{}, class: ("flexColumn"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                ({}({ ...{}, class: ("flexColumn"), }));
                {
                    const __VLS_20 = {}.Card;
                    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{}, }));
                    ({}.Card);
                    ({}.Card);
                    const __VLS_22 = __VLS_21({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                    ({}({ ...{}, }));
                    {
                        const __VLS_25 = __VLS_intrinsicElements["template"];
                        const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                        const __VLS_27 = __VLS_26({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                        ({}({ ...{}, }));
                        {
                            (__VLS_23.slots).title;
                            (i + 1);
                            (question.question_text);
                            // @ts-ignore
                            [questions,];
                        }
                    }
                    {
                        const __VLS_29 = __VLS_intrinsicElements["template"];
                        const __VLS_30 = __VLS_elementAsFunctionalComponent(__VLS_29);
                        const __VLS_31 = __VLS_30({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_30));
                        ({}({ ...{}, }));
                        {
                            (__VLS_23.slots).content;
                            for (const [answer] of __VLS_getVForSourceType((question.answers))) {
                                {
                                    const __VLS_33 = __VLS_intrinsicElements["div"];
                                    const __VLS_34 = __VLS_elementAsFunctionalComponent(__VLS_33);
                                    const __VLS_35 = __VLS_34({ ...{}, class: ("flexRow alignCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_34));
                                    ({}({ ...{}, class: ("flexRow alignCenter"), }));
                                    {
                                        const __VLS_38 = {}.RadioButton;
                                        const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ ...{}, modelValue: ((question.chosenAnswer)), inputId: ((answer.id + '')), value: ((answer.id)), disabled: ((!__VLS_ctx.passable)), }));
                                        ({}.RadioButton);
                                        const __VLS_40 = __VLS_39({ ...{}, modelValue: ((question.chosenAnswer)), inputId: ((answer.id + '')), value: ((answer.id)), disabled: ((!__VLS_ctx.passable)), }, ...__VLS_functionalComponentArgsRest(__VLS_39));
                                        ({}({ ...{}, modelValue: ((question.chosenAnswer)), inputId: ((answer.id + '')), value: ((answer.id)), disabled: ((!__VLS_ctx.passable)), }));
                                        const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
                                    }
                                    {
                                        const __VLS_43 = __VLS_intrinsicElements["label"];
                                        const __VLS_44 = __VLS_elementAsFunctionalComponent(__VLS_43);
                                        const __VLS_45 = __VLS_44({ ...{}, for: ((answer.id + '')), }, ...__VLS_functionalComponentArgsRest(__VLS_44));
                                        ({}({ ...{}, for: ((answer.id + '')), }));
                                        (answer.answer_text);
                                        (__VLS_46.slots).default;
                                        const __VLS_46 = __VLS_pickFunctionalComponentCtx(__VLS_43, __VLS_45);
                                    }
                                    (__VLS_36.slots).default;
                                    const __VLS_36 = __VLS_pickFunctionalComponentCtx(__VLS_33, __VLS_35);
                                }
                                // @ts-ignore
                                [passable,];
                            }
                        }
                    }
                    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
                }
                (__VLS_18.slots).default;
                const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
            }
        }
        {
            const __VLS_48 = {}.Divider;
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{}, }));
            ({}.Divider);
            const __VLS_50 = __VLS_49({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
            ({}({ ...{}, }));
            const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
        }
        {
            const __VLS_53 = {}.Button;
            const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({ ...{ 'onClick': {}, }, class: ("alignSelfCenter"), disabled: ((!__VLS_ctx.passable)), }));
            ({}.Button);
            ({}.Button);
            const __VLS_55 = __VLS_54({ ...{ 'onClick': {}, }, class: ("alignSelfCenter"), disabled: ((!__VLS_ctx.passable)), }, ...__VLS_functionalComponentArgsRest(__VLS_54));
            ({}({ ...{ 'onClick': {}, }, class: ("alignSelfCenter"), disabled: ((!__VLS_ctx.passable)), }));
            let __VLS_58 = { 'click': __VLS_pickEvent(__VLS_57['click'], {}.onClick) };
            __VLS_58 = { click: (__VLS_ctx.handleSend) };
            (__VLS_56.slots).default;
            const __VLS_56 = __VLS_pickFunctionalComponentCtx(__VLS_53, __VLS_55);
            let __VLS_57;
        }
        {
            const __VLS_59 = {}.Dialog;
            const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({ ...{}, visible: ((__VLS_ctx.sendConfirmVisible)), modal: (true), header: ("Завершить"), style: (({ width: '20vw' })), }));
            ({}.Dialog);
            ({}.Dialog);
            const __VLS_61 = __VLS_60({ ...{}, visible: ((__VLS_ctx.sendConfirmVisible)), modal: (true), header: ("Завершить"), style: (({ width: '20vw' })), }, ...__VLS_functionalComponentArgsRest(__VLS_60));
            ({}({ ...{}, visible: ((__VLS_ctx.sendConfirmVisible)), modal: (true), header: ("Завершить"), style: (({ width: '20vw' })), }));
            {
                const __VLS_64 = __VLS_intrinsicElements["div"];
                const __VLS_65 = __VLS_elementAsFunctionalComponent(__VLS_64);
                const __VLS_66 = __VLS_65({ ...{}, class: ("flexColumn"), }, ...__VLS_functionalComponentArgsRest(__VLS_65));
                ({}({ ...{}, class: ("flexColumn"), }));
                {
                    const __VLS_69 = __VLS_intrinsicElements["div"];
                    const __VLS_70 = __VLS_elementAsFunctionalComponent(__VLS_69);
                    const __VLS_71 = __VLS_70({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_70));
                    ({}({ ...{}, }));
                    (__VLS_72.slots).default;
                    const __VLS_72 = __VLS_pickFunctionalComponentCtx(__VLS_69, __VLS_71);
                }
                {
                    const __VLS_74 = __VLS_intrinsicElements["div"];
                    const __VLS_75 = __VLS_elementAsFunctionalComponent(__VLS_74);
                    const __VLS_76 = __VLS_75({ ...{}, class: ("flexRow justifyEnd"), }, ...__VLS_functionalComponentArgsRest(__VLS_75));
                    ({}({ ...{}, class: ("flexRow justifyEnd"), }));
                    {
                        const __VLS_79 = {}.Button;
                        const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                        ({}.Button);
                        ({}.Button);
                        const __VLS_81 = __VLS_80({ ...{ 'onClick': {}, }, severity: ("danger"), }, ...__VLS_functionalComponentArgsRest(__VLS_80));
                        ({}({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                        let __VLS_84 = { 'click': __VLS_pickEvent(__VLS_83['click'], {}.onClick) };
                        __VLS_84 = { click: $event => {
                                __VLS_ctx.sendConfirmVisible = false;
                                // @ts-ignore
                                [passable, handleSend, sendConfirmVisible, sendConfirmVisible,];
                            }
                        };
                        (__VLS_82.slots).default;
                        const __VLS_82 = __VLS_pickFunctionalComponentCtx(__VLS_79, __VLS_81);
                        let __VLS_83;
                    }
                    {
                        const __VLS_85 = {}.Button;
                        const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({ ...{ 'onClick': {}, }, }));
                        ({}.Button);
                        ({}.Button);
                        const __VLS_87 = __VLS_86({ ...{ 'onClick': {}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_86));
                        ({}({ ...{ 'onClick': {}, }, }));
                        let __VLS_90 = { 'click': __VLS_pickEvent(__VLS_89['click'], {}.onClick) };
                        __VLS_90 = { click: (__VLS_ctx.send) };
                        (__VLS_88.slots).default;
                        const __VLS_88 = __VLS_pickFunctionalComponentCtx(__VLS_85, __VLS_87);
                        let __VLS_89;
                    }
                    (__VLS_77.slots).default;
                    const __VLS_77 = __VLS_pickFunctionalComponentCtx(__VLS_74, __VLS_76);
                }
                (__VLS_67.slots).default;
                const __VLS_67 = __VLS_pickFunctionalComponentCtx(__VLS_64, __VLS_66);
            }
            (__VLS_62.slots).default;
            const __VLS_62 = __VLS_pickFunctionalComponentCtx(__VLS_59, __VLS_61);
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    {
        const __VLS_91 = {}.ToastMessage;
        const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({ ...{}, ref: ("toast"), }));
        ({}.ToastMessage);
        const __VLS_93 = __VLS_92({ ...{}, ref: ("toast"), }, ...__VLS_functionalComponentArgsRest(__VLS_92));
        ({}({ ...{}, ref: ("toast"), }));
        // @ts-ignore
        (__VLS_ctx.toast);
        const __VLS_94 = __VLS_pickFunctionalComponentCtx(__VLS_91, __VLS_93);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignCenter"];
        __VLS_styleScopedClasses["alignSelfCenter"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignCenter"];
        __VLS_styleScopedClasses["alignSelfCenter"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["justifyEnd"];
    }
    var __VLS_slots;
    // @ts-ignore
    [send, toast,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            Role: Role,
            Fieldset: Fieldset,
            Divider: Divider,
            Card: Card,
            RadioButton: RadioButton,
            Button: Button,
            Badge: Badge,
            Dialog: Dialog,
            ToastMessage: ToastMessage,
            user: user,
            toast: toast,
            name: name,
            questions: questions,
            passable: passable,
            passed: passed,
            grade: grade,
            sendConfirmVisible: sendConfirmVisible,
            colors: colors,
            handleSend: handleSend,
            send: send,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
