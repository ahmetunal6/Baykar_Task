from ihaPage.models import *
from rest_framework import serializers
# Create your views here.
class SihaIhaSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = SihaIha
        fields = '__all__'        