
from django.shortcuts import render
from . import paypal_utils as utils
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def add_bill(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode("utf-8"))
        if body["payment_method"]=="card":
            payment_source = body["payment_source"]["card"]       
            response = utils.pay_with_card(amount= body["amount"], card_number=payment_source["number"],expiry=payment_source["expiry"],cvv=payment_source["cvv"],name=payment_source["name"])

            if response.status_code == 201:
                res = HttpResponse('payment successful')
            else:
                res = HttpResponse('payment unsuccessful')
            
        if body["payment_method"] == "offline":
            # logic to handle offline billing
            print("")
    res.status_code = response.status_code
    return res
