from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class AppoinmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"]


@require_http_methods({"GET", "POST"})
def api_technicians(request):
    if request.method == "GET":
        tech = Technician.objects.all()
        return JsonResponse(
            {"tech": tech},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            tech = Technician.objects.create(**content)
            return JsonResponse(
                tech,
                encoder=Technician,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the Technician"}
            )
            response.status_code = 400
            return response
