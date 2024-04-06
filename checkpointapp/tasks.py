# from celery import shared_task
#
# @shared_task
# def calculate_and_save_checkpoint(checkpoint_id):
#     from .models import PassedCheckPoint
#
#     checkpoint = PassedCheckPoint.objects.get(id=checkpoint_id)
#     if checkpoint.checkpoint:
#         total_max_points = sum(
#             question.max_points for question in checkpoint.checkpoint.questions.all()
#         )
#         if total_max_points > 0:
#             checkpoint.percent = (checkpoint.points / total_max_points) * 100
#         else:
#             checkpoint.percent = 0.0
#
#         if checkpoint.percent < 41:
#             checkpoint.grade = "2"
#             checkpoint.status = "Не зачет"
#         elif 41 <= checkpoint.percent <= 61:
#             checkpoint.grade = "3"
#             checkpoint.status = "Зачет"
#         elif 61 < checkpoint.percent <= 81:
#             checkpoint.grade = "4"
#             checkpoint.status = "Зачет"
#         else:
#             checkpoint.grade = "5"
#             checkpoint.status = "Зачет"
#
#     checkpoint.save()
#     summary = checkpoint.student.summaries.filter(
#         course=checkpoint.checkpoint.module.course
#     ).first()
#
#     if summary:
#         summary.calculate_current_points()
#         summary.save()
