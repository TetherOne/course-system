/* __placeholder__ */
import { useUserStore } from '#store';
import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const user = useUserStore();
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
    __VLS_components.Panel;
    __VLS_components.Panel;
    __VLS_components.Panel;
    __VLS_components.Panel;
    // @ts-ignore
    [Panel, Panel,];
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.template;
    __VLS_intrinsicElements.div;
    __VLS_intrinsicElements.div;
    __VLS_components.Avatar;
    __VLS_components.Avatar;
    // @ts-ignore
    [Avatar,];
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    __VLS_components.RouterLink;
    __VLS_components.routerLink;
    // @ts-ignore
    [RouterLink, RouterLink,];
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    __VLS_components.Button;
    // @ts-ignore
    [Button, Button,];
    {
        const __VLS_0 = {}.Panel;
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, }));
        ({}.Panel);
        ({}.Panel);
        const __VLS_2 = __VLS_1({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{}, }));
        {
            const __VLS_5 = __VLS_intrinsicElements["template"];
            const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
            const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({ ...{}, }));
            {
                (__VLS_3.slots).header;
                {
                    const __VLS_9 = __VLS_intrinsicElements["div"];
                    const __VLS_10 = __VLS_elementAsFunctionalComponent(__VLS_9);
                    const __VLS_11 = __VLS_10({ ...{}, class: ("flexRow alignCenter"), }, ...__VLS_functionalComponentArgsRest(__VLS_10));
                    ({}({ ...{}, class: ("flexRow alignCenter"), }));
                    {
                        const __VLS_14 = {}.Avatar;
                        const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ ...{}, image: ((__VLS_ctx.user.hasAvatar ? __VLS_ctx.user.avatar : null)), label: ((__VLS_ctx.user.hasAvatar ? null : __VLS_ctx.user.nameFirstLetter)), shape: ("circle"), size: ("large"), }));
                        ({}.Avatar);
                        const __VLS_16 = __VLS_15({ ...{}, image: ((__VLS_ctx.user.hasAvatar ? __VLS_ctx.user.avatar : null)), label: ((__VLS_ctx.user.hasAvatar ? null : __VLS_ctx.user.nameFirstLetter)), shape: ("circle"), size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_15));
                        ({}({ ...{}, image: ((__VLS_ctx.user.hasAvatar ? __VLS_ctx.user.avatar : null)), label: ((__VLS_ctx.user.hasAvatar ? null : __VLS_ctx.user.nameFirstLetter)), shape: ("circle"), size: ("large"), }));
                        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
                    }
                    {
                        const __VLS_19 = {}.RouterLink;
                        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ ...{}, to: ((__VLS_ctx.user.profileLink)), }));
                        ({}.RouterLink);
                        ({}.RouterLink);
                        const __VLS_21 = __VLS_20({ ...{}, to: ((__VLS_ctx.user.profileLink)), }, ...__VLS_functionalComponentArgsRest(__VLS_20));
                        ({}({ ...{}, to: ((__VLS_ctx.user.profileLink)), }));
                        (__VLS_ctx.user.fullName);
                        (__VLS_22.slots).default;
                        const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
                    }
                    (__VLS_12.slots).default;
                    const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_9, __VLS_11);
                }
                // @ts-ignore
                [user, user, user, user, user, user,];
            }
        }
        {
            const __VLS_24 = __VLS_intrinsicElements["template"];
            const __VLS_25 = __VLS_elementAsFunctionalComponent(__VLS_24);
            const __VLS_26 = __VLS_25({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            ({}({ ...{}, }));
            {
                (__VLS_3.slots).icons;
                {
                    const __VLS_28 = {}.Button;
                    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({ ...{}, icon: ("pi pi-cog"), }));
                    ({}.Button);
                    const __VLS_30 = __VLS_29({ ...{}, icon: ("pi pi-cog"), }, ...__VLS_functionalComponentArgsRest(__VLS_29));
                    ({}({ ...{}, icon: ("pi pi-cog"), }));
                    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_28, __VLS_30);
                }
                {
                    const __VLS_33 = {}.Button;
                    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({ ...{}, icon: ("pi pi-sign-out"), }));
                    ({}.Button);
                    const __VLS_35 = __VLS_34({ ...{}, icon: ("pi pi-sign-out"), }, ...__VLS_functionalComponentArgsRest(__VLS_34));
                    ({}({ ...{}, icon: ("pi pi-sign-out"), }));
                    const __VLS_36 = __VLS_pickFunctionalComponentCtx(__VLS_33, __VLS_35);
                }
            }
        }
        const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses["flexRow"];
        __VLS_styleScopedClasses["alignCenter"];
    }
    var __VLS_slots;
    return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
    setup() {
        return {
            Panel: Panel,
            Avatar: Avatar,
            Button: Button,
            user: user,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
