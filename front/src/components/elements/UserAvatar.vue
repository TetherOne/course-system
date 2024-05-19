<script setup lang="ts">
import {
    ComputedRef,
    computed
} from 'vue';

import Avatar from 'primevue/avatar';



interface Props {
    size: 'normal' | 'large' | 'xlarge';
    avatarPath: string | null;
    name: string | null;
}



const props = defineProps<Props>();

const attributeName: ComputedRef<string> = computed((): string => {
    if (props.avatarPath)
        return 'image'
    else if (props.name)
        return 'label'
    else
        return 'icon'
});
const attributeValue: ComputedRef<string> = computed((): string => {
    if (props.avatarPath)
        return props.avatarPath;
    else if (props.name)
        return props.name.slice(0, 1);
    else
        return 'pi pi-user';
});
</script>

<template>
    <Avatar :[attributeName]="attributeValue" :size="size" shape="circle"/>
</template>