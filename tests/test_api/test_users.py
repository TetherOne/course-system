from tests.test_api.conftest import student_payload
from tests.test_api.conftest import teacher_payload

from tests.test_api.conftest import client

import pytest


@pytest.mark.django_db
def test_register_teacher(client):

    response = client.post("/test_api/userapp/users/", teacher_payload)

    data = response.data

    assert data["username"] == teacher_payload["username"]
    assert data["email"] == teacher_payload["email"]
    assert "password" not in data
    assert data["is_teacher"] is True
    assert response.status_code == 201


@pytest.mark.django_db
def test_register_student(client):

    response = client.post("/test_api/userapp/users/", student_payload)

    data = response.data

    assert data["username"] == student_payload["username"]
    assert data["email"] == student_payload["email"]
    assert "password" not in data
    assert data["is_teacher"] is False
    assert response.status_code == 201
