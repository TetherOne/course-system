from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True

        if obj.teacher_profile.user == request.user:
            return True

        return request.method in SAFE_METHODS