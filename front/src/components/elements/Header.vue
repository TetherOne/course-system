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
    <Panel class="alignSelfStretch">
        <template #header>
            <div class="flexRow alignCenter">
                <Avatar v-if="userHasAvatar" :image="user.avatar" size="large" shape="circle"/>
                <Avatar v-if="!userHasAvatar" :label="user.nameFirstLetter" size="large" shape="circle"/>
                <router-link :to="profileLink" id="userName">{{ user.fullName }}</router-link>
            </div>
        </template>

        <template #icons>
            <div class="flexRow">
                <Button icon="pi pi-cog"/>
                <Button icon="pi pi-moon"/>
                <Button icon="pi pi-sign-out"/>
            </div>
        </template>
    </Panel>
</template>

<style scoped>
.p-panel {
    background-color: var(--primary-color);

    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

#userName {
    color: white;
}
</style>