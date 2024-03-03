const hostname = 'localhost';
const port = 3000;
const URL = `http://${hostname}:${port}`;
const format = 'json';
const teacher_id = 4;


window.onload = () => {
    fetch(`${URL}/course-system/api/teacher-profiles/${teacher_id}?format=${format}`).then(
        response => {
            response.text();
        }
    ).then(
        data => {
            data = JSON.parse(responseText);

            const dataDiv = document.getElementById('data');
            dataDiv.innerHTML = dataDiv.innerHTML.
                replace('{surname}', data.surname).
                replace('{fatherName}', data.father_name).
                replace('{faculty}', data.faculty);
        }
    ).catch(
        error => {
            document.body.append('Возникла ошибка');
        }
    );
};
