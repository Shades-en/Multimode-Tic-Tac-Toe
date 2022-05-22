let playingAgainst=document.getElementById("playingAgainst");
let myself=false;
let computer=false;
let player=false;
var linkVar;

if(playingAgainst!=null){
    if(playingAgainst.textContent=="Myself"){
        myself=true;
        linkVar="myself";
    }
    else if(playingAgainst.textContent=="Computer"){
        computer=true;
        linkVar="computer";
    }
    else if(playingAgainst.textContent=="Player"){
        player=true;
    }
}



function titleReload(){
    let locationString="http://"+window.location.host+"/tic_tac_toe_app/";
    location.replace(locationString);
}

$('.container h1').on('click', titleReload);


// if(!player){
//     $(window).on('load', function(){
//         let url = window.location.toString()
//         let searching_string="tic_tac_toe_app/"+linkVar+"/";
//         let new_string="tic_tac_toe_app/";
//         window.history.pushState('', '', url.replace(searching_string, new_string));
//     });
// }



var left_cells=document.querySelectorAll(".left");
var middle_cells=document.querySelectorAll(".middle");
var right_cells=document.querySelectorAll(".right");
var turn=document.querySelector(".container .play h2");
var section=document.querySelector(".section");
var player_1=true;
var count=0;

if(!player){
    for(i=0;i<left_cells.length;i++){
        left_cells[i].addEventListener('click',func);
        middle_cells[i].addEventListener('click',func);
        right_cells[i].addEventListener('click',func);
    }
}

function func(){
    if(event.target.textContent===""){
        if(player_1){
            turn.textContent="Player two's Turn (O)";
            var entry="x";
            player_1=false;
            event.target.textContent=entry;
            if_win(entry);
        }   
        else{
            turn.textContent="Player one's Turn (X)";
            var entry="o";
            player_1=true;
            event.target.textContent=entry;
            if_win(entry);
        }
        count++;
        if(count===9){
            if(turn.textContent!="Player One has Won"){
                console.log(2)
                turn.textContent="Draw";
                section.textContent="Refresh to play again";
            }
        }
    }  
}

function  if_win(entry){
    var win1=(left_cells[0].textContent===middle_cells[0].textContent) &&  (middle_cells[0].textContent===right_cells[0].textContent) && (middle_cells[0].textContent!="");
    var win2=(left_cells[1].textContent===middle_cells[1].textContent) &&  (middle_cells[1].textContent===right_cells[1].textContent) && (middle_cells[1].textContent!="");
    var win3=(left_cells[2].textContent===middle_cells[2].textContent) &&  (middle_cells[2].textContent===right_cells[2].textContent) && (middle_cells[2].textContent!="");

    var win4=(left_cells[0].textContent===left_cells[1].textContent) && (left_cells[1].textContent===left_cells[2].textContent) && (left_cells[1].textContent!="");
    var win5=(middle_cells[0].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===middle_cells[2].textContent) && (middle_cells[1].textContent!="");
    var win6=(right_cells[0].textContent===right_cells[1].textContent) && (right_cells[1].textContent===right_cells[2].textContent) && (right_cells[1].textContent!="");;

    var win7=(left_cells[0].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===right_cells[2].textContent) && (middle_cells[1].textContent!="");
    var win8=(left_cells[2].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===right_cells[0].textContent) && (middle_cells[1].textContent!="");

    if(win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8){
        console.log(1);
        if(entry==="x"){
            console.log(1);
            turn.textContent="Player One has Won";
        }
        else{
            turn.textContent="Player two has won";
        }
        section.textContent="Refresh to play again";
    }
}





// player vs player-----------------------------------------------------------

$(".container .friendlyPlay").click(function(){
    $(".friendlyPlay div").css({"display":"block"});
});

var entry="";
if(player){
    var content=$(".container h6").text(); 
    let url = window.location.toString()
    searching_string="";
    new_string="";
    if(window.location.toString().includes("choice=x")){
        searching_string="?&choice=x";
        new_string="?&choice=o";
        entry="x";
    }
    else if(window.location.toString().includes("choice=o")){
        searching_string="?&choice=o";
        new_string="?&choice=x";
        entry="o";
    }
    url=url.replace(searching_string, new_string)
    $(".container h6").append(url);
}

if(document.getElementById("roomId")!=null)
    var roomId=document.getElementById("roomId").textContent;
var connectionString = 'ws://' + window.location.host + '/ws/play/' + roomId + '/';
var gameSocket = new WebSocket(connectionString);


