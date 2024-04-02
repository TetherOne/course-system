<script>
import {
    getCourseCheckPoints,
    getCourseStudents,
    getStudentPassedCheckPoints
} from '../../requests.js';


export default {
    data() {
        return {
            courseId: this.$route.params.id,
            students: [],
            checkPoints: []
        }
    },

    created() {
        this.loadData();
    },

    methods: {
        async loadData() {
            this.students = await getCourseStudents(this.courseId);
            this.checkPoints = await getCourseCheckPoints(this.courseId);

            await this.setGrades();
        },

        async getStudentScore(studentId, checkPointId) {
            let checkPoint = await getStudentPassedCheckPoints(studentId);
            checkPoint = checkPoint.filter(cp => {
                return cp.checkpoint == checkPointId;
            });

            if (checkPoint.length > 0) {
                return checkPoint[0].grade;
            } else {
                return '-';
            }
        },

        async setGrades() {
            for (const student of this.students) {
                student.checkPoints = [];
                for (const checkPoint of this.checkPoints) {
                    student.checkPoints.push(await this.getStudentScore(student.id, checkPoint.id));
                }
            }
        }
    }
}
</script>


<template>
    <div class="container">
        <table>
            <tr>
                <th>Студент</th>
                <th>Факультет</th>
                <th>Группа</th>
                <th v-for="checkPoint in checkPoints">
                    <a :href="`/checkPoint/${checkPoint.id}`">КТ {{ checkPoint.number }}</a>
                </th>
            </tr>
            <tr v-for="student in students">
                <td>{{student.surname}} {{student.name}} {{student.fatherName}}</td>
                <td>{{student.faculty}}</td>
                <td>{{student.group}}</td>
                <td v-for="grade in student.checkPoints">{{grade}}</td>
            </tr>
        </table>
    </div>
</template>


<style scoped>

</style>