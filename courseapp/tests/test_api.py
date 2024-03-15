from rest_framework.test import APITestCase


class CoursesAPI(APITestCase):
    def test_get(self):
        response = self.client.get("/api/courses/")
        self.assertEqual(response.status_code, 200)
