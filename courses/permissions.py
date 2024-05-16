from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            # return request.user.is_authenticated
            return True
        return True

    def has_object_permission(self, request, view, obj):
        if obj.teacher_profile.user == request.user:
            return True
        return request.method in SAFE_METHODS
