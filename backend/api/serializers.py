from rest_framework import serializers
from api.models import Address, RentalItem, Booking
from django.contrib.auth.models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)

    class Meta:
        model = Address
        fields = ["id", "user", "address", "pin_code", "mobile_number", "default"]

    def create(self, validated_data):
        user = self.context.get("user")

        # If it's the first address for the user, set as default
        if not Address.objects.filter(user=user).exists():
            validated_data["default"] = True

        return Address.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        if validated_data.get("default", False):
            # If another address is set as default, remove default from all other addresses
            Address.objects.filter(user=instance.user).update(default=False)
        return super().update(instance, validated_data)

    def validate(self, data):
        if "default" in data:
            if data["default"]:
                Address.objects.filter(user=self.context["request"].user).update(
                    default=False
                )
        return data


class RentalItemSerializer(serializers.ModelSerializer):
    address = serializers.CharField(read_only=True)
    owner = serializers.CharField(read_only=True)

    class Meta:
        model = RentalItem
        fields = [
            "id",
            "name",
            "description",
            "price_per_day",
            "quantity",
            "owner",
            "address",
            "image",
        ]

    def create(self, validated_data):
        owner = self.context.get("user")
        address = Address.objects.get(user=owner,default=True)
        return RentalItem.objects.create(owner=owner, address=address, **validated_data)


class BookingSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    item = serializers.CharField(read_only=True)

    class Meta:
        model = Booking
        fields = "__all__"

    def create(self, validated_data):
        user = self.context.get("user")
        item = self.context.get("item")
        return Booking.objects.create(user=user, item=item, **validated_data)
