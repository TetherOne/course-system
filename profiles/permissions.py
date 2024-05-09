from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            # return request.user.is_authenticated
            return True
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            return obj.user == request.user or request.user.is_staff
        elif request.method == "GET":
            # return request.user.is_authenticated
            return True
        return True
