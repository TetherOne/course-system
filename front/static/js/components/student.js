import {frontURL} from "../server.js";


export const student = {
    template: `
        <div class="flex-column">
            <header class="profile-header flex-row">
                <img src="/avatar.png" alt="Фото" class="avatar">
                <div class="flex-column spacer">
                    <div class="flex-row"> 
                        <div class="label">{{ surname }} {{ name }} {{ father_name }}</div>
                        <div class="spacer"></div>
                        <button class="btn profile-header-btn">Выход</button>
                    </div>
                    <div class="flex-row"> 
                        <div class="label">{{ faculty }}</div>
                        <div class="spacer"></div>
                        <button class="btn profile-header-btn">Смен. тем.</button>
                        <button class="btn profile-header-btn">Настр.</button>
                    </div>
                </div>
            </header>
            <div id="learning" class="flex-column"> 
                <div id="learning-header" class="flex-row">
                    <div>Моё обучение</div>
                    <div class="spacer"></div>
                    <input type="text" class="input-text" placeholder="Название курса">
                </div>
                <div id="courses-list" class="flex-column">
                    <div class="course-wrap flex-row" v-for="course in courses"> 
                        <div class="label">
                            {{ course.course_name }}
                        </div>
                        <div class="spacer"></div>
                        <div class="label"> 
                            {{ course.teacherInfo }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            surname: '{surname}',
            name: '{name}',
            father_name: '{fatherName}',
            faculty: '{faculty}',
            email: '{email}',
            courses: [],
            role: localStorage.role,
            id: localStorage.id
        }
    },
    methods: {},
    created() {
        fetch(`${frontURL}/get_student?id=${this.id}`).then(
            response => {
                return response.json()
            }
        ).then(
            json => {
                this.surname = json.surname;
                this.name = json.name
                this.father_name = json.father_name;
                this.faculty = json.faculty;
            }
        );

        fetch(`${frontURL}/get_student_courses?id=${this.id}`).then(
            response => response.json()
        ).then(
            courses => {
                this.courses = courses;
            }
        );
    }
};