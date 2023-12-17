from django.shortcuts import render , get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from .models import *
from django.utils import timezone
import requests
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods

def get_services_data(services_ids):
     ### replace with logic for admin api call
     api_url = 'https://dwl9v.wiremockapi.cloud/services'
     service_data={"services_ids":services_ids}
     headers={"auth":'9583606feb9659b8dbf44dcddf2ec0dc'}
     response=requests.get(api_url,data=json.dumps(service_data),headers=headers)
     services_response=response.json()
     names=services_response["services_names"]
     amounts=services_response["services_amounts"]
     return names,amounts

def get_patient_from_appointment(appointment_id):
     ### appointment api logic
     api_url = f'https://dwl9v.wiremockapi.cloud/appointment/:{appointment_id}'
     headers={"auth":'9583606feb9659b8dbf44dcddf2ec0dc'}
     response=requests.get(api_url,headers=headers)
     appointment_response=response.json()
     patient_id=appointment_response["patient_id"]
     return patient_id

def get_insurance_percentage(patient_id):
     # change appointment to reg api
     api_url = f'https://dwl9v.wiremockapi.cloud/registeration/:{patient_id}'
     headers={"auth":'9583606feb9659b8dbf44dcddf2ec0dc'}
     response=requests.get(api_url,headers=headers)
     registration_response=response.json()
     insurance=registration_response["insurance"]
     return insurance

def get_invoice_by_id(id):
            url = f'http://127.0.0.1:8000/invoices/{id}'
            response=requests.get(url)
            return response.json()
        


    

@csrf_exempt
@require_http_methods(["DELETE","PATCH","GET","POST"])
def handleinvoice(request,id):
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
            services=invoice.services_ids
            # list append
            for service in new_services:
                 services.append(service)
            invoice.services_ids=services
            invoice.save()
            response=get_invoice_by_id(invoice.id)
            return JsonResponse(response)
    
    elif request.method=="GET":
        invoice = get_object_or_404(Invoice, id=id)
        services_ids=invoice.services_ids
        names,amounts=get_services_data(services_ids)
        patient_id=get_patient_from_appointment(invoice.appointment_id)
        insurance_percentage=get_insurance_percentage(patient_id)
        amounts_after_insurace=[(1-float(insurance_percentage))* amount for amount in amounts]
        response ={
            'id': invoice.id,
            'status':invoice.status,
            'datetime':invoice.datetime,
            'Services_names':names,
            'Services_amounts':amounts, # data base schema ?
            'amounts_total':amounts_after_insurace
        }
        return JsonResponse(response,safe=False)
    
@csrf_exempt
@require_http_methods(["POST"])
def newinvoice(request) :
     if request.method == 'POST':
          data=json.loads(request.body.decode("utf-8"))
          new_invoice=Invoice(appointment_id=data['appointment_id'],status="DR",datetime=timezone.now().isoformat(),services_ids=data['services_ids'])
          new_invoice.save()
          response=get_invoice_by_id(new_invoice.id)
          return JsonResponse(response ,safe=False)
    
@csrf_exempt
@require_http_methods(["GET"])
def get_all_patient_invoices(requests,patient_id):
     all_invoices = Invoice.objects.all()
     response=[]
     for invoice in all_invoices:
          patient=get_patient_from_appointment(invoice.appointment_id)
          if (patient == patient_id):
               invoice=get_invoice_by_id(invoice.id)
               response.append(invoice)   

     return JsonResponse(response,safe=False)
    
          





