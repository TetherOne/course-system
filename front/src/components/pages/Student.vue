<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';

import useUserStore from '#store';



const user = useUserStore();
</script>

<template>
    <div class="mainWrapper flexColumn">
        <div class="flexColumn container">
            <div class="flexRow alignCenter">
                <Avatar
                    :image="user.avatar ? user.avatar : null"
                    :label="!user.avatar ? user.name[0] : null"
                    size="xlarge" shape="circle"
                />
                <div>{{ user.fullName }}</div>
            </div>
            <div>Факультет: {{ user.faculty }}</div>
            <div>Группа: {{ user.group }}</div>
        </div>
        <div class="container">
            <Fieldset legend="Моё обучение">
                <div class="flexRow justifyCenter coursesCards">
                    <Card v-for="course in user.courses" class="courseCard">
                        <template #title>
                            <router-link :to="{ name: 'course', params: { id: course.id } }">
                                {{ course.name }}
                            </router-link>
                        </template>
                        <template #subtitle>
                            <router-link :to="{ name: 'teacher', params: { id: course.teacher?.id } }">
                                {{ course.teacher?.getShortName() }}
                            </router-link>
                        </template>
                        <template #content>
                            {{ course.description }}
                        </template>
                    </Card>
                </div>
                <div v-if="!user.courses.length">Пока нет курсов...</div>
            </Fieldset>
        </div>
    </div>
</template>

<style scoped lang="scss">
.p-fieldset {
    background-color: inherit;
}

:deep(.p-fieldset-legend) {
    background-color: inherit;
}
</style>