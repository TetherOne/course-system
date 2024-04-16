<script>
import Panel from 'primevue/panel';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

import { useUserStore } from '#store';

import {
    studentPath,
    teacherPath
} from '#router';

import { UserRoles } from '#app';


export default {
    name: 'Header',
    components: {
        Panel,
        Avatar,
        Button
    },
    setup() {
        const user = useUserStore();

        return {
            user
        };
    },
    computed: {
        userHasAvatar() {
            return this.user.avatar !== null;
        },
        profileLink() {
            switch (this.user.role) {
                case UserRoles.Student:
                    return studentPath;
                case UserRoles.Teacher:
                    return teacherPath.replace(':id', this.user.id);
            }
        }
    }
};
</script>

<template>
    <Panel>
        <template #header>
            <div class="flex-row align-items-center">
                <Avatar v-if="userHasAvatar" :image="user.avatar" size="large" shape="circle"/>
                <Avatar v-if="!userHasAvatar" :label="user.nameFirstLetter" size="large" shape="circle"/>
                <router-link :to="profileLink" id="user-name">{{ user.fullName }}</router-link>
            </div>
        </template>

        <template #icons>
            <div class="flex-row">
                <Button icon="pi pi-cog"/>
                <Button icon="pi pi-moon"/>
                <Button icon="pi pi-sign-out"/>
            </div>
        </template>
    </Panel>
</template>

<style scoped>
.p-panel {
    background-color: var(--green);

    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

#user-name {
    color: white;
}
</style>