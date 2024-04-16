<script>
import Header from '#elements/Header';
import { useUserStore } from '#store';
import { API } from '#classes/api';


export const UserRoles = {
    Guest: 0,
    Student: 1,
    Teacher: 2
};

export default {
    name: 'App',
    components: { Header },
    setup() {
        const user = useUserStore();

        return {
            user
        };
    },
    created() {
        this.loadUserData();
    },
    methods: {
        async loadUserData() {
            let data = {};
            const id = this.user.id;

            if (this.user.isStudent) {
                data = await API.student(id);
                this.user.group = data.group;
            } else if (this.user.isTeacher) {
                data = await API.teacher(id);
            }

            this.user.surname = data.surname;
            this.user.name = data.name;
            this.user.fatherName = data.father_name === null ? '' : data.father_name;
            this.user.faculty = data.faculty;
            this.user.avatar = data.avatar;
        }
    }
};
</script>

<template>
    <Header/>
    <router-view/>
</template>

<style scoped>

</style>