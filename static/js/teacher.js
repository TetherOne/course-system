import { URL } from '/static/js/server.js';
import { Path } from '/static/js/path.js';



Vue.createApp({
    data() {
        return {
            surname: 'surname',
            name: 'name',
            father_name: 'father_name',
            faculty: 'faculty',
            coursesList: []
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
                const N = courses.length;

                for (let i = 0; i < N; i++) {
                    if (courses[i].teacher_profile == id) {
                        this.coursesList.push(courses[i].description);
                    }
                }
            }
        )
    }
}).mount('body');