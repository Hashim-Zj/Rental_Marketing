from django.db import models
from django.contrib.auth.models import User

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="addresses")
    address = models.TextField()
    pin_code = models.CharField(max_length=6)
    mobile_number = models.CharField(max_length=15)
    default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.pin_code}"

class RentalItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to='rental_items/', null=True, blank=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(RentalItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    start_date = models.DateField()
    end_date = models.DateField()
    status=models.CharField(max_length=100)

    
