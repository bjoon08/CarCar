from django.shortcuts import render
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "first_name", "last_name", "employee_id"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["id", "vin", "sold"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "customer",
        "technician",
        "sold",
        ]
    encoders = {
        "sold": AutomobileVOEncoder(),
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        return {"vin": o.vin.vin}


@require_http_methods({"GET", "POST"})
def api_technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create the Technician"},
                status=400,
            )


@require_http_methods({"DELETE"})
def api_tech_delete(request):
    count, _ = Technician.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods({"GET", "POST"})
def api_appointments(request):
    if request.method == "GET":
        appointment = Appointment.objects.all()
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            vin = content["vin"]["vin"]
            auto_vin = AutomobileVO.objects.get(vin=vin)
            content["auto_vin"] = auto_vin
            appointments = Appointment.objects.create(**content)
            return JsonResponse(
                appointments,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods({"DELETE"})
def api_appointment_delete(request, id):
    count, _ = Appointment.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods({"PUT"})
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=id)
        appointment.status = "cancelled"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )


@require_http_methods({"PUT"})
def api_finish_appointment(request, id):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=id)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
