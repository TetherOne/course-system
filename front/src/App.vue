<script>
import Header from './components/elements/Header.vue';
import {
    useUserStore
} from './stores/user.js';

import {
    getStudent,
    getStudentCourses,
    getTeacher,
    getTeacherCourses
} from './requests.js';

import {
    studentRole,
    teacherRole
} from './stores/user.js';


const stdAvatar = './src/assets/avatar.png';


export default {
    components: {
        Header
    },

    setup() {
        const user = useUserStore();

        return {
            user
        }
    },

    created() {
        this.loadAllData();
    },

    methods: {
        loadAllData() {
            this.loadUserInfo();
            this.loadCourses();
        },

        async loadUserInfo() {
            let info;
            const id = this.user.id;

            switch (this.user.role) {
                case studentRole:
                    info = await getStudent(id);
                    this.user.group = info.group;

                    break;
                case teacherRole:
                    info = await getTeacher(id);

                    break;
            }

            this.user.surname = info.surname;
            this.user.name = info.name;
            this.user.fatherName = info.fatherName;
            this.user.faculty = info.faculty;
            this.user.avatar = info.avatar === null ? stdAvatar : info.avatar;
        },

        async loadCourses() {
            const id = this.user.id;
            switch (this.user.role) {
                case studentRole:
                    this.user.courses = await getStudentCourses(id);

                    break;
                case teacherRole:
                    this.user.courses = await getTeacherCourses(id);

                    break;
            }
        }
    }
}
</script>


<template>
    <div id="page-wrapper" class="flex-column">
        <Header/>
        <router-view/>
    </div>
</template>


<style scoped>

</style>