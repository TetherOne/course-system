<script setup lang="ts">
import {
    Ref,
    ref
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    useRoute
} from 'vue-router';

import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

import {
    Course,
    Module
} from '#types';

import Header from '#elements/Header';

import useUserStore from '#store';

import {
    getCourse,
    getCourseModules,
    getTeacher
} from '#requests';

import {
    buildFullName
} from '#functions';
import ScrollPanel from 'primevue/scrollpanel';



const user = useUserStore();

const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const name: Ref<string> = ref('');
const description: Ref<string> = ref('');
const image: Ref<string> = ref('');
const modules: Ref<Module[]> = ref([]);
const teacherId: Ref<number> = ref(0);
const teacherFullName: Ref<string> = ref('');



async function start() {
    try {
        const course: Course = await getCourse(id.value);

        name.value = course.course_name;
        description.value = course.description ?? '';
        image.value = course.image ?? '';
        modules.value = await getCourseModules(id.value);

        teacherId.value = course.teacher_profile;
        teacherFullName.value = buildFullName(await getTeacher(teacherId.value));
    } catch (error) {

    }
}



start();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="block width60 flexRow alignStart">
            <Card>
                <template #header>
                    <img v-if="image" :src="image" alt="Аватар курса">
                    <img v-else src="./../../assets/courseDefaultImage.png" alt="Аватар курса">
                </template>
                <template #title>
                    <router-link :to="{ name: 'course', params: { id: id } }">
                        {{ name }}
                    </router-link>
                </template>
                <template v-if="user.isStudent" #subtitle>
                    <router-link :to="{ name: 'teacher', params: { id: teacherId } }">
                        {{ teacherFullName }}
                    </router-link>
                </template>
                <template #content>
                    <ScrollPanel v-if="description" style="width: 100%; height: 200px;">
                        {{ description }}
                    </ScrollPanel>
                    <div v-else>
                        Пока нет информации о курсе...
                    </div>
                </template>
            </Card>
            <Accordion>
                <AccordionTab v-for="(module, i) in modules" :header="`${i + 1}. ${module.name}`">

                </AccordionTab>
            </Accordion>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './../../style';

.p-card {
    width: 350px;
    overflow: hidden;
}

:deep(.p-card-content) {
    max-height: 200px;
}

img {
    width: 100%;
    height: auto;
}

.p-accordion {
    @extend .flexColumn;
    flex-grow: 1;
}

.block {
    gap: 50px;
}
</style>