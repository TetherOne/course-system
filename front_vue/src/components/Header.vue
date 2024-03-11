<script setup>

</script>

<script>
export default {
    props: [
        'role',
        'surname',
        'name',
        'fatherName',
        'faculty'
    ]
}
</script>

<template>
    <div class="profile-header flex-row">
        <div class="flex-column spacer">
            <div class="flex-row">
                <div class="label">{{ surname }} {{ name }} {{ fatherName }}</div>
                <div class="spacer"></div>
                <button class="btn profile-header-btn">Выход</button>
            </div>
            <div class="flex-row">
                <div class="label">{{ faculty }}</div>
                <div class="spacer"></div>
                <button class="btn profile-header-btn">Смен. тем.</button>
                <button class="btn profile-header-btn">Настр.</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-header {
    background-color: #323232;
    padding: 10px;
}
</style>