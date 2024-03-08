import express from 'express';
import FS from 'fs';

import { hostname, djangoURL, frontPort, frontURL } from "./static/js/server.js";
import { Path } from './static/js/path.js';



const app = express();


app.use(express.static('static/css'));
app.use(express.static('static/js'));



app.get('/get_student?*', (req, res) => {
    const id = req.query.id;
    fetch(`${djangoURL}/api/student-profiles/${id}/?format=json`).then(
        result => result.json()
    ).then(
        json => res.send(json)
    );
});


app.get('/get_student_courses/:id', (req, res) => {
    const studentID = req.params['id'];
    fetch(`${djangoURL}/api/enrollments/?format=json`).then(
        response => response.json()
    ).then(
        enrollments => {

            enrollments.forEach(enrollment => {
                if (enrollment.student === studentID) {
                    const courseID = enrollment.course;
                    fetch(`${djangoURL}/courses/${courseID}`)
                }
            })
        }
    )
});

app.get('/*', (request, response) => {
    FS.promises.readFile('root.html', 'utf8').then(
        data => response.send(data)
    );
});


app.listen(frontPort, hostname, () => {
    console.log(`Сервер начал приём запросов по адресу ${frontURL}\n`);
});