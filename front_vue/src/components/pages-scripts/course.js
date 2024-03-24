import {getCourseInfo, getModuleVideos, getTeacherInfo} from "../../requests.js";
import axios from "axios";
import {frontURL} from "../../config.js";

export default {
    data() {
        return {
            id: this.$route.params.id,
            info: {},
            teacherInfo: {},
            modules: []
        }
    },
    async created() {
        this.info = await getCourseInfo(this.id);
        this.teacherInfo = await getTeacherInfo(this.info.teacher_profile);


        axios.get(`${frontURL}/api/courseapp/modules/?course=${this.id}&format=json`).then(
            response => {
                this.modules = response.data;
                let i = 1;
                this.modules.forEach(lesson => {
                    lesson.number = i++;
                })
            }
        ).then(
            _ => {
                this.modules.forEach(async module => {
                    module.videos = await getModuleVideos(module.id);
                })
            }
        )
    },
    methods: {
        toggleVideos(index) {
            this.modules[index].showVideos = !this.modules[index].showVideos;
        }
    },
}