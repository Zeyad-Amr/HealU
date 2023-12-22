from django.shortcuts import render , get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from . import paypal_utils as utils
from .models import *
from django.utils import timezone
import requests
from django.http import JsonResponse, Http404
import json
from django.views.decorators.http import require_http_methods
import environ
from .serializers import invoice_serializer, BillSerializer
env=environ.Env()

def get_services_data(services_ids):
     ### replace with logic for admin api call
     api_url = 'https://dwl9v.wiremockapi.cloud/services'
     services_data={"services_ids":services_ids}
     headers={"auth":env("auth_data")}
     response=requests.get(api_url,data=json.dumps(services_data),headers=headers)
     services_response=response.json()
     services_names=services_response["services_names"]
     services_amounts=services_response["services_amounts"]
     return services_names,services_amounts

def get_patient_from_appointment(appointment_id):
     ### appointment api logic
     api_url = f'https://dwl9v.wiremockapi.cloud/appointment/:{appointment_id}'
     headers={"auth":env("auth_data")}
     response=requests.get(api_url,headers=headers)
     appointment_response=response.json()
     patient_id=appointment_response["patient_id"]
     return patient_id

def get_insurance_percentage(patient_id):
     # change appointment to reg api
     api_url = f'https://dwl9v.wiremockapi.cloud/registeration/:{patient_id}'
     headers={"auth":env("auth_data")}
     response=requests.get(api_url,headers=headers)
     registration_response=response.json()
     insurance=registration_response["insurance"]
     return insurance

def get_invoice_by_id(id):
            url = f'http://127.0.0.1:8000/invoice/{id}'
            response=requests.get(url)
            return response.json()
        


    

@csrf_exempt
@require_http_methods(["DELETE","PATCH","GET"])
def handle_invoice(request,id):
    if request.method=="DELETE":
        invoice = get_object_or_404(Invoice, id=id)
        invoice.delete()
        response= { 
        "message":"invoice deleted successfully"
                    }
        return JsonResponse(response)
    
    elif request.method=="PATCH":
            invoice = get_object_or_404(Invoice, id=id)
            new_services=json.loads(request.body)["services_ids"]
            services=invoice.servicesIds
            # list append
            for service in new_services:
                 services.append(service)
            invoice.servicesIds=services
            invoice.save()
            response=get_invoice_by_id(invoice.id)
            return JsonResponse(response)
    
    elif request.method=="GET":
        invoice = get_object_or_404(Invoice, id=id)
        services_ids=invoice.servicesIds
        services_names,services_amounts=get_services_data(services_ids)
        insurance_percentage=get_insurance_percentage(invoice.patientId)
        amounts_after_insurace=[(1-float(insurance_percentage))* amount for amount in services_amounts]
        serializer=invoice_serializer(invoice)
        invoice_response = serializer.data
        invoice_details={
              'Services_names':services_names,
               'Services_amounts':services_amounts,     
              'amounts_total': amounts_after_insurace

        }
        invoice_response.update(invoice_details)
        return JsonResponse(invoice_response,safe=False)
    
@csrf_exempt
@require_http_methods(["POST"])
def new_invoice(request) :
     if request.method == 'POST':
          data=json.loads(request.body.decode("utf-8"))
          patient_id=get_patient_from_appointment(data['appointment_id'])
          new_invoice=Invoice(appointmentId=data['appointment_id'],patientId=patient_id,status="PN",dateTime=timezone.now().isoformat(),servicesIds=data['services_ids'])
          new_invoice.save()
          response=get_invoice_by_id(new_invoice.id)
          return JsonResponse(response ,safe=False)
    
@csrf_exempt
@require_http_methods(["GET"])
def get_all_patient_invoices(requests,patient_id):
     filtered_invoices = Invoice.objects.filter(patientId=patient_id)
     serializer = invoice_serializer(filtered_invoices,many=True) 
     return JsonResponse(serializer.data,safe=False)
    
          



@csrf_exempt
def new_bill(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode("utf-8"))
        invoice = get_object_or_404(Invoice, id=body["invoiceId"])
        if body["paymentMethod"]=="card":
            paymentSource = body["paymentSource"]["card"]       
            response = utils.pay_with_card(amount= body["amount"], card_number=paymentSource["number"],expiry=paymentSource["expiry"],cvv=paymentSource["cvv"],name=paymentSource["name"])
            if response.status_code == 201:
                bill = Bill(invoice = invoice, amount=body["amount"], paymentMethod = "ON", dateTime = timezone.now().isoformat())
                bill.save()
                response = BillSerializer(bill).data
                return JsonResponse(response, status=201, safe=False)
            else:
                return JsonResponse({"message": "payment unsuccessful"}, status=response.status_code, safe=False)
            
        if body["paymentMethod"] == "offline":
            bill = Bill(invoice = invoice, amount=body["amount"], paymentMethod = "OF", dateTime = timezone.now().isoformat())
            bill.save()
            response = BillSerializer(bill).data
            return JsonResponse(response, status = 201, safe=False)
    
    return JsonResponse({"message": "Invalid request"}, status=400)

@csrf_exempt
def handle_bill(request, id):
    if request.method == 'DELETE':
        bill = get_object_or_404(Bill, id=id)
        bill.delete()
        response= {"message":"bill deleted successfully"}
        return JsonResponse(response, status=200)
    elif request.method == 'GET':
        bill = get_object_or_404(Bill, id=id)
        response = BillSerializer(bill).data
        return JsonResponse(response, status=200, safe=False)


@csrf_exempt
def get_all_patient_bills(request, patient_id):
    bills = Bill.objects.filter(invoiceId__patientId = patient_id)
    bills = BillSerializer(bills, many=True).data
    return JsonResponse(bills, status=200, safe=False)



