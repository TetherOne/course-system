import { getLesson, getLessonOtherFiles } from "../../requests.js";

export default {
    data() {
        return {
            name: '__lessonName__',
            description: '__lessonDescription__',
            video: '__videoPath__',
            otherFiles: [] // links
        }
    },
    computed: {
        courseId() {
            return this.$route.params.courseId;
        },
        id() {
            return this.$route.params.lessonId;
        },
        lessonNumber() {
            return `${this.courseId}. ${this.id}.`;
        }
    },
    async created() {
        const lesson = await getLesson(this.id);
        this.name = lesson.lesson_name;
        this.description = lesson.description;
        this.video = lesson.video;

        const otherFiles = await getLessonOtherFiles(this.id);
        otherFiles.forEach(file => {
            this.otherFiles.push(file.other_file);
        });
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        shortenLink(link) {
            return link.substring(0, 20) + '...';
        }
    }
}