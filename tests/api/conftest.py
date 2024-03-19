from rest_framework.test import APIClient

import pytest


@pytest.fixture
def client():
    return APIClient()


teacher_payload = {
    "email": "teacher@example.com",
    "username": "teacher_username",
    "password": "test123",
    "is_teacher": True,
}


student_payload = {
    "email": "student@example.com",
    "username": "student_username",
    "password": "test123",
    "is_teacher": False,
}


course_payload = {
    "course_name": "Test Course",
    "description": "Test course description",
    "course_password": "coursepass",
}


lesson_payload = {
    "lesson_name": "Test Lesson",
    "video": "",
    "description": "Test lesson description",
}


checkpoint_payload = {
    "title": "Test Checkpoint",
}


question_payload = {"question_text": "Test Question", "max_points": 1}


answer_payload = {
    "answer_text": "Test Answer",
    "is_correct": False,
}
