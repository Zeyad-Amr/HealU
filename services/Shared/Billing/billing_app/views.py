
from django.shortcuts import render, get_object_or_404
from . import paypal_utils as utils
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Bill, Invoice
from django.utils import timezone
import json
from .serializers import BillSerializer


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