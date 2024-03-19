from courseapp.views import EnrollmentViewSet
from courseapp.views import CourseViewSet
from courseapp.views import LessonViewSet

from django.test import SimpleTestCase

from django.urls import reverse
from django.urls import resolve


class TestCourseUrls(SimpleTestCase):

    def test_courses_url_resolves(self):
        url = reverse("courseapp:courses-list")
        self.assertEqual(resolve(url).func.cls, CourseViewSet)

    def test_lessons_url_resolves(self):
        url = reverse("courseapp:lessons-list")
        self.assertEqual(resolve(url).func.cls, LessonViewSet)

    def test_enrollments_url_resolves(self):
        url = reverse("courseapp:enrollments-list")
        self.assertEqual(resolve(url).func.cls, EnrollmentViewSet)