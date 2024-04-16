<script>
import { useUserStore } from '#store';
import { forbiddenPath } from '#router';
import { UserRoles } from '#app';


export default {
    name: 'Student',
    data() {
        return {

        }
    },
    setup() {
        const user = useUserStore();

        return {
            user,
            forbiddenPath
        };
    },
    methods: {
        handleVisit() {
            if (!this.user.isStudent) {
                this.$router.push(forbiddenPath);
            }
        }
    },
    created() {
        this.handleVisit();
    }
};
</script>

<template>

</template>

<style scoped>

</style>