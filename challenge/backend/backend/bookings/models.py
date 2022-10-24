from datetime import timedelta
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

from .choices import (
    BookingStatusChoices,
)

class Booking(models.Model):
    buyer = models.TextField(_("buyer"), blank=True, null=True)
    provider = models.TextField(_("provider"), blank=True, null=True)

    details = models.TextField(_("details"), blank=True, null=True)

    status = models.CharField(
        _("status"),
        max_length=2,
        choices=BookingStatusChoices.choices,
        default=BookingStatusChoices.REQUESTED,
    )

    duration = models.IntegerField(
        _("duration (minutes)"),
        default=30,
        validators=[
            MinValueValidator(limit_value=30),
            MaxValueValidator(limit_value=240),
        ],
    )

    date: models.DateTimeField = models.DateTimeField(_("date"), blank=True, null=True)

    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        verbose_name = _("booking")
        verbose_name_plural = _("bookings")

    def __str__(self):
        """Return user + class"""
        return f"Reserva para {self.user} " 

    def get_end_date(self):
        return timezone.localtime(self.date) + timedelta(minutes=self.duration)
