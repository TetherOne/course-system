from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["POST", 'PUT', 'PATCH', 'DELETE']:
            return obj.user == request.user or request.user.is_staff
        return True