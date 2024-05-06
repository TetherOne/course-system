/* __placeholder__ */
import { useUserStore } from '#store';
import API from '#src/classes/api';
import Path from '#src/classes/path';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import ToastMessage from '#elements/ToastMessage';
import Fieldset from 'primevue/fieldset';
import Divider from 'primevue/divider';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const user = useUserStore();
const id = ref(parseInt(route.params.id));
const name = ref('{lesson_name}');
const description = ref('{lesson_description}');
const video = ref('{video_path}');
const files = ref([]);
const toast = ref(ToastMessage);
async function loadLesson() {
    try {
        const lesson = await API.lesson(id.value);
        name.value = lesson.lesson_name;
        description.value = lesson.description ?? 'Пока нет информации...';
        video.value = lesson.video;
        console.log(lesson.video);
        files.value = await API.getLessonFiles(id.value);
        for (const file of files.value) {
            file.name = Path.getLastElement(file.other_file);
        }
    }
    catch (error) {
        toast.value.showError(`Не удалось загрузить урок:\n${error}`);
    }
}
loadLesson();
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
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    __VLS_components.Divider;
    // @ts-ignore
    [Divider, Divider,];
    __VLS_intrinsicElements.video;
    __VLS_intrinsicElements.a;
    __VLS_intrinsicElements.a;
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
        {
            const __VLS_5 = __VLS_intrinsicElements["div"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, }));
            (__VLS_ctx.description);
            (__VLS_8.slots).default;
            const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
        }
        if (__VLS_ctx.video !== null) {
            {
                const __VLS_10 = {}.Divider;
                const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({ ...{}, }));
                ({}.Divider);
                const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
                ({}({ ...{}, }));
                const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
            }
            // @ts-ignore
            [name, description, video,];
        }
        if (__VLS_ctx.video !== null) {
            {
                const __VLS_15 = __VLS_intrinsicElements["video"];
                const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
                const __VLS_17 = __VLS_16({ ...{}, controls: (true), width: ("320"), height: ("240"), class: ("alignSelfCenter"), src: ((__VLS_ctx.video)), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
                ({}({ ...{}, controls: (true), width: ("320"), height: ("240"), class: ("alignSelfCenter"), src: ((__VLS_ctx.video)), }));
                const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17);
            }
            // @ts-ignore
            [video, video,];
        }
        if (__VLS_ctx.files.length > 0) {
            {
                const __VLS_20 = {}.Divider;
                const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{}, }));
                ({}.Divider);
                const __VLS_22 = __VLS_21({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                ({}({ ...{}, }));
                const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
            }
            // @ts-ignore
            [files,];
        }
        if (__VLS_ctx.files.length > 0) {
            {
                const __VLS_25 = __VLS_intrinsicElements["div"];
                const __VLS_26 = __VLS_elementAsFunctionalComponent(__VLS_25);
                const __VLS_27 = __VLS_26({ ...{}, class: ("flexColumn"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                ({}({ ...{}, class: ("flexColumn"), }));
                {
                    const __VLS_30 = __VLS_intrinsicElements["div"];
                    const __VLS_31 = __VLS_elementAsFunctionalComponent(__VLS_30);
                    const __VLS_32 = __VLS_31({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
                    ({}({ ...{}, }));
                    (__VLS_33.slots).default;
                    const __VLS_33 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
                }
                {
                    const __VLS_35 = __VLS_intrinsicElements["div"];
                    const __VLS_36 = __VLS_elementAsFunctionalComponent(__VLS_35);
                    const __VLS_37 = __VLS_36({ ...{}, class: ("flexColumn sub"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                    ({}({ ...{}, class: ("flexColumn sub"), }));
                    for (const [file] of __VLS_getVForSourceType((__VLS_ctx.files))) {
                        {
                            const __VLS_40 = __VLS_intrinsicElements["a"];
                            const __VLS_41 = __VLS_elementAsFunctionalComponent(__VLS_40);
                            const __VLS_42 = __VLS_41({ ...{}, href: ((file.other_file)), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
                            ({}({ ...{}, href: ((file.other_file)), }));
                            (file.name);
                            (__VLS_43.slots).default;
                            const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42);
                        }
                        // @ts-ignore
                        [files, files,];
                    }
                    (__VLS_38.slots).default;
                    const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37);
                }
                (__VLS_28.slots).default;
                const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
            }
        }
        (__VLS_3.slots).default;
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    {
        const __VLS_45 = {}.ToastMessage;
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({ ...{}, ref: ("toast"), }));
        ({}.ToastMessage);
        const __VLS_47 = __VLS_46({ ...{}, ref: ("toast"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        ({}({ ...{}, ref: ("toast"), }));
        // @ts-ignore
        (__VLS_ctx.toast);
        const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["alignSelfCenter"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["flexColumn"];
        __VLS_styleScopedClasses["sub"];
    }
    var __VLS_slots;
    // @ts-ignore
    [toast,];
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            ToastMessage: ToastMessage,
            Fieldset: Fieldset,
            Divider: Divider,
            name: name,
            description: description,
            video: video,
            files: files,
            toast: toast,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
