from django.db import models

# Create your models here.

class SihaIha(models.Model):    
    name=models.CharField(max_length=40,verbose_name="İha-Siha isim",blank=True,null=True)
    brand=models.CharField(max_length=40,verbose_name="Marka",blank=True,null=True)
    model=models.CharField(max_length=40,verbose_name="Model ismi")
    weight=models.IntegerField(max_length=20,verbose_name="Ağırlık")    
    image=models.ImageField(upload_to='image',blank=True,null=True)
    description=models.CharField(max_length=40,verbose_name="Ürün Açıklaması",blank=True,null=True)
    category = models.CharField(max_length=40,verbose_name="category",blank=True,null=True)
    country= models.CharField(max_length=40,verbose_name="country",blank=True,null=True)
    