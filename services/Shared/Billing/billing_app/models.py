from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField

class Invoice(models.Model):
    id = models.BigAutoField(primary_key=True)
    insurance_id = models.IntegerField()
    patient_id = models.IntegerField()
    class Status(models.TextChoices):
        draft = 'DR', _('Draft')
        pending = 'PN', _('Pending Payment')
        paid = 'PD', _('Paid')
        cancelled = 'CN', _('Cancelled')

    status = models.CharField(max_length=2, choices=Status.choices, default=Status.draft)
    datetime = models.DateTimeField()
    services_ids = ArrayField(models.IntegerField())
    def __str__(self):
         return f'{self.id} {self.status} {self.services}'

class Bill(models.Model):
    id = models.BigAutoField(primary_key=True)
    invoice_id = models.IntegerField(null=True)
    amount = models.IntegerField()

    class Payment(models.TextChoices):
        online = 'ON', _('Online')
        offline = 'OF', _('Offline')

    payment_method = models.CharField(max_length=2, choices= Payment.choices, default=Payment.offline)
    datetime = models.DateTimeField()
    def __str__(self):
        return f'{self.id}'
    