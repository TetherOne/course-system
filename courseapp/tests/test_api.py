from rest_framework.test import APITestCase


class CoursesAPI(APITestCase):
    def test_get(self):
        response = self.client.get("/api/courses/")
        self.assertEqual(response.status_code, 200)

    def test_get_course_by_id(self):
        response = self.client.get("/api/courses/1/")
        self.assertEqual(response.status_code, 200)
