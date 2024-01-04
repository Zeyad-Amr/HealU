# serializers.py
from rest_framework import serializers
from .models import Invoice, Bill

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

    def to_representation(self, instance):
        # Override to_representation to format the output as a dictionary
        representation = super(InvoiceSerializer, self).to_representation(instance)
        return {field: representation[field] for field in representation if representation[field] is not None}
    
class BillSerializer (serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

    def to_representation(self, instance):
        # Override to_representation to format the output as a dictionary
        representation = super(BillSerializer, self).to_representation(instance)
        return {field: representation[field] for field in representation if representation[field] is not None}