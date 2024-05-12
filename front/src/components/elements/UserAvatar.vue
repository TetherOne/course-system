<script setup lang="ts">
import Avatar from 'primevue/avatar';

import {
    AvatarSize
} from '#types';

import useUserStore from '#store';



interface Props {
    size: AvatarSize
}



const props = defineProps<Props>();

const user = useUserStore();
</script>

<template>
    <Avatar v-if="user.hasAvatar" :image="<string>user.avatar" :size="props.size" shape="circle"/>
    <Avatar v-else :label="user.firstLetterOfName" :size="props.size" shape="circle"/>
</template>