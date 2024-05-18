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

const attributeName: ComputedRef<string> = computed((): string => props.avatarPath ? 'image' : 'label');
const attributeValue: ComputedRef<string> = computed((): string => 'f');
</script>

<template>
    <Avatar :[attributeName]="attributeValue" :size="size" shape="circle"/>
</template>