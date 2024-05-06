/* __placeholder__ */
import { ref } from 'vue';
import { Role, useUserStore } from '#store';
import { useRoute, useRouter } from 'vue-router';
import { teacherPath } from '#src/router';
import API from '#src/classes/api';
import { buildFullName } from '#src/functions';
import Fieldset from 'primevue/fieldset';
import ModuleComponent from '#elements/Module';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ToastMessage from '#elements/ToastMessage';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const user = useUserStore();
const route = useRoute();
const router = useRouter();
const id = ref(parseInt(route.params.id));
const name = ref('{course_name}');
const description = ref('{course_description}');
const modules = ref([]);
const teacherId = ref(0);
const teacherFullName = ref('{teacher_full_name}');
const teacherLink = ref('{link_to_teacher}');
const toast = ref(ToastMessage);
const newModule = ref({
    dialogVisible: false,
    name: ''
});
const scoreTable = ref({
    visible: false,
    students: []
});
const checkpoints = ref([]);
async function loadCourse() {
    try {
        const course = await API.course(id.value);
        name.value = course.course_name;
        description.value = course.description ?? 'Пока нет описания...';
        modules.value = await API.courseModules(id.value);
        if (user.role === Role.Student) {
            teacherId.value = course.teacher_profile;
            const teacher = await API.teacher(teacherId.value);
            teacherFullName.value = buildFullName(teacher.surname, teacher.name, teacher.father_name);
            teacherLink.value = teacherPath.replace(':id', teacherId.value + '');
        }
    }
    catch (error) {
        toast.value.showError(`Не удалось загрузить курс:\n${error}`);
    }
}
async function loadStudentsScores() {
    scoreTable.value.students = await API.courseStudents(id.value);
    for (const module of modules.value) {
        const moduleCheckpoints = await API.moduleCheckpoints(module.id);
        for (const checkpoint of moduleCheckpoints) {
            checkpoints.value.push(checkpoint.id);
        }
    }
    for (const student of scoreTable.value.students) {
        student.grades = [];
        for (const checkpointId of checkpoints.value) {
            student.grades.push(await API.studentScore(student.id, checkpointId));
        }
    }
}
async function addModule() {
    if (newModule.name === '') {
        toast.value.showWarn('Поле "Название" обязательно', 'Пропущено поле');
        return;
    }
    try {
        await API.addModule(newModule.value.name, id.value);
        router.go();
    }
    catch (error) {
        toast.value.showError(`Не удалось добавить модуль:\n${error}`);
    }
}
async function loadAllData() {
    await loadCourse();
    if (user.isTeacher) {
        await loadStudentsScores();
    }
}
loadAllData();
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
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    // @ts-ignore
    [Divider, Divider, Divider, Divider,];
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
    __VLS_components.ModuleComponent;
    __VLS_components.ModuleComponent;
    // @ts-ignore
    [ModuleComponent,];
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
    // @ts-ignore
    [InputText,];
    __VLS_components.ToastMessage;
    __VLS_components.ToastMessage;
    // @ts-ignore
    [ToastMessage,];
    __VLS_intrinsicElements.table;
    __VLS_intrinsicElements.table;
    __VLS_intrinsicElements.tr;
    __VLS_intrinsicElements.tr;
    __VLS_intrinsicElements.tr;
    __VLS_intrinsicElements.tr;
    __VLS_intrinsicElements.th;
    __VLS_intrinsicElements.th;
    __VLS_intrinsicElements.th;
    __VLS_intrinsicElements.th;
    __VLS_intrinsicElements.td;
    __VLS_intrinsicElements.td;
    __VLS_intrinsicElements.td;
    __VLS_intrinsicElements.td;
    {
        const __VLS_0 = {}.Fieldset;
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, legend: ((__VLS_ctx.name)), }));
        ({}.Fieldset);
        ({}.Fieldset);
        const __VLS_2 = __VLS_1({ ...{}, legend: ((__VLS_ctx.name)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, legend: ((__VLS_ctx.name)), }));
        if (__VLS_ctx.user.isStudent) {
            {
                const __VLS_5 = __VLS_intrinsicElements["div"];
                const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
                const __VLS_7 = __VLS_6({ ...{}, class: ("flexRow justifyCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
                ({}({ ...{}, class: ("flexRow justifyCenter"), }));
                {
                    const __VLS_10 = {}.RouterLink;
                    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({ ...{}, to: ((__VLS_ctx.teacherLink)), }));
                    ({}.RouterLink);
                    ({}.RouterLink);
                    const __VLS_12 = __VLS_11({ ...{}, to: ((__VLS_ctx.teacherLink)), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                    ({}({ ...{}, to: ((__VLS_ctx.teacherLink)), }));
                    (__VLS_ctx.teacherFullName);
                    (__VLS_13.slots).default;
                    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
                }
                (__VLS_8.slots).default;
                const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
            }
            // @ts-ignore
            [name, user, teacherLink, teacherFullName,];
        }
        {
            const __VLS_15 = {}.Divider;
            const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({ ...{}, }));
            ({}.Divider);
            const __VLS_17 = __VLS_16({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            ({}({ ...{}, }));
            const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
        }
        {
            const __VLS_20 = __VLS_intrinsicElements["div"];
            const __VLS_21 = __VLS_elementAsFunctionalComponent(__VLS_20);
            const __VLS_22 = __VLS_21({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
            ({}({ ...{}, }));
            (__VLS_ctx.description);
            (__VLS_23.slots).default;
            const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
        }
        {
            const __VLS_25 = {}.Divider;
            const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({ ...{}, }));
            ({}.Divider);
            const __VLS_27 = __VLS_26({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_26));
            ({}({ ...{}, }));
            const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
        }
        {
            const __VLS_30 = __VLS_intrinsicElements["div"];
            const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
            const __VLS_32 = __VLS_31({ ...{}, class: ("flexRow alignCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
            ({}({ ...{}, class: ("flexRow alignCenter"), }));
            if (__VLS_ctx.user.isTeacher) {
                {
                    const __VLS_35 = {}.Button;
                    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({ ...{ 'onClick': {}, }, icon: ("pi pi-table"), }));
                    ({}.Button);
                    const __VLS_37 = __VLS_36({ ...{ 'onClick': {}, }, icon: ("pi pi-table"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                    ({}({ ...{ 'onClick': {}, }, icon: ("pi pi-table"), }));
                    __VLS_directiveFunction(__VLS_ctx.vTooltip)(('Зачётная таблица'));
                    let __VLS_40 = { 'click': __VLS_pickEvent(__VLS_39['click'], {}.onClick) };
                    __VLS_40 = { click: $event => {
                            if (!((__VLS_ctx.user.isTeacher)))
                                return;
                            __VLS_ctx.scoreTable.visible = true;
                            // @ts-ignore
                            [description, user, scoreTable,];
                        }
                    };
                    const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37);
                    let __VLS_39;
                }
            }
            if (__VLS_ctx.user.isTeacher) {
                {
                    const __VLS_41 = {}.Button;
                    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({ ...{ 'onClick': {}, }, icon: ("pi pi-plus"), }));
                    ({}.Button);
                    const __VLS_43 = __VLS_42({ ...{ 'onClick': {}, }, icon: ("pi pi-plus"), }, ...__VLS_functionalComponentArgsRest(__VLS_42));
                    ({}({ ...{ 'onClick': {}, }, icon: ("pi pi-plus"), }));
                    __VLS_directiveFunction(__VLS_ctx.vTooltip)(('Добавить модуль'));
                    let __VLS_46 = { 'click': __VLS_pickEvent(__VLS_45['click'], {}.onClick) };
                    __VLS_46 = { click: $event => {
                            if (!((__VLS_ctx.user.isTeacher)))
                                return;
                            __VLS_ctx.newModule.dialogVisible = true;
                            // @ts-ignore
                            [user, newModule,];
                        }
                    };
                    const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43);
                    let __VLS_45;
                }
            }
            (__VLS_33.slots).default;
            const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        }
        {
            const __VLS_47 = {}.Divider;
            const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({ ...{}, }));
            ({}.Divider);
            const __VLS_49 = __VLS_48({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_48));
            ({}({ ...{}, }));
            const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_47, __VLS_49);
        }
        for (const [module, moduleIndex] of __VLS_getVForSourceType((__VLS_ctx.modules))) {
            {
                const __VLS_52 = __VLS_intrinsicElements["div"];
                const __VLS_53 = __VLS_elementAsFunctionalComponent(__VLS_52);
                const __VLS_54 = __VLS_53({ ...{}, class: ("flexColumn"), }, ...__VLS_functionalComponentArgsRest(__VLS_53));
                ({}({ ...{}, class: ("flexColumn"), }));
                {
                    const __VLS_57 = {}.ModuleComponent;
                    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({ ...{}, index: ((moduleIndex + 1)), id: ((module.id)), }));
                    ({}.ModuleComponent);
                    const __VLS_59 = __VLS_58({ ...{}, index: ((moduleIndex + 1)), id: ((module.id)), }, ...__VLS_functionalComponentArgsRest(__VLS_58));
                    ({}({ ...{}, index: ((moduleIndex + 1)), id: ((module.id)), }));
                    const __VLS_60 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59);
                }
                if (moduleIndex < __VLS_ctx.modules.length - 1) {
                    {
                        const __VLS_62 = {}.Divider;
                        const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ ...{}, }));
                        ({}.Divider);
                        const __VLS_64 = __VLS_63({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_63));
                        ({}({ ...{}, }));
                        const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
                    }
                    // @ts-ignore
                    [modules, modules,];
                }
                (__VLS_55.slots).default;
                const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54);
            }
        }
        if (__VLS_ctx.modules.length === 0) {
            {
                const __VLS_67 = __VLS_intrinsicElements["div"];
                const __VLS_68 = __VLS_elementAsFunctionalComponent(__VLS_67);
                const __VLS_69 = __VLS_68({ ...{}, class: ("alignSelfCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_68));
                ({}({ ...{}, class: ("alignSelfCenter"), }));
                (__VLS_70.slots).default;
                const __VLS_70 = __VLS_pickFunctionalComponentCtx(__VLS_67, __VLS_69);
            }
            // @ts-ignore
            [modules,];
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    {
        const __VLS_72 = {}.Dialog;
        const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({ ...{}, visible: ((__VLS_ctx.newModule.dialogVisible)), modal: (true), header: ("Новый модуль"), style: (({ width: '20vw' })), }));
        ({}.Dialog);
        ({}.Dialog);
        const __VLS_74 = __VLS_73({ ...{}, visible: ((__VLS_ctx.newModule.dialogVisible)), modal: (true), header: ("Новый модуль"), style: (({ width: '20vw' })), }, ...__VLS_functionalComponentArgsRest(__VLS_73));
        ({}({ ...{}, visible: ((__VLS_ctx.newModule.dialogVisible)), modal: (true), header: ("Новый модуль"), style: (({ width: '20vw' })), }));
        {
            const __VLS_77 = __VLS_intrinsicElements["div"];
            const __VLS_78 = __VLS_elementAsFunctionalComponent(__VLS_77);
            const __VLS_79 = __VLS_78({ ...{}, class: ("flexColumn"), }, ...__VLS_functionalComponentArgsRest(__VLS_78));
            ({}({ ...{}, class: ("flexColumn"), }));
            {
                const __VLS_82 = {}.InputText;
                const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ ...{}, placeholder: ("Название модуля"), modelValue: ((__VLS_ctx.newModule.name)), }));
                ({}.InputText);
                const __VLS_84 = __VLS_83({ ...{}, placeholder: ("Название модуля"), modelValue: ((__VLS_ctx.newModule.name)), }, ...__VLS_functionalComponentArgsRest(__VLS_83));
                ({}({ ...{}, placeholder: ("Название модуля"), modelValue: ((__VLS_ctx.newModule.name)), }));
                const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84);
            }
            {
                const __VLS_87 = __VLS_intrinsicElements["div"];
                const __VLS_88 = __VLS_elementAsFunctionalComponent(__VLS_87);
                const __VLS_89 = __VLS_88({ ...{}, class: ("flexRow justifyEnd"), }, ...__VLS_functionalComponentArgsRest(__VLS_88));
                ({}({ ...{}, class: ("flexRow justifyEnd"), }));
                {
                    const __VLS_92 = {}.Button;
                    const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    ({}.Button);
                    ({}.Button);
                    const __VLS_94 = __VLS_93({ ...{ 'onClick': {}, }, severity: ("danger"), }, ...__VLS_functionalComponentArgsRest(__VLS_93));
                    ({}({ ...{ 'onClick': {}, }, severity: ("danger"), }));
                    let __VLS_97 = { 'click': __VLS_pickEvent(__VLS_96['click'], {}.onClick) };
                    __VLS_97 = { click: $event => {
                            __VLS_ctx.newModule.dialogVisible = false;
                            // @ts-ignore
                            [newModule, newModule, newModule,];
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
                    __VLS_103 = { click: (__VLS_ctx.addModule) };
                    (__VLS_101.slots).default;
                    const __VLS_101 = __VLS_pickFunctionalComponentCtx(__VLS_98, __VLS_100);
                    let __VLS_102;
                }
                (__VLS_90.slots).default;
                const __VLS_90 = __VLS_pickFunctionalComponentCtx(__VLS_87, __VLS_89);
            }
            (__VLS_80.slots).default;
            const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_77, __VLS_79);
        }
        (__VLS_75.slots).default;
        const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
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
    {
        const __VLS_109 = {}.Dialog;
        const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({ ...{}, visible: ((__VLS_ctx.scoreTable.visible)), }));
        ({}.Dialog);
        ({}.Dialog);
        const __VLS_111 = __VLS_110({ ...{}, visible: ((__VLS_ctx.scoreTable.visible)), }, ...__VLS_functionalComponentArgsRest(__VLS_110));
        ({}({ ...{}, visible: ((__VLS_ctx.scoreTable.visible)), }));
        {
            const __VLS_114 = __VLS_intrinsicElements["table"];
            const __VLS_115 = __VLS_elementAsFunctionalComponent(__VLS_114);
            const __VLS_116 = __VLS_115({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_115));
            ({}({ ...{}, }));
            {
                const __VLS_119 = __VLS_intrinsicElements["tr"];
                const __VLS_120 = __VLS_elementAsFunctionalComponent(__VLS_119);
                const __VLS_121 = __VLS_120({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_120));
                ({}({ ...{}, }));
                {
                    const __VLS_124 = __VLS_intrinsicElements["th"];
                    const __VLS_125 = __VLS_elementAsFunctionalComponent(__VLS_124);
                    const __VLS_126 = __VLS_125({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_125));
                    ({}({ ...{}, }));
                    (__VLS_127.slots).default;
                    const __VLS_127 = __VLS_pickFunctionalComponentCtx(__VLS_124, __VLS_126);
                }
                for (const [checkpointId, i] of __VLS_getVForSourceType((__VLS_ctx.checkpoints))) {
                    {
                        const __VLS_129 = __VLS_intrinsicElements["th"];
                        const __VLS_130 = __VLS_elementAsFunctionalComponent(__VLS_129);
                        const __VLS_131 = __VLS_130({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_130));
                        ({}({ ...{}, }));
                        (i + 1);
                        (__VLS_132.slots).default;
                        const __VLS_132 = __VLS_pickFunctionalComponentCtx(__VLS_129, __VLS_131);
                    }
                    // @ts-ignore
                    [addModule, toast, scoreTable, checkpoints,];
                }
                (__VLS_122.slots).default;
                const __VLS_122 = __VLS_pickFunctionalComponentCtx(__VLS_119, __VLS_121);
            }
            for (const [student] of __VLS_getVForSourceType((__VLS_ctx.scoreTable.students))) {
                {
                    const __VLS_134 = __VLS_intrinsicElements["tr"];
                    const __VLS_135 = __VLS_elementAsFunctionalComponent(__VLS_134);
                    const __VLS_136 = __VLS_135({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_135));
                    ({}({ ...{}, }));
                    {
                        const __VLS_139 = __VLS_intrinsicElements["td"];
                        const __VLS_140 = __VLS_elementAsFunctionalComponent(__VLS_139);
                        const __VLS_141 = __VLS_140({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_140));
                        ({}({ ...{}, }));
                        (student.surname);
                        (student.name);
                        (student.father_name);
                        (__VLS_142.slots).default;
                        const __VLS_142 = __VLS_pickFunctionalComponentCtx(__VLS_139, __VLS_141);
                    }
                    for (const [grade] of __VLS_getVForSourceType((student.grades))) {
                        {
                            const __VLS_144 = __VLS_intrinsicElements["td"];
                            const __VLS_145 = __VLS_elementAsFunctionalComponent(__VLS_144);
                            const __VLS_146 = __VLS_145({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_145));
                            ({}({ ...{}, }));
                            (grade);
                            (__VLS_147.slots).default;
                            const __VLS_147 = __VLS_pickFunctionalComponentCtx(__VLS_144, __VLS_146);
                        }
                        // @ts-ignore
                        [scoreTable,];
                    }
                    (__VLS_137.slots).default;
                    const __VLS_137 = __VLS_pickFunctionalComponentCtx(__VLS_134, __VLS_136);
                }
            }
            (__VLS_117.slots).default;
            const __VLS_117 = __VLS_pickFunctionalComponentCtx(__VLS_114, __VLS_116);
        }
        (__VLS_112.slots).default;
        const __VLS_112 = __VLS_pickFunctionalComponentCtx(__VLS_109, __VLS_111);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["justifyCenter"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignCenter"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["alignSelfCenter"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["justifyEnd"];
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            Fieldset: Fieldset,
            ModuleComponent: ModuleComponent,
            Divider: Divider,
            Button: Button,
            Dialog: Dialog,
            InputText: InputText,
            ToastMessage: ToastMessage,
            user: user,
            name: name,
            description: description,
            modules: modules,
            teacherFullName: teacherFullName,
            teacherLink: teacherLink,
            toast: toast,
            newModule: newModule,
            scoreTable: scoreTable,
            checkpoints: checkpoints,
            addModule: addModule,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
