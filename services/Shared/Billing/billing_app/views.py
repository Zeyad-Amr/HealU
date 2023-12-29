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
     # only use 5 for testing because there are no other services currently
     Admin_services_url=f'https://admin-service-healu.onrender.com/api/v1/clinicService/'
     services_names=[]
     services_amounts=[]
     for id in services_ids:
          response=requests.get(f'{Admin_services_url}{id}')
          if response.status_code== 200:
            service_data=json.loads(response.text)
            service_name=service_data['data']['clinicService']["name"]
            service_amount=service_data['data']['clinicService']["price"]
            print(service_name,service_amount,response.status_code)
            services_names.append(service_name)
            services_amounts.append(service_amount)
            services_response={
                 "status code": response.status_code,
                 "services_names":services_names,
                 "services_amounts":services_amounts
            }
          else : ### handle 404 and other cases
                services_response={
                 "status code": response.status_code,
                 "error": response.text
                     }
        
     return services_response

def get_patient_from_appointment(appointment_id):
     ### appointment api logic
     print("entered appointment")
     api_url = f'https://appointment-service-y30u.onrender.com/appointments/{appointment_id}'
     response=requests.get(api_url)
     # API appointment returns NULL with status code 200 for deleted appointments
     if (response is None):
        patient_response= {
             "status code": "none",
             "error": "api returned a null patient"
        }
         
     elif response.status_code== 200:
        appointment_response=json.loads(response.text)
        print(appointment_response)
        patient_id=appointment_response["patientId"]
        patient_response= {
             "status code": response.status_code,
             "patient_id": patient_id
        }
        print("if condition 1")
     else:
        patient_response= {
             "status code": response.status_code,
             "error": response.text
        }
     print(patient_response, 1)   
     return patient_response

def get_insurance_percentage(patient_id):
     # change appointment to reg api
     #api_url = f'https://dwl9v.wiremockapi.cloud/registeration/:{patient_id}'
     #headers={"auth":env("auth_data")}
     #response=requests.get(api_url,headers=headers)
     #registration_response=response.json()
     #insurance=registration_response["insurance"]
     registeration_url=f'https://registrationservices.onrender.com/patient/'
     response=requests.get(f'{registeration_url}{patient_id}')
     print(response)
     if response.status_code ==200:
         response=json.loads(response.text)
         print(response["data"]['insurancePersentage'])
         insurance=response["data"]['insurancePersentage']
         print(insurance)
         insurace_response={
             "status code": response.status_code,
             "insurance": insurance   
         }
     else: 
        insurace_response={
             "status code": response.status_code,
             "error": response.text   
         }
          
     return insurace_response

def get_invoice_by_id(id):
            url = f'http://127.0.0.1:8000/invoice/{id}'
            response=requests.get(url)
            return response.json()
        


    

@csrf_exempt
@require_http_methods(["DELETE","PATCH","GET"])
def handle_invoice(request,id):
    if request.method=="DELETE":
        try:
            invoice = get_object_or_404(Invoice, id=id)
            invoice.delete()
            response= { 
                "message":"invoice deleted successfully"
                    }
            return JsonResponse(response)
        except :
            response= { 
                "message":"invoice not found"
                    }
            return JsonResponse(response,status=404)
    
    
    elif request.method=="PATCH":
            try: 
                invoice = get_object_or_404(Invoice, id=id)
            except:
                response= { 
                "message":"invoice not found"
                    }
                return JsonResponse(response,status=404)
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
        try:
            invoice = get_object_or_404(Invoice, id=id)
        except:
            response= { 
                "message":"invoice not found"
                    }
            return JsonResponse(response,status=404)
        services_ids=invoice.servicesIds
        services_response=get_services_data(services_ids)
        insurace_response=get_insurance_percentage(invoice.patientId)
        if (services_response["status code"]==200 and insurace_response["status code"]==200 ):
            services_names=services_response["services_names"]
            services_amounts=services_response["services_amounts"]
            insurance_percentage=insurace_response["insurance"]
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
        else:
            API_responses={
                 "services_API":services_response,
                 "insurance_API":insurace_response
            }
            response={
                "message":"an error occured during an external API call",
                "details":API_responses
            }
            return JsonResponse(response,safe=False,status=404)
        
@csrf_exempt
@require_http_methods(["POST"])
def new_invoice(request) :
     if request.method == 'POST':
          data=json.loads(request.body.decode("utf-8"))
          patient_response=get_patient_from_appointment(data['appointment_id'])
          print(patient_response)
          if(patient_response["status code"]==200):
            print(type(data['appointment_id']))
            patient_id=patient_response["patient_id"]
            new_invoice=Invoice(appointmentId=data['appointment_id'],patientId=patient_id,status="PN",dateTime=timezone.now().isoformat(),servicesIds=data['services_ids'])
            new_invoice.save()
            response=get_invoice_by_id(new_invoice.id)
            return JsonResponse(response ,safe=False)
          else:
            reponse={
                "message": "could not get patient",
                "patient_API":patient_response
                }
            return JsonResponse(reponse,status=404)

              
        
@csrf_exempt
@require_http_methods(["GET"])
def get_all_patient_invoices(requests,patient_id):
     filtered_invoices = Invoice.objects.filter(patientId=patient_id)
     serializer = invoice_serializer(filtered_invoices,many=True) 
     return JsonResponse(serializer.data,safe=False)
    
          



@csrf_exempt
def new_bill(request):
    print("NEW BILLLLL")
    if request.method == 'POST':
        print("POSTTTTT")

        body = json.loads(request.body.decode("utf-8"))
        invoice = get_object_or_404(Invoice, id=body["invoiceId"])
        if body["paymentMethod"]=="card":
            paymentSource = body["paymentSource"]["card"]       
            response = utils.pay_with_card(amount= body["amount"], card_number=paymentSource["number"],expiry=paymentSource["expiry"],cvv=paymentSource["cvv"],name=paymentSource["name"])
            if response.status_code == 201:
                bill = Bill(invoiceId = invoice, amount=body["amount"], paymentMethod = "ON", dateTime = timezone.now().isoformat())
                bill.save()
                response = BillSerializer(bill).data
                return JsonResponse(response, status=201, safe=False)
            else:
                return JsonResponse({"message": "payment unsuccessful"}, status=response.status_code, safe=False)
            
        if body["paymentMethod"] == "offline":
            bill = Bill(invoiceId = invoice, amount=body["amount"], paymentMethod = "OF", dateTime = timezone.now().isoformat())
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



