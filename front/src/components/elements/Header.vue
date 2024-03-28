<script setup>
import { useUserStore } from '../../stores/user.js';


const user = useUserStore();
</script>

<script>
export default {

}
</script>

<template>
    <div class="flex-row header">
        <img :src="user.info.avatar" alt="Ваш аватар" class="avatar">
        <div id="user-info" class="flex-column">
            <a :href="user.profileLink">{{ user.fullName }}</a>
            <div>{{ user.info.faculty }}</div>
            <div>{{ user.info.group }}</div>
        </div>
    </div>
</template>

<style scoped>
.header {
    align-self: stretch;
    background-color: #2b2d30;
    color: white;
    padding: var(--gap);
    align-items: center;
}

.header a {
    color: white;
}

#user-info {
    gap: 0;
}
</style>