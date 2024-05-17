<script setup lang="ts">
import {
    ComputedRef,
    computed
} from 'vue';

import Avatar from 'primevue/avatar';



interface Props {
    size: 'normal' | 'large' | 'xlarge';
    avatarPath: string | null;
    name: string;
}



const props = defineProps<Props>();

const attributeName: ComputedRef<string> = computed((): string => props.avatarPath ? 'image' : 'label');
const attributeValue: ComputedRef<string> = computed((): string => props.avatarPath ? props.avatarPath : props.name.slice(0, 1));
</script>

<template>
    <Avatar :[attributeName]="attributeValue" :size="size" shape="circle"/>
</template>