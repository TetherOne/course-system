from userapp.views import TeacherProfileViewSet
from userapp.views import StudentProfileViewSet
from userapp.views import UserViewSet

from django.test import SimpleTestCase
from django.urls import resolve
from django.urls import reverse


class TestUsersUrls(SimpleTestCase):

    def test_users_url_resolves(self):
        url = reverse("userapp:users-list")
        self.assertEqual(resolve(url).func.cls, UserViewSet)

    def test_teachers_url_resolves(self):
        url = reverse("userapp:teachers-list")
        self.assertEqual(resolve(url).func.cls, TeacherProfileViewSet)

    def test_students_url_resolves(self):
        url = reverse("userapp:students-list")
        self.assertEqual(resolve(url).func.cls, StudentProfileViewSet)