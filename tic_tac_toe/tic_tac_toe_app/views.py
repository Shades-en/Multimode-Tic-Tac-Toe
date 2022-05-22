from django.shortcuts import render, redirect
from django.conf import settings
import random
import string


session_key=''.join(random.choices(string.ascii_lowercase, k=6))
def index(request):
    lobby=True
    print(session_key)
    context={
        "lobby":lobby,
        "session_key":session_key,
    }
    if request.method == "POST":
        room_id = request.POST.get("room_id")
        return redirect(
            '/tic_tac_toe_app/play/%s?&choice=x' %room_id
        )
    return render(request, 'tic_tac_toe_app/index.html',context)

def myself(request):
    lobby=False
    game="Myself"
    context={
        "lobby":lobby,
        "game":game,
        
    }
    return render(request, 'tic_tac_toe_app/index.html',context)

def computer(request):
    lobby=False
    game="Computer"
    computer=True
    context={
        "lobby":lobby,
        "game":game,
        "computer":computer,
    }
    return render(request, 'tic_tac_toe_app/index.html',context)


def player2(request,session_key):
    choice = request.GET.get("choice")
    print(request.GET)
    lobby=False
    game="Player"
    context={
        "choice":choice,
        "lobby":lobby,
        "game":game,
        "key":session_key,
    }
    return render(request, 'tic_tac_toe_app/index.html',context)

    