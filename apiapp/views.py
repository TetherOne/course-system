from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from apiapp.serializers import TeacherProfileSerializer
from courseapp.models import TeacherProfile





@api_view()
def helloworld(request: Request) -> Response:
    return Response(
        {
            'message': 'Hello, World!',
        }
    )


class TeacherProfilesView(APIView):

    def get(self, request: Request) -> Response:

        teacher_profiles = TeacherProfile.objects.all()
        serialized = TeacherProfileSerializer(teacher_profiles, many=True)

        return Response({'teacher_profiles': serialized.data})
