<script setup lang="ts">
import Avatar from 'primevue/avatar';

import {
    computed,
    ComputedRef
} from 'vue';



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
    <Avatar :[attributeName]="attributeValue" :size="size"/>
</template>

<style scoped>

</style>