from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user

# class AllCreateOwnerUpdateOwnerRetrieve(object):
#     user_field_name = 'user'
#
#     def __init__(self, user_field_name):
#         import pdb; pdb.set_trace()
#         self.user_field_name = user_field_name
#         self.PermissionClass = AllCreateOwnerUpdateOwnerRetrieve.Blah(self)
#
#     class Blah(permissions.BasePermission):
#         outer = None
#         def __init__(self, Outer):
#             import pdb;
#             pdb.set_trace()
#             self.outer = Outer
#
#         def has_permission(self, request, view):
#             """
#             Allow create for anyone. Allow list for admins only.
#
#             :param request:
#             :param view:
#             :return:
#             """
#
#             import pdb;
#             pdb.set_trace()
#
#             if view.action == 'list':
#                 if not request.user.is_staff:
#                     return False
#
#             return True
#
#         def has_object_permission(self, request, view, obj):
#             """
#             Allow update and retrieve only for self-owned objects.
#
#             :param request:
#             :param view:
#             :param obj:
#             :return:
#             """
#
#             import pdb; pdb.set_trace()
#             pdb.set_trace()
#
#             if getattr(obj, self.outer.user_field_name) == request.user:
#                 return True
#
#             return False


class AllCreateOwnerUpdateOwnerRetrieve(permissions.BasePermission):
    def has_permission(self, request, view):
        """
        Allow create for anyone. Allow list for admins only.

        :param request:
        :param view:
        :return:
        """

        if view.action == 'list':
            if not request.user.is_staff:
                return False

        return True

    def has_object_permission(self, request, view, obj):
        """
        Allow update and retrieve only for self-owned objects.

        :param request:
        :param view:
        :param obj:
        :return:
        """

        if view.action == 'destroy':
            return False

        if obj.user == request.user:
            return True

        return False
