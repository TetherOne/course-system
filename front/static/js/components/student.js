import { frontURL } from "../server.js";



export const student = {
    template: `
        <header class="flex-row">
            <img src="{{avatar_src}}" alt="Фото">
            <div id="user-info" class="flex-column">
                <a class="label" href="/student/{{id}}">{{surname}} {{name}} {{fatherName}}</a>
                <div class="label">{{faculty}}</div>
                <div class="label">{{email}}</div>
            </div>
            <div class="spacer"></div>
            <button v-if="isStudent">Ввести код курса</button>
            <button>Искать</button> <!-- Кого искать? -->
        </header>
        <div class="flex-row">
            <div v-if="isStudent">Моё обучение</div>
            <div class="flex-row">
                <img src="/magnifiers.png" alt="Поиск">
                <input type="text" name="" id="" placeholder="Название курса">
            </div>
        </div>
        <div>
            <div>Мои курсы:</div>
            <div v-for="course in courses">
                <div>{{course.name}}</div>
                <div>{{course.description}}</div>
            </div>
        </div>
    `,
    data() {
        return {
            surname: '{surname}',
            name: '{name}',
            fatherName: '{fatherName}',
            faculty: '{faculty}',
            email: '{email}',
            courses: [],
            isStudent: localStorage.role === 'student',
            isTeacher: localStorage.role === 'teacher',
            id: localStorage.id
        }
    },
    methods: {

    },
    created() {
        if (localStorage.logged !== '1') {
            window.location.pathname = '/registration';
            return;
        }

        const id = localStorage.id;
        console.log(id);
        fetch(`${frontURL}/get_student/${id}`).then(
            response => {
                return response.json()
            }
        ).then(
            json => {
                this.surname = json.surname;
                // this.name = json.name // Пока не реализовано
                this.fatherName = json.father_name;
            }
        );
    }
};