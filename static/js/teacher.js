import { URL } from '/static/js/server.js';
import { Path } from '/static/js/path.js';



Vue.createApp({
    data() {
        return {
            surname: null,
            name: null,
            father_name: null,
            faculty: null,
            coursesList: document.createElement('div')
        }
    },
    created() {
        const id = Path.getLastElement(window.location.pathname);

        fetch(`${URL}/api/teacher-profiles/${id}/?format=json`).then(
            response => response.json()
        ).then(
            json => {
                this.surname = json.surname;
                this.father_name = json.father_name;
                this.faculty = json.faculty;

                return fetch(`${URL}/api/courses/?format=json`);
            }
        ).then(
            response => response.json()
        ).then(
            courses => {
                this.coursesList.id = 'courses-list';

                const N = courses.length;

                for (let i = 0; i < N; i++) {
                    if (courses[i].teacher_profile === i) {
                        this.coursesList.innerHTML += `
                            <div class="label">
                                ${courses[i].description};
                            </div>
                        `;
                    }
                }

                document.body.append(this.coursesList);
            }
        )
    }
}).mount('body');