import { frontURL } from "../server.js";



export const student = {
    template: `
        <header class="flex-row">
            <img src="{{avatar_src}}" alt="Фото">
            <div id="user-info" class="flex-column">
                <div class="label">{{ surname }} {{ name }} {{ fatherName }}</div>
                <div class="label">{{ faculty }}</div>
                <div class="label">{{ email }}</div>
            </div>
            <div class="spacer"></div>
            <button v-if="role === 'student'">Ввести код курса</button>
            <button>Искать</button> <!-- Кого искать? -->
        </header>
        <div class="flex-row">
            <div v-if="role === 'student'">Моё обучение</div>
            <div class="flex-row">
                <img src="/magnifiers.png" alt="Поиск">
                <input type="text" name="" id="" placeholder="Название курса">
            </div>
        </div>
        <div>
            <div>Мои курсы:</div>
            <div v-for="course in courses">
                <div>{{ course.name }}</div>
                <div>{{ course.description }}</div>
            </div>
        </div>
    `,
    data() {
        return {
            userInfo: {
                surname: '{surname}',
                name: '{name}',
                father_name: '{fatherName}',
            },
            faculty: '{faculty}',
            email: '{email}',
            courses: [],
            role: localStorage.role,
            id: localStorage.id
        }
    },
    methods: {

    },
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
            }
        );

        fetch(`${frontURL}/get_student_courses?${this.id}`).then(
            response => response.json()
        ).then(
            courses => {
                courses.forEach(course => {

                })
            }
        )
    }
};