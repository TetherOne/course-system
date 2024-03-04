const hostname = '127.0.0.1';
const port = 8000;
const URL = `http://${hostname}:${port}`;



Vue.createApp({
    data() {
        return {
            teacherProfile: `
                <header class="flex-row"">
                    <img src="#" alt="Фото">
                    <div class="flex-column">
                        <div class="label">{surname} {name} {fatherName}</div>
                        <div class="label">Факультет: {faculty}</div>    
                    </div> 
                </header>
                <div class="courses flex-column">
                    <div>Курс 1</div>
                    <div>Курс 2</div>
                    <div>Курс 3</div>
                </div>
            `
        }
    },
    methods: {
        loadTeacher() {
            const id = document.getElementById('teacherInput').value;
            fetch(`${URL}/api/teacher-profiles/${id}/?format=json`).then(
                response => {
                    return response.json();
                }
            ).then(
                json => {
                    document.getElementById('content').innerHTML = this.teacherProfile
                        .replace('{surname}', json.surname)
                        .replace('{fatherName}', json.father_name)
                        .replace('{faculty}', json.faculty);
                }
            );
        },
        loadCurses() {
            
        }
    }
}).mount('#app');