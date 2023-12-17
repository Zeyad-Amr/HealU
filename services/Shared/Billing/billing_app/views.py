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
     api_url = 'https://dwl9v.wiremockapi.cloud/services'
     service_data={"services_ids":services_ids}
     headers={"auth":'9583606feb9659b8dbf44dcddf2ec0dc'}
     response=requests.get(api_url,data=json.dumps(service_data),headers=headers)
     services_response=response.json()
     names=services_response["services_names"]
     amounts=services_response["services_amounts"]
     return names,amounts

def get_appointment_data(appointment_id):
     api_url = f'https://dwl9v.wiremockapi.cloud/appointment/:{appointment_id}'
     headers={"auth":'9583606feb9659b8dbf44dcddf2ec0dc'}
     response=requests.get(api_url,headers=headers)
     appointment_response=response.json()
     patient_id=appointment_response["patient_id"]
     return patient_id

def get_insurance_data(patient_id):
     # change appointment to reg api
     api_url = f'https://dwl9v.wiremockapi.cloud/appointment/:{patient_id}'
     headers={"auth":'9583606feb9659b8dbf44dcddf2ec0dc'}
     response=requests.get(api_url,headers=headers)
     appointment_response=response.json()
     insurance=appointment_response["insurance"]
     return insurance

def get_invoice_by_id(id):
            url = f'http://127.0.0.1:8000/invoices/{id}'
            response=requests.get(url)
            return response.json()
        

# Create your views here.
@csrf_exempt
def newinvoice (request):
    if request.method == 'POST':
        data=json.loads(request.body.decode("utf-8"))
        services_ids=(data['services_ids'])
        names,amounts=get_services_data(services_ids)
        generated=Invoice(appointment_id=data['appointment_id'],status="DR",datetime=timezone.now().isoformat(),services_ids=data['services_ids'])
        print(generated)
        generated.save()
        response={
            'id': generated.id,
            'status':generated.status,
            'datetime':generated.datetime,
            'Services_names':names,
            'Services_amounts':amounts,
                    }
        
        return JsonResponse(response ,safe=False)
    

@csrf_exempt
@require_http_methods(["DELETE","PATCH","GET"])
def delete(request,id):
    if request.method=="DELETE":
        obj = get_object_or_404(Invoice, id=id)
        print(obj)
        obj.delete()
        response= {
        "message":"invoice deleted successfully"
                    }
        return JsonResponse(response)
    elif request.method=="PATCH":
            obj = get_object_or_404(Invoice, id=id)
            new_services=json.loads(request.body)["services_ids"]
            services=obj.services_ids
            print(services)
            # list append
            for service in new_services:
                 services.append(service)
            print(services)
            obj.services_ids=services
            print(obj.services_ids)
            obj.save()
            url = f'http://127.0.0.1:8000/invoices/{obj.id}'
            response=requests.get(url)
            print(response,"response is ok")
            return JsonResponse(response.json())
    elif request.method=="GET":
        obj = get_object_or_404(Invoice, id=id)
        services_ids=obj.services_ids
        names,amounts=get_services_data(services_ids)
        response ={
            'id': obj.id,
            'status':obj.status,
            'datetime':obj.datetime,
            'Services_names':names,
            'Services_amounts':amounts, # data base schema ?
        }
        return JsonResponse(response,safe=False)
    
@csrf_exempt
def get_all_patients(requests,patient_id):
     all_objects = Invoice.objects.all()
     print(all_objects)
     patient_invoices_ids=[]
     response=[]
     for object in all_objects:
          patient=get_appointment_data(object.appointment_id)
          if (patient == patient_id):
               patient_invoices_ids.append(object.id)
               invoice=get_invoice_by_id(object.id)
               response.append(invoice)   

     return JsonResponse(response,safe=False)
    
          





