from django.db import models
from django.utils.translation import gettext_lazy as _


class BookingStatusChoices(models.TextChoices):
    REQUESTED = "R", _("Solicitado")
    CONFIRMED = "C", _("Confirmado")
    PAYMENT_SENT = "PS", _("Pago Enviado")
    PAYMENT_REJECTED = "PR", _("Pago Rechazado")
    PAYED = "P", _("Pagado")
    IN_PROGRESS = "I", _("En Proceso")
    FINISHED = "F", _("Finalizado")
    CANCELLED = "CA", _("Cancelada")
