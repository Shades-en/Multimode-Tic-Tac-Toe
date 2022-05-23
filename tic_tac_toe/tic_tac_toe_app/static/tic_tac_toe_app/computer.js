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
        // linkVar="computer";
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

var char=document.getElementById("char");
var button = document.createElement("BUTTON");
var buttonText = document.createTextNode("Play as O");
button.appendChild(buttonText);
char.appendChild(button)

turn.textContent="Your letter is X";

button.addEventListener("click", function(){
    if(!player_1){
        turn.textContent="Your letter is X";
        player_1=true;
        button.textContent="Play as O";
        count=0;
        for(i=1;i<=9;i++){
            if(document.getElementById(i).textContent!=""){
                document.getElementById(i).textContent="";
            }
        }
    }
    else if(player_1){
        turn.textContent="Your letter is O";
        player_1=false;
        button.textContent="Play as X";
        index=indexing();
        document.getElementById(index).textContent="x";
        usedIndex.push(index);
        count++;
    }
});



let usedIndex=[];

for(i=0;i<left_cells.length;i++){
    left_cells[i].addEventListener('click',func);
    middle_cells[i].addEventListener('click',func);
    right_cells[i].addEventListener('click',func);
}

function func(){
    button.disabled=true;
    if(event.target.textContent===""){
        if(player_1){                   ///////////playing as X
            var entry="x";
            event.target.textContent=entry;
            var hitId=parseInt(event.target.id);
            if(!win(entry) && count<9){
                entry="o";
                computerTurn(hitId, entry);
                win(entry);
            }
        }   
        else if(!player_1){                /////////playing as O
            var entry="o";
            event.target.textContent=entry;
            var hitId=parseInt(event.target.id);
            if(!win(entry) && count<9){
                entry="x";
                computerTurn(hitId, entry);
                win(entry);
            }
        }
        if(count>=9){
            if(turn.textContent!="Player One has Won"){
                turn.textContent="Draw";
                section.textContent="Refresh to play again";
            }
        }
    }  
}


function indexing(){
    var random=Math.floor(Math.random()*9)+1;
    while(usedIndex.includes(random) && usedIndex.length<9){
        random=Math.floor(Math.random()*9)+1;
    }
    return random;
}

function computerTurn(hitId, entry){
    usedIndex.push(hitId);
    index=indexing();
    usedIndex.push(index);
    count=count+2;
    if(entry=="x")
        var compEntry="o";
    else
        var compEntry="x";
    for(i=1;i<=9;i++){
        if(document.getElementById(i).textContent===""){
            document.getElementById(i).textContent=compEntry;
            if(win("check")){
                document.getElementById(i).textContent=entry;
                return;
            }
            document.getElementById(i).textContent="";
        }
    }
    document.getElementById(index).textContent=entry;
    
    
}

function  win(entry){
    var win1=(left_cells[0].textContent===middle_cells[0].textContent) &&  (middle_cells[0].textContent===right_cells[0].textContent) && (middle_cells[0].textContent!="");
    var win2=(left_cells[1].textContent===middle_cells[1].textContent) &&  (middle_cells[1].textContent===right_cells[1].textContent) && (middle_cells[1].textContent!="");
    var win3=(left_cells[2].textContent===middle_cells[2].textContent) &&  (middle_cells[2].textContent===right_cells[2].textContent) && (middle_cells[2].textContent!="");

    var win4=(left_cells[0].textContent===left_cells[1].textContent) && (left_cells[1].textContent===left_cells[2].textContent) && (left_cells[1].textContent!="");
    var win5=(middle_cells[0].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===middle_cells[2].textContent) && (middle_cells[1].textContent!="");
    var win6=(right_cells[0].textContent===right_cells[1].textContent) && (right_cells[1].textContent===right_cells[2].textContent) && (right_cells[1].textContent!="");;

    var win7=(left_cells[0].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===right_cells[2].textContent) && (middle_cells[1].textContent!="");
    var win8=(left_cells[2].textContent===middle_cells[1].textContent) && (middle_cells[1].textContent===right_cells[0].textContent) && (middle_cells[1].textContent!="");

    if(win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8){
        if(entry==="check"){
            return true;
        }
        if((entry==="x" && player_1) || (entry==="o" && !player_1)){
            turn.textContent="You Won";
        }
        else if((entry==="o" && player_1) || (entry==="x" && !player_1)){
            turn.textContent="Computer has won";
        }
        section.textContent="Refresh to play again";
        return true;
    }
    else
        return false;
}

