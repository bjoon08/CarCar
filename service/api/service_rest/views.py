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


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "customer",
        ]

    def get_extra_data(self, o):
        return {"technician": o.technician.employee_id,
                "vin": o.vin.vin,
                "sold": o.sold.vin}


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
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
            vin = AutomobileVO.objects.get(vin=content["vin"])
            content["vin"] = vin
            sold = AutomobileVO.objects.get(sold=content["sold"])
            content["sold"] = sold
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Could not create the Appointment"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods({"DELETE"})
def api_appointment_delete(request, id):
    count, _ = Appointment.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})


# @require_http_methods(["PUT"])
# def api_cancel_appointment(request, id):
#     appointment = Appointment.objects.get(id=id)
#     appointment.cancel()
#     body = {
#         "date_time": appointment.date_time,
#         "reason": appointment.reason,
#         "status": appointment.status,
#         "customer": appointment.customer,
#         "technician": appointment.technician,
#         "vin": appointment.vin,
#     }


# @require_http_methods(["PUT"])
# def api_finish_appointment(request, id):
#     appointment = Appointment.objects.get(id=id)
#     appointment.finish()
#     body = {
#         "date_time": appointment.date_time,
#         "reason": appointment.reason,
#         "status": appointment.status,
#         "customer": appointment.customer,
#         "technician": appointment.technician,
#         "vin": appointment.vin,
#     }
