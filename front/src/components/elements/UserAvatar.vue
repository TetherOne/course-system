<script setup lang="ts">
import Avatar from 'primevue/avatar';

import { AvatarSize } from '#types';



interface Props {
    path: string | null,
    size: AvatarSize
}



const props = defineProps<Props>();
</script>

<template>
    <Avatar v-if="path" :image="<string>path" :size="props.size" shape="circle"/>
    <Avatar v-else icon="pi pi-user" :size="props.size" shape="circle"/>
</template>