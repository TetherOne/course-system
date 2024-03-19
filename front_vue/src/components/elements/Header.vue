<script setup>

</script>

<script>
export default {
    props: {
        userRole: {
            type: String,
            required: true,
            default: 'guest'
        },
        userInfo: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div id="header" class="flex-row">
        <img class="avatar" src="./../../assets/avatar.png" alt="Аватар">
        <div class="label">
            {{ userInfo.surname }}
            {{ `${userInfo.name}` }}
            {{ `${userInfo.father_name}` }}
        </div>
        <div class="spacer"></div>
        <button>Сменить тему</button>
        <button>Настройки</button>
    </div>
</template>

<style scoped>
#header {
    background-color: #323232;
    gap: 10px;
    padding: 10px;
    align-items: center;
    align-self: stretch;
}

.label {
    background-color: #f6f6f6;
    padding: 5px;
    border-radius: 5px;
}

.avatar {
    width: 40px;
    height: 40px;
}
</style>