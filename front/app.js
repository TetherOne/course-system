import express from 'express';
import FS from 'fs';

import { hostname, djangoURL, frontPort, frontURL } from "./static/js/server.js";
import { Path } from './static/js/path.js';



const app = express();


app.use(express.static('static/css'));
app.use(express.static('static/js'));


app.get('*/get_student/*', (request, response) => {
    console.log(request.url)
    const id = Path.getLastElement(request.url);
    console.log('FLAG')
    fetch(`${djangoURL}/api/student-profiles/${id}/?format=json`).then(
        res => res.json()
    ).then(
        json => response.send(json)
    );
});

app.get('*', (request, response) => {
    FS.promises.readFile('root.html', 'utf8').then(
        data => {
            console.log('PIDORAS')
            response.send(data)
        }
    );
});


app.listen(frontPort, hostname, () => {
    console.log(`Сервер начал приём запросов по адресу ${frontURL}\n`);
})