from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsTeacherOrStudent(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            if request.user.teacher_profile:
                return obj.checkpoint.module.course.teacher_profile.user == request.user
            elif request.user.student_profile:
                return obj.student.user == request.user
        return False
