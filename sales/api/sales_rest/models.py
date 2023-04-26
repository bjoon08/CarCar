from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def get_api_url(self):
        return reverse("api_automobile", kwargss={"vin": self.vin})


class SalesPerson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=35)

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.pk})

    def __str__(self):
        return self.employee_id

    class Meta:
        ordering = ("first_name", "last_name", "employee_id")


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})

    def __str__(self):
        return self.phone_number

    class Meta:
        ordering = ("first_name", "last_name", "phone_number")


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesperson",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
    )
    price = models.CharField(max_length=15)

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.pk})
