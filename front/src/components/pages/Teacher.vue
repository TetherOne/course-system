<!--<script>-->
<!--import CoursesList from '#elements/CoursesList';-->
<!--import { UserRoles } from '#app';-->
<!--import Avatar from 'primevue/avatar';-->
<!--import { useUserStore } from '#store';-->
<!--import { API_URL } from '#classes/API';-->


<!--export default {-->
<!--    name: 'Teacher',-->
<!--    components: {-->
<!--        CoursesList,-->
<!--        Avatar-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            id: parseInt(this.$route.params.id),-->
<!--            surname: '_surname_',-->
<!--            name: '_name_',-->
<!--            fatherName: '_fatherName_',-->
<!--            faculty: '_faculty_',-->
<!--            avatar: '_avatarPath_'-->
<!--        }-->
<!--    },-->
<!--    setup() {-->
<!--        const user = useUserStore();-->

<!--        return {-->
<!--            UserRoles,-->
<!--            user-->
<!--        };-->
<!--    },-->
<!--    async created() {-->
<!--        if (this.user.role === UserRoles.Student) {-->
<!--            try {-->
<!--                const teacher = await API_URL.teacher(this.id);-->

<!--                this.surname = teacher.surname;-->
<!--                this.name = teacher.name;-->
<!--                this.fatherName = teacher.father_name;-->
<!--                this.faculty = teacher.faculty;-->
<!--                this.avatar = teacher.avatar;-->
<!--            } catch (error) {-->
<!--                this.user.showToast(Toasts.Error, `Ошибка загрузки информации о преподавателе:\n${error}`);-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--    <div class="flexColumn" v-if="user.role === UserRoles.Student">-->
<!--        <div class="flexRow">-->
<!--            <Avatar v-if="avatar" :image="avatar" size="xlarge" shape="circle"/>-->
<!--            <Avatar v-if="!avatar" :label="name.slice(0, 1)" size="xlarge" shape="circle"/>-->
<!--            <span>-->
<!--                {{ surname }}-->
<!--                {{ name }}-->
<!--                {{ fatherName === null ? '' : fatherName }}-->
<!--            </span>-->
<!--        </div>-->
<!--        <div>-->
<!--            Факультет: {{ faculty }}-->
<!--        </div>-->
<!--    </div>-->
<!--    <CoursesList :pageUserRole="UserRoles.Teacher"/>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->