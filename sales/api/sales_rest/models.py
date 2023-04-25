from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=150)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_automobile", kwargss={"vin": self.vin})


class SalesPerson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=35)

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.pk})

    def __str__(self):
        return  self.employee_id

    class Meta:
        ordeering = ("first_name", "last_name", "employee_id")


class Customer
