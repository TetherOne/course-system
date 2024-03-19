<script setup>
import Header from '../elements/Header.vue';
</script>

<script>
import {getStudentInfo} from './../../requests.js';


export default {
    data() {
        return {
            info: {}
        }
    },
    created() {
        getStudentInfo(this.$root.$data.userId).then(
            info => {
                this.info = info;
            }
        );
    }
}
</script>

<template>
    <div id="student-wrapper" class="flex-column">
        <Header userRole="student" :userInfo="info"></Header>
        <div class="flex-row">
            <div>Моё обучение</div>
        </div>
    </div>
</template>

<style scoped>

</style>