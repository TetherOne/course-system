<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import {
    RouteLocationNormalizedLoaded,
    useRoute
} from 'vue-router';

import ScrollPanel from 'primevue/scrollpanel';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

import {
    PopUp,
    Teacher,
    Course
} from '#types';

import Header from '#elements/Header';
import UserAvatar from '#elements/UserAvatar';

import {
    getTeacher,
    getTeacherCourses,
    addCourse
} from '#requests';

import useUserStore from '#store';
import router from '#router';



const showWarn: PopUp = <PopUp>inject('warnPopUp');

const user = useUserStore();
const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(parseInt(<string>route.params.id));
const surname: Ref<string> = ref('')
const name: Ref<string> = ref('');
const fatherName: Ref<string> = ref('');
const faculty: Ref<string> = ref('');
const avatar: Ref<string> = ref('');
const courses: Ref<Course[]> = ref([]);

const newCourse = ref({
    dialogVisible: false,
    name: '',
    description: '',
    password: ''
});



async function start(): Promise<void> {
    try {
        const teacher: Teacher = await getTeacher(id.value);

        surname.value = teacher.surname;
        name.value = teacher.name;
        fatherName.value = teacher.father_name ?? '';
        faculty.value = teacher.faculty;
        avatar.value = teacher.avatar ?? '';
        courses.value = await getTeacherCourses(id.value);
    } catch (error) {

    }
}

async function handleAddingCourse(): Promise<void> {
    const data = newCourse.value;

    if (!data.name || !data.password) {
        showWarn('Не так быстро', 'Поля "Название" и "Пароль" обязательны');
        return;
    }

    try {
        await addCourse(data.name, data.description, id.value, '', data.password);
        router.go(0);
    } catch (error) {

    }
}



start();
</script>

<template>
    <div class="flexColumn alignCenter">
        <Header/>
        <div class="block width60 flexColumn">
            <div class="flexRow alignCenter">
                <UserAvatar :path="avatar" size="xlarge"/>
                <div>
                    {{ surname }} {{ name }} {{ fatherName }}
                </div>
            </div>
            <div>
                Факультет: {{ faculty }}
            </div>
        </div>
        <div class="block width60 flexColumn">
            <div class="upper flexRow alignCenter alignSelfCenter">
                <div v-if="user.isTeacher">
                    Мои курсы
                </div>
                <div v-else>
                    Курсы
                </div>
                <Button icon="pi pi-plus" rounded text @click="newCourse.dialogVisible = true"/>
            </div>
            <Divider/>
            <div class="coursesList flexRow">
                <Card v-for="course in courses">
                    <template #header>
                        <img v-if="course.image" :src="course.image" alt="Аватар курса">
                        <img v-else src="./../../assets/courseDefaultImage.png" alt="Аватар курса">
                    </template>
                    <template #title>
                        <router-link :to="{ name: 'course', params: { id: course.id } }">
                            {{ course.course_name }}
                        </router-link>
                    </template>
                    <template #content>
                        <ScrollPanel v-if="course.description" style="width: 100%; height: 200px;">
                            {{ course.description }}
                        </ScrollPanel>
                        <div v-else>
                            Пока нет информации о курсе...
                        </div>
                    </template>
                </Card>
            </div>
            <div v-if="!courses.length" class="alignSelfCenter">
                <div v-if="user.isTeacher">
                    У Вас пока нет курсов...
                </div>
                <div v-else>
                    У этого преподавателя пока нет курсов...
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="newCourse.dialogVisible" modal header="Новый курс">
        <div class="flexColumn">
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-book"/>
                </InputGroupAddon>
                <InputText v-model="newCourse.name" required placeholder="Название курса"/>
            </InputGroup>
            <Textarea v-model="newCourse.description" autoResize placeholder="Краткое описание курса"/>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-lock"/>
                </InputGroupAddon>
                <InputText v-model="newCourse.password" required placeholder="Пароль курса"/>
            </InputGroup>
            <div class="flexRow justifyEnd">
                <Button label="Отмена" severity="danger" @click="newCourse.dialogVisible = false"/>
                <Button label="Добавить" @click="handleAddingCourse"/>
            </div>
        </div>
    </Dialog>
</template>

<style scoped lang="scss">
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
</style>