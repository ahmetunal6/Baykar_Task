from django.shortcuts import render
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .models import SihaIha
from .serializers import SihaIhaSerializers
from rest_framework import generics, filters, permissions



from django_filters.rest_framework import DjangoFilterBackend

class SihaIhaListApi(generics.ListAPIView):
    serializer_class=SihaIhaSerializers
    filter_backends = [filters.SearchFilter]
    search_fields = ['brand','name']  ## apide ?search ile aranabilir alanları tanımladım kullanıcı arama yaptığında ad ve marka değerlerine göre filtre yapar
    def get_queryset(self):
        queryset = SihaIha.objects.all()  ## sorguyu django orm kullanarak database gerek kalmadan yapıyoruz, tüm objeleri alıyoruz
             
        name_query = self.request.query_params.get('name', None) ##
        brand_query = self.request.query_params.get('brand', None) ##
        country_query = self.request.query_params.get('country', None)## name brand ve model alanlarına göre kullanıcı filtre işlemi yapması için queryset metodumu güncelledim

        if name_query:
            queryset = queryset.filter(name__icontains=name_query)

        if brand_query:
            queryset = queryset.filter(brand__icontains=brand_query)

        if country_query:
            queryset = queryset.filter(country__icontains=country_query)

        return queryset
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
 
class SihaIhaCreateApi(generics.CreateAPIView): ## burda bir iha oluşturma apisidir 

    serializer_class=SihaIhaSerializers    

class SihaIhaUpdateOrDelete(generics.RetrieveUpdateDestroyAPIView): ## bu apide ihalar güncellenebilir silinebilir / bunları yapabilmek için o ihanın idsini kullanırız

    
    serializer_class=SihaIhaSerializers 
    def get_queryset(self):
        queryset = SihaIha.objects.all()
        return queryset


def Liste(request):
    return render(request,"index.html")
def Update(request):
    return render(request,"update.html")
def Create(request):
    return render(request,"create.html")