<script setup lang="ts">
import {
    Ref,
    ref,
    inject
} from 'vue';

import {
    Router,
    useRouter
} from 'vue-router';

import { AxiosError } from 'axios';

import { useConfirm } from 'primevue/useconfirm';

import Button from 'primevue/button';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload, { FileUploadUploaderEvent } from 'primevue/fileupload';

import useUserStore from '#store';

import {
    Notice,
    ErrorHandler,
    Course
} from '#types';

import { courseApp } from '#requests';



interface Props {
    course: Course;
}



const user = useUserStore();


const noticeSuccess: Notice = inject('noticeSuccess') as Notice;
const noticeError: Notice = inject('noticeError') as Notice;

const handleRequestError: ErrorHandler = inject('handleRequestError') as ErrorHandler;


const router: Router = useRouter();

const props = defineProps<Props>();

const enrollFormVisible: Ref<boolean> = ref(false);
const password: Ref<string> = ref('');

const confirm = useConfirm();

const newData = ref({
    dialog: false,
    name: '',
    desc: '',
    reset() {
        this.name = props.course.course_name;
        this.desc = props.course.description;
    },
    show() {
        this.reset();
        this.dialog = true;
    },
    close() {
        this.dialog = false;
    },
    async save() {
        if (!this.name) {
            noticeError('Название курса обязательно');
            return;
        }

        try {
            const course: Course = await courseApp.updateCourse(props.course.id, {
                course_name: this.name,
                description: this.desc
            });

            props.course.course_name = course.course_name;
            props.course.description = course.description;

            this.close();
            noticeSuccess('Информация обновлена');
        } catch (error) {
            const err: AxiosError = error as AxiosError;
            noticeError(`Ошибка ${err.response?.status}`);
        }
    }
});



function confirmCourseDeletion(): void {
    confirm.require({
        header: 'Удаление курса',
        icon: 'pi pi-trash',
        message: `Вы уверены, что хотите удалить курс "${props.course.course_name}"?`,
        rejectClass: 'p-button-success p-button-outlined',
        rejectLabel: 'Оставить',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Удалить',
        async accept() {
            await handleCourseDeletion();
        }
    });
}

async function handleCourseDeletion(): Promise<void> {
    try {
        await courseApp.deleteCourse(props.course.id);
        router.go(0);
    } catch (error) {
        await handleRequestError(error as AxiosError);
    }
}

async function handleEnrollment(): Promise<void> {
    if (!password.value) {
        return;
    }

    try {
        await courseApp.enroll(user.id, props.course.id, password.value);
        props.course.studentHasIt = true;
        enrollFormVisible.value = false;
        noticeSuccess('Вы были успешно зачислены на курс');
    } catch (error) {
        const err: AxiosError = error as AxiosError;
        if (err.response?.status === 400) {
            noticeError('Неверный пароль');
        } else {
            await handleRequestError(error as AxiosError);
        }
    }
}

async function changeAvatar(event: FileUploadUploaderEvent): Promise<void> {
    const image: File = (event.files as File[])[0];console.log(image)
    try {
        const course: Course = await courseApp.updateCourse(props.course.id, { image } as unknown as Course);
        props.course.image = course.image;
        noticeSuccess('Превью изменено');
    } catch (error) {
        const err: AxiosError = error as AxiosError;
        noticeError(`Ошибка ${err.status}\n${err.message}`, 'Не удалось изменить превью');
    }
}
</script>

<template>
    <Card>
        <template #header>
            <img v-if="course.image" :src="course.image" alt="Ава курса">
            <img v-else src="./../../assets/courseDefaultImage.png" alt="Ава курса">
        </template>
        <template #title>
            <router-link :to="{ name: 'course', params: { id: course.id } }">
                {{ props.course.course_name }}
            </router-link>
            <Button v-if="user.isTeacher" icon="pi pi-pencil" text v-tooltip="'Редактировать'"
                    @click="newData.show()"/>
            <Button v-if="user.isTeacher" icon="pi pi-trash" text v-tooltip="'Удалить курс'"
                    @click="confirmCourseDeletion"/>
        </template>
        <template v-if="course.teacherShortName" #subtitle>
            <router-link :to="{ name: 'teacher', params: { id: course.teacher_profile } }">
                {{ course.teacherShortName }}
            </router-link>
        </template>
        <template #content>
            <ScrollPanel v-if="course.description" style="width: 100%; height: 15vh;">
                {{ course.description }}
            </ScrollPanel>
            <div v-else>
                Пока нет описания...
            </div>
        </template>
        <template v-if="course.studentHasIt !== undefined" #footer>
            <Button v-if="course.studentHasIt" icon="pi pi-check" v-tooltip="'Вы зачислены на этот курс'" text/>
            <Button v-else icon="pi pi-user-plus" text v-tooltip="'Ввести пароль для зачисления'"
                    @click="enrollFormVisible=true"/>
        </template>
    </Card>
    <ConfirmDialog/>
    <Dialog v-model:visible="enrollFormVisible" modal header="Зачисление на курс">
        <div class="flexColumn alignStretch">
            <div>Для доступа к курсу введите пароль</div>
            <InputText v-model="password" :invalid="!password"/>
        </div>
        <template #footer>
            <Button label="Отмена" severity="danger" outlined @click="password='';enrollFormVisible=false;"/>
            <Button label="Отправить" severity="success" @click="handleEnrollment"/>
        </template>
    </Dialog>
    <Dialog v-model:visible="newData.dialog" modal header="Редактирование курса">
        <div class="flexColumn alignStretch">
            <div class="alignSelfCenter">
                <FileUpload mode="basic" auto accept="image/*" chooseLabel="Превью курса" customUpload @uploader="changeAvatar" />
            </div>
            <InputText v-model="newData.name" placeholder="Название курса"/>
            <Textarea v-model="newData.desc" placeholder="Описание курса" rows="10" cols="50" autoResize />
        </div>
        <template #footer>
            <Button label="Отмена" severity="danger" outlined @click="newData.close()" />
            <Button label="Сохранить" severity="success" @click="newData.save()" />
        </template>
    </Dialog>
</template>

<style scoped lang="scss">
@import './../../style';

.p-card {
    width: 19vw;
    height: 52vh;
    overflow: hidden;
}

:deep(.p-card-header) {
    height: 187px;
}

:deep(.p-card-title) {
    @extend .flexRow;
    @extend .justifyBetween;
    @extend .alignCenter;
}

:deep(.p-card-content) {
    height: 15vh;
}

img {
    width: 100%;
    height: 100%;
}

:deep(.p-dialog-content) {
    width: 200px;
}
</style>