if(player)
    document.getElementById("char").innerHTML="Your beautiful letter is <span>"+entry.toUpperCase()+"</span>";

if(player){
    for(i=0;i<left_cells.length;i++){
        if(player){
            left_cells[i].addEventListener('click',funct);
            middle_cells[i].addEventListener('click',funct);
            right_cells[i].addEventListener('click',funct);
        }  
    }
}

function funct(){
    if(event.target.textContent===""){
        if(player_1){
            player_1=false;
            var hitId=event.target.id;
            sendData(entry, hitId);
        }   
        else{
            alert("Wait for other to place the move")
        }
    }  
}

function sendData(entry, id){
    let data={
        "event":"MOVE",
        "message":{
            "entry":entry,
            "id":id
        } 
    }
    var element=document.getElementById(id); 
    if(element!=null && element.textContent===''){
        gameSocket.send(JSON.stringify(data));
        count++;
    }
    if(element!=null)
        element.textContent=entry;
    if(entry==="x"){
        turn.innerHTML="Player two's Turn (<span>O</span>)";
    }
    else if(entry==="o"){
        turn.innerHTML="Player one's Turn (<span>X</span>)";
    }
    if_won(entry);
    if(count>=9){
        if((turn.textContent!="Player One has Won")&&(turn.textContent!="Player two has won")){
            turn.textContent="Draw";
            data = {
                "event": "END",
                "message": "Draw"
            }
            gameSocket.send(JSON.stringify(data))
            section.textContent="Refresh to play again";
        }
    }
}

function  if_won(entry){
    var win1=(left_cells[0].textContent===middle_cells[0].textContent) &&  (middle_cells[0].textContent===right_cells[0].textContent) && (middle_cells[0].textContent!="");
    var win2=(left_cells[1].textContent===middle_cells[1].textContent) &&  (middle_cells[1].textContent===right_cells[1].textContent) && (middle_cells[1].textContent!="");
    var win3=(left_cells[2].textContent===middle_cells[2].textContent) &&  (middle_cells[2].textContent===right_cells[2].textContent) && (middle_cells[2].textContent!="");

    var win4=(left_cells[0].textContent===left_cells[1].textContent) && (left_cells[1].textContent===left_cells[2].textContent) && (left_cells[1].textContent!="");
    var win5=(middle_cells[0].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===middle_cells[2].textContent) && (middle_cells[1].textContent!="");
    var win6=(right_cells[0].textContent===right_cells[1].textContent) && (right_cells[1].textContent===right_cells[2].textContent) && (right_cells[1].textContent!="");;

    var win7=(left_cells[0].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===right_cells[2].textContent) && (middle_cells[1].textContent!="");
    var win8=(left_cells[2].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===right_cells[0].textContent) && (middle_cells[1].textContent!="");

    if(win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8){
        if(entry==="x"){
            data = {
                "event": "END",
                "message": `player1`
            }
            turn.textContent="Player One has Won";
        }
        else{
            data = {
                "event": "END",
                "message": `player2`
            }
            turn.textContent="Player two has won";
        }
        gameSocket.send(JSON.stringify(data))
        section.textContent="Refresh to play again";
    }
}

function connect() {
    gameSocket.onopen = function open() {
        console.log('WebSockets connection created.');
        gameSocket.send(JSON.stringify({
            "event": "START",
            "message": ""
        }));
    };

    gameSocket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    };


    // Sending the info about the room
    gameSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        data = data["payload"];
        let message = data['message'];
        let event = data["event"];
        switch (event) {
            case "START":
                if(turn.textContent!=event){  // checkin if the heading says start because normally it displays the result of game
                    window.location.replace(window.location.toString());   //to refresh by returning to the tic tac operation page
                }
                break;
            case "END": //to update on both pcs
                if(message==="player1"){
                    turn.textContent="Player One has Won"; 
                }
                else if(message==="player2"){
                    turn.textContent="Player Two has Won";
                }
                else{
                    turn.textContent="Draw";
                }
                section.textContent="Refresh to play again";
                var link=document.querySelector(".container h6");
                link.textContent="";
                break;
            case "MOVE":
                if(message["entry"] != entry){  //recieving on player 2's device and sending data to his pc
                    sendData(message["entry"], message["id"]); 
                    player_1 = true;      
                }
                break;
            default:
                console.log("No event")
        }
    };

    if (gameSocket.readyState == WebSocket.OPEN) {
        gameSocket.onopen();
    }
}

connect();
