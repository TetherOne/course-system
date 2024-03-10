import express from 'express';
import fileSystem from 'fs';

import {
    hostName,
    djangoURL,
    frontPort,
    frontURL
} from "./static/js/server.js";


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


app.use(express.static('static/img'));
app.use(express.static('static/css'));
app.use(express.static('static/js'));


app.post('/signUp*', (request, response) => {
    // const newUser = {
    //     username: decodeURIComponent(request.query.login),
    //     email: decodeURIComponent(request.query.email),
    //     password: decodeURIComponent(request.query.password),
    //     is_teacher: request.query.isTeacher
    // };
    const newUser = {
        email: request.query.email,
        username: request.query.login,
        password: request.query.password,
        is_teacher: request.query.isTeacher
    };
    const newUserJSON = encodeURIComponent(JSON.stringify(newUser));
    fetch(`${djangoURL}/api/users/${newUserJSON}`, {
        method: 'POST'
    });
});

app.get('/getUserInfo*', (request, response) => {
    const login = decodeURIComponent(request.query.login);
    const password = decodeURIComponent(request.query.password);
    fetch(`${djangoURL}/api/users`).then(

    )
});

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
    fileSystem.promises.readFile('root.html', 'utf8').then(
        data => response.send(data)
    );
});


app.listen(frontPort, hostName, () => {
    console.log(`Сервер начал приём запросов по адресу ${frontURL}\n`);
});