from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return self.employee_id

    class Meta:
        ordering = ("employee_id",)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="auto_vin",
        on_delete=models.CASCADE,
    )
    sold = models.ForeignKey(
        AutomobileVO,
        related_name="sold",
        on_delete=models.CASCADE,
    )

    def get_api_appointments(self):
        return reverse("api_appointments", kwargs={"id": self.id})

    def __str__(self):
        return self.vin

    class Meta:
        ordering = ("vin",)
    # def cancel(self):
    #     self.status = "CANCEL"
    #     self.save()

    # def finish(self):
    #     self.status = "FINISH"
    #     self.save()
