# from celery import shared_task
#
# import uuid
#
#
# @shared_task
# def generate_password_for_course(course_id):
#     from .models import Course
#
#     course = Course.objects.get(id=course_id)
#
#     # Проверяем, есть ли уже пароль для курса
#     if not course.course_password:
#         course_password = str(uuid.uuid4())[:8].replace("-", "")
#         course.course_password = course_password
#         course.save()
