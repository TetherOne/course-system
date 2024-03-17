from tests.api.conftest import teacher_payload
from tests.api.conftest import lesson_payload
from tests.api.conftest import course_payload

import pytest


@pytest.mark.django_db
def test_create_course(client):

    teacher_response = client.post("/api/userapp/users/", teacher_payload)
    assert teacher_response.status_code == 201

    teacher_id = teacher_response.json()["id"]

    course_payload["teacher_profile"] = teacher_id
    course_response = client.post("/api/courseapp/courses/", course_payload)
    assert course_response.status_code == 201

    course_id = course_response.json()["id"]
    assert course_id is not None

    course_details_response = client.get(f"/api/courseapp/courses/{course_id}/")
    assert course_details_response.status_code == 200

    course_details = course_details_response.json()
    assert course_details["teacher_profile"] == teacher_id


@pytest.mark.django_db
def test_create_lesson(client):

    teacher_response = client.post("/api/userapp/users/", teacher_payload)
    assert teacher_response.status_code == 201

    teacher_id = teacher_response.json()["id"]

    course_payload["teacher_profile"] = teacher_id
    course_response = client.post("/api/courseapp/courses/", course_payload)
    assert course_response.status_code == 201

    course_id = course_response.json()["id"]
    assert course_id is not None

    course_details_response = client.get(f"/api/courseapp/courses/{course_id}/")
    assert course_details_response.status_code == 200
    course_details = course_details_response.json()
    assert course_details["teacher_profile"] == teacher_id

    lesson_payload["course"] = course_id
    lesson_response = client.post("/api/courseapp/lessons/", lesson_payload)
    assert lesson_response.status_code == 201

    lesson_id = lesson_response.json()["id"]
    assert lesson_id is not None

    lesson_details_response = client.get(f"/api/courseapp/lessons/{lesson_id}/")
    assert lesson_details_response.status_code == 200
    lesson_details = lesson_details_response.json()
    assert lesson_details["course"] == course_id