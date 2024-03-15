from rest_framework.test import APIClient

import pytest


client = APIClient()


@pytest.mark.django_db
def test_register_teacher():
    payload = {
        "email": "test@ya.ru",
        "username": "test_teacher",
        "password": "test123",
        "is_teacher": True,
    }

    response = client.post("/api/users/", payload)

    data = response.data

    assert data["username"] == payload["username"]
    assert data["email"] == payload["email"]
    assert "password" not in data
    assert data["is_teacher"] is True
    assert response.status_code == 201


@pytest.mark.django_db
def test_register_student():
    payload = {
        "email": "test@ya.ru",
        "username": "test_student",
        "password": "test123",
        "is_teacher": False,
    }

    response = client.post("/api/users/", payload)

    data = response.data

    assert data["username"] == payload["username"]
    assert data["email"] == payload["email"]
    assert "password" not in data
    assert data["is_teacher"] is False
    assert response.status_code == 201