<!--<script>-->
<!--import { useUserStore } from '#store';-->
<!--import { Toasts } from '#app';-->

<!--import Fieldset from 'primevue/fieldset';-->
<!--import Button from 'primevue/button';-->
<!--import Divider from 'primevue/divider';-->
<!--import Card from 'primevue/card';-->

<!--import { API_URL } from '#classes/API';-->
<!--import { Path } from '#classes/Path';-->


<!--export default {-->
<!--    name: 'Lesson',-->
<!--    components: {-->
<!--        Fieldset,-->
<!--        Button,-->
<!--        Divider,-->
<!--        Card-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            id: parseInt(this.$route.params.id),-->
<!--            name: '_lessonName_',-->
<!--            description: '_lessonDescription_',-->
<!--            video: '_videoPath_',-->
<!--            files: []-->
<!--        };-->
<!--    },-->
<!--    setup() {-->
<!--        const user = useUserStore();-->

<!--        return {-->
<!--            user,-->
<!--            Path-->
<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        async loadData() {-->
<!--            try {-->
<!--                const lesson = await API_URL.lesson(this.id);-->

<!--                this.name = lesson.lesson_name;-->
<!--                this.description = lesson.description;-->
<!--                this.video = lesson.video;-->
<!--                this.files = await API_URL.lessonFiles(this.id);-->
<!--            } catch (error) {-->
<!--                this.user.showToast(Toasts.Error, `Ошибка загрузки урока:\n${error}`);-->
<!--            }-->
<!--        }-->
<!--    },-->
<!--    created() {-->
<!--        this.loadData();-->
<!--    }-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--    <Fieldset :legend="name">-->
<!--        <div class="flex-column">-->
<!--            <Card>-->
<!--                <template #header>Информация:</template>-->
<!--                <template #content>{{ description }}</template>-->
<!--            </Card>-->
<!--            <Divider/>-->
<!--            <video v-if="video" width="320" height="240" controls>-->
<!--                <source :src="video">-->
<!--            </video>-->
<!--            <div class="flex-column" v-if="files.length">-->
<!--                <div>Дополнительно:</div>-->
<!--                <a class="sub" v-for="file in files" :href="file.other_file">{{ Path.getLastElement(file.other_file) }}</a>-->
<!--            </div>-->
<!--        </div>-->
<!--    </Fieldset>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->