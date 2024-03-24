import {
    getTeacherCourses,
    getTeacherInfo
} from '../../requests.js';


export default {
    data() {
        return {
            id: this.$route.params.id,
            avatar: '__avatar__',
            surname: '__surname__',
            name: '__name__',
            fatherName: '__fatherName__',
            courses: []
        }
    },
    async created() {
        const teacherInfo = await getTeacherInfo(this.id);
        this.surname = teacherInfo.surname;
        this.name = teacherInfo.name;
        this.fatherName = teacherInfo.father_name;
        this.avatar = teacherInfo.avatar;

        this.courses = await getTeacherCourses(this.id);
    }
}