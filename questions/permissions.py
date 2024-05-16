from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsTeacherOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            return obj.checkpoint.module.course.teacher_profile.user == request.user
        return True


class IsStudentEnrollment(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return (
                obj.checkpoint.module.course.enrollments.student_profile.user
                == request.user
            )
        return False
