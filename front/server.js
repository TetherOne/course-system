import express from 'express';
import FS from 'fs';

import { hostname, djangoURL, frontPort, frontURL } from "./static/js/server.js";



const app = express();


app.use(express.static('../static/css'));
app.use(express.static('../static/js'));


app.get('/', (request, response) => {
    FS.promises.readFile('root.html', 'utf8').then(
        data => response.send(data)
    )
});


app.listen(frontPort, hostname, () => {
    console.log(`Сервер начал приём запросов по адресу ${frontURL}\n`);
})