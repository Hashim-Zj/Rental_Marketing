from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework import authentication, permissions
from api.models import Address, RentalItem, Booking
from api.serializers import (
    UserRegisterSerializer,
    AddressSerializer,
    RentalItemSerializer,
    BookingSerializer,
    UserSerializer,
)


class UserRegisterView(ViewSet):
    def create(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)


class UserViewSet(ViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def list(self, request):
        if request.user.is_staff:  # Check if the user is an admin
            queryset = User.objects.all()
        else:
            queryset = User.objects.filter(
                pk=request.user.pk
            )  # Only show the logged-in user
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.filter(pk=pk)
        user = queryset.first()  # Get the first matching user
        if user:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response({"detail": "Not found"}, status=404)

    def update(self, request, pk=None):
        queryset = User.objects.filter(pk=pk)
        user = queryset.first()
        if not user:
            return Response({"detail": "Not found"}, status=404)

        serializer = UserSerializer(user, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class AddressViewSet(ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = AddressSerializer(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=201)
        else:
            return Response(data=serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # This uses the passed `id` in kwargs
        serializer = self.get_serializer(instance, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors, status=400)


class RentalItemView(ModelViewSet):
    serializer_class = RentalItemSerializer
    queryset = RentalItem.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = RentalItemSerializer(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)

    @action(methods=["GET"], detail=False)
    def list_my_items(self, request, *args, **kwargs):
        items = RentalItem.objects.filter(owner=request.user)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)



    @action(methods=["POST"], detail=True)
    def book_now(self, request, *args, **kwargs):
        try:
            item = RentalItem.objects.get(id=kwargs.get("pk"))
            user = request.user

            serializer = BookingSerializer(
                data=request.data, context={"user": user, "item": item}
            )
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=201)
            else:
                return Response(data=serializer.errors, status=400)

        except RentalItem.DoesNotExist:
            return Response({"error": "Rental item not found."}, status=404)


class BookingView(ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(methods=["GET"], detail=False)
    def bookings(self, request, *args, **kwargs):
        """List all bookings for the logged-in user."""
        user = request.user
        bookings = Booking.objects.filter(user=user)
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)
