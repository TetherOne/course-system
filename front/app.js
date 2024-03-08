import express from 'express';
import FS from 'fs';

import {
    hostname,
    djangoURL,
    frontPort,
    frontURL
} from "./static/js/server.js";
import {
    Path
} from './static/js/path.js';



const app = express();



function getStudentInfo(id) {
    return fetch(`${djangoURL}/api/student-profiles/${id}/?format=json`).then(
        response => response.json()
    );
}

function getCoursesList() {
    return fetch(`${djangoURL}/api/courses`).then(
        response => response.json()
    );
}

function getTeacherInfo(id) {
    return fetch(`${djangoURL}/api/teacher-profiles/${id}/?format=json`).then(
        response => response.json()
    );
}



app.use(express.static('static/css'));
app.use(express.static('static/js'));



app.get('/get_student_courses?*', async (req, res) => {
    const studentID = req.url.id;
    let courses = await getCoursesList();
    courses = courses.filter(course => course.student === studentID);
    courses.forEach(async course => {
        course.teacher = await getTeacherInfo(course.teacher_profile);
    })

    res.send(courses);
});

app.get('/get_student?*', (req, res) => {
    const id = req.query.id;
    console.log('Выведется только один раз')
    getStudentInfo(id).then(
        studentInfo => res.send(studentInfo)
    );
});

app.get('/*', (request, response) => {
    FS.promises.readFile('root.html', 'utf8').then(
        data => response.send(data)
    );
});


app.listen(frontPort, hostname, () => {
    console.log(`Сервер начал приём запросов по адресу ${frontURL}\n`);
});