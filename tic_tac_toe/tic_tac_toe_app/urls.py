from django.urls import path
from . import views

app_name = "tic_tac_toe_app"

urlpatterns = [
    path('', views.index, name='index'),
    path('myself/', views.myself, name='myself'),
    path('computer/', views.computer, name='computer'),
    path('play/<str:session_key>/', views.player2, name='player2'),
]