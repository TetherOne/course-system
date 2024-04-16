<script>
import CoursesList from '#elements/CoursesList';
import { UserRoles } from '#app';
import Avatar from 'primevue/avatar';
import { useUserStore } from '#store';
import { API } from '#classes/api';


export default {
    name: 'Teacher',
    components: {
        CoursesList,
        Avatar
    },
    data() {
        return {
            id: parseInt(this.$route.params.id),
            surname: '_surname_',
            name: '_name_',
            fatherName: '_fatherName_',
            faculty: '_faculty_',
            avatar: '_avatarPath_'
        }
    },
    setup() {
        const user = useUserStore();

        return {
            UserRoles,
            user
        };
    },
    async created() {
        if (this.user.role === UserRoles.Student) {
            try
            const teacher = await API.teacher(this.id);

            this.surname
        }
    }
};
</script>

<template>
    <div class="flex-column">
        <div class="flex-row">
            <Avatar v-if="avatar" :image="avatar" size="xlarge" shape="circle"/>
            <Avatar v-if="!avatar" :label="name.slice(0, 1)" size="xlarge" shape="circle"/>
            <span>
                {{ surname }}
                {{ name }}
                {{ fatherName === null ? '' : fatherName }}
            </span>
        </div>
        <div>
            Факультет: {{ faculty }}
        </div>
    </div>
    <CoursesList :pageUserRole="UserRoles.Teacher"/>
</template>

<style scoped>

</style>