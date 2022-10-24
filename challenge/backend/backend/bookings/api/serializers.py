from time import timezone
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import Booking
import datetime

"""
Date is valid
-----------------------
Book only one day in advance
"""
def date_is_valid(request_date: str):
    request_date.replace(tzinfo=datetime.timezone.utc)
    #rq_date = datetime.datetime.strptime(request_date, "%Y-%m-%dT%H:%M:%S.%f%z").replace(tzinfo=datetime.timezone.utc)
    nw_date =  datetime.datetime.now(tz=datetime.timezone.utc)
    return request_date > nw_date

class BookingSerializer(ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'

    def validate(self, data):

        if data['buyer'] == data['provider']:
            raise serializers.ValidationError("You can't book yourself")
        if not date_is_valid(data["date"]):
            raise serializers.ValidationError("Date is not valid")
        return data