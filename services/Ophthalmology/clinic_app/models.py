from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField

class VisionTest(models.Model):
    id = models.BigAutoField(primary_key=True)
    appointment_id = models.IntegerField()
    lt_sph = models.DecimalField()
    lt_cyl = models.DecimalField()
    lt_axis = models.IntegerField()
    rt_sph = models.DecimalField()
    rt_cyl = models.DecimalField()
    rt_axis = models.IntegerField()
    def __str__(self):
        return f'id {self.id} appt id {self.appointment_id}'
    