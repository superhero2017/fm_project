from rest_framework import permissions


class RsvpPermissions(permissions.BasePermission):
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

        # allow buyer to view rsvp
        if view.action == 'retrieve' and obj.buyer == request.user:
            return True

        # allow rsvp meal owner
        if obj.meal.owner == request.user:
            return True

        return False
