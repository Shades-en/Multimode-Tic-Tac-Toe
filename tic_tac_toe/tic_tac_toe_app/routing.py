from django.conf.urls import url
from tic_tac_toe_app.consumers import TicTacToeConsumer

websocket_urlpatterns = [
    url(r'^ws/play/(?P<room_code>\w+)/$', TicTacToeConsumer.as_asgi()),
]