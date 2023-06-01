from django.urls import path
from ihaPage.views import *
from . import views
urlpatterns = [
    path("/iha",SihaIhaListApi.as_view(),name="SihaIhaListApi"),
    path("/iha/create",SihaIhaCreateApi.as_view(),name="SihaIhaCreateApiView"),
    path("/iha/<int:pk>",SihaIhaUpdateOrDelete.as_view(),name="SihaIhaUpdateOrDeleteApiView"),
    path("/index",views.Liste,name="Liste"),
    path("/update",views.Update,name="Update"),
    path("/create",views.Create,name="Create")
]
