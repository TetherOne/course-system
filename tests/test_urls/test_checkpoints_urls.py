from checkpointapp.views import CheckPointViewSet
from checkpointapp.views import QuestionViewSet
from checkpointapp.views import AnswerViewSet

from django.test import SimpleTestCase

from django.urls import reverse
from django.urls import resolve


class TestCheckpointsUrls(SimpleTestCase):

    def test_checkpoints_url_resolves(self):
        url = reverse("checkpointapp:checkpoints-list")
        self.assertEqual(resolve(url).func.cls, CheckPointViewSet)

    def test_questions_url_resolves(self):
        url = reverse("checkpointapp:questions-list")
        self.assertEqual(resolve(url).func.cls, QuestionViewSet)

    def test_answers_url_resolves(self):
        url = reverse("checkpointapp:answers-list")
        self.assertEqual(resolve(url).func.cls, AnswerViewSet)