<script>
import { useUserStore } from '#store';
import { forbiddenPath } from '#router';
import { UserRoles } from '#app';
import CoursesList from '#elements/CoursesList';


export default {
    name: 'Student',
    components: { CoursesList },
    setup() {
        const user = useUserStore();

        return {
            user,
            UserRoles
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
    <CoursesList :page-user-role="UserRoles.Student"/>
</template>

<style scoped>

</style>