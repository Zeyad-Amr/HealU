from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField


class Invoice(models.Model):
    id = models.BigAutoField(primary_key=True)
    appointmentId = models.CharField()
    patientId= models.IntegerField()
    class Status(models.TextChoices):
        pending = 'PN', _('Pending Payment')
        paid = 'PD', _('Paid')

    status = models.CharField(max_length=2, choices=Status.choices, default=Status.pending)
    dateTime = models.DateTimeField()
    servicesIds = ArrayField(models.IntegerField())
    def __str__(self):
         return self

class Bill(models.Model):
    id = models.BigAutoField(primary_key=True)
    invoiceId = models.ForeignKey(Invoice,on_delete=models.CASCADE) # deleting an invoice deletes all its bills
    amount = models.IntegerField()

    class Payment(models.TextChoices):
        online = 'ON', _('Card')
        offline = 'OF', _('Offline')

    paymentMethod = models.CharField(max_length=2, choices= Payment.choices, default=Payment.offline)
    dateTime = models.DateTimeField()
    def __str__(self):
        return f'{self.id}'
    