var damage, damage2, oppAct, oppDmg, oppDef, pDmg, pDef, pcoin, coin, val, pickk, count=0;
var pH=100; //Assigning both player and opponents health to 100.
var oH=100;
document.getElementById("playH").innerHTML="Player: " + pH; //displays full health
document.getElementById("oppH").innerHTML="Opponent: " + oH;

function begin(){
    document.getElementById('tC').disabled=false; //enables toss coin after selection and disables select
    document.getElementById('pick').disabled=true;
}

function tossCoin(){ ///This function determines if the coin will be heads or tails, which will determine who will start the game the player or opponent.
    pickk=document.getElementById("pick").value;
    if(pickk==0){ //Determines if the player chose heads or tails.
        pcoin="head";
    }else{
        pcoin="tail";
    }
    coin=Math.floor(Math.random()*2);
    if(coin==0){ //Checks if the coin is heads or tails.
        coin="head";
    }else{
        coin="tail";
    }
    document.getElementById("flipResult").innerHTML="Coin is " + coin + ". You chose " + pcoin + "!";
    // ^ displays results of coin toss

    if(pcoin==coin){ //Determines if the players choice matches the coin.
        document.getElementById("act").innerHTML="You will attack!"
        document.getElementById("atk").disabled = false; 
    }else{
        document.getElementById("atk").disabled=false;
        document.getElementById("def").disabled=false;
    }
    document.getElementById("tC").disabled=true; //disables toss coin button
    document.getElementById("resetb").disabled=false; //enables reset button
}

function calculateDamage(){ //This calculates the damage of the opponent or player.
    damage=Math.floor(Math.random()*5)+1; 
    damage2=Math.floor(Math.random()*5)+1;
}

function opponentAction(){ //Determines if the opponent will attack or defend.
    oppAct=Math.floor(Math.random()*2);
    if(oppAct==1){ //Assigns the opponent to attack.
        oppAct="atk";
        oppDmg=damage2;
    }else{ //Assigns the opponent to defend.
        oppAct="def";
        oppDef=damage2;
    }
}

function playerAttack(){ //Determines what will happen if the player will choose to attack.
    if(count=0){ //Checks if the value of count is 0 (first round).
        pDmg=damage;
        if(oppAct=="atk"){ //If the opponent decides to attack.
            oH=oH-pDmg; //update health
            pH=pH-oppDmg;
            if(oH<=0){ //Checks opponents health.
                oH=0;
                document.getElementById("win").innerHTML="You win!"; //displays winner
                document.getElementById("atk").disabled=true;
                document.getElementById("oppH").innerHTML="Opponent: " + oH;
            }else if(pH<=0){ //Checks player health.
                pH=0;
                document.getElementById("win").innerHTML="Opponent wins!"; //displays winner
                document.getElementById("atk").disabled=true;
                document.getElementById("oppH").innerHTML="Player: " + pH;
            }else{
                document.getElementById("youAct").innerHTML="You inflict " + pDmg + " damage"; //display damage
                document.getElementById("secondAct").innerHTML="Opponent inflicts " + oppDmg + " damage";
                document.getElementById("playH").innerHTML="Player: " + pH; //update health
                document.getElementById("oppH").innerHTML="Opponent: " + oH;
            }
        }else{ //If the opponent defends.
            pDmg=pDmg-oppDef;
            document.getElementById("secondAct").innerHTML="";
            if(pDmg<=0){ //Checks if the opponents defense nullified attack
                pDmg=0;
                document.getElementById("youAct").innerHTML="The opponent completely defended the attack";
            }else{
                oH=oH-pDmg; //Subtracts defense from damage
                if(oH<=0){
                    oH=0;
                    document.getElementById("win").innerHTML="You win!"; //displays winner
                    document.getElementById("atk").disabled=true;
                    document.getElementById("oppH").innerHTML="Opponent: " + oH;
                }else{
                    document.getElementById("youAct").innerHTML="You inflict " + pDmg + " damage"; //displays damage done
                    document.getElementById("oppH").innerHTML="Opponent: " + oH; //updates health
                }
            }
        }
        count=1; //increases count to 1
    }else{
        //This part is the same exept it outputs "You will attack!" when pressed
        document.getElementById("act").innerHTML="You will attack!";
        pDmg=damage;
        if(oppAct=="atk"){
            oH=oH-pDmg;
            pH=pH-oppDmg;
            if(oH<=0){
                oH=0;
                document.getElementById("win").innerHTML="You win!";
                document.getElementById("atk").disabled=true;
                document.getElementById("oppH").innerHTML="Opponent: " + oH;
            }else if(pH<=0){ //Checks player health.
                pH=0;
                document.getElementById("win").innerHTML="Opponent wins!"; //displays winner
                document.getElementById("atk").disabled=true;
                document.getElementById("oppH").innerHTML="Player: " + pH;
            }else{
                document.getElementById("youAct").innerHTML="You inflict " + pDmg + " damage";
                document.getElementById("secondAct").innerHTML="Opponent inflicts " + oppDmg + " damage";
                document.getElementById("playH").innerHTML="Player: " + pH;
                document.getElementById("oppH").innerHTML="Opponent: " + oH;
            }
        }else{
            pDmg=pDmg-oppDef;
            document.getElementById("secondAct").innerHTML="";
            if(pDmg<=0){
                pDmg=0;
                document.getElementById("youAct").innerHTML="The opponent completely defended the attack.";
            }else{
                oH=oH-pDmg;
                if(oH<=0){
                    oH=0;
                    document.getElementById("win").innerHTML="You win!";
                    document.getElementById("atk").disabled=true;
                    document.getElementById("oppH").innerHTML="Opponent: " + oH;
                }else{
                    document.getElementById("youAct").innerHTML="You inflict " + pDmg + " damage";
                    document.getElementById("oppH").innerHTML="Opponent: " + oH;
                }
            }
        }
    }
    if(oH<=0 || pH<=0){ //disables buttons when won or enables button after first round
        document.getElementById("def").disabled=true;
    }else{
        document.getElementById("def").disabled=false;
    }
}

function playerDefend(){ //Determines what will happen if the player choose to defend.
    pDef=Math.floor(Math.random()*5)+1; //randomizes the defence
    document.getElementById("act").innerHTML="You will defend!";
    if(oppAct=="atk"){
        oppDmg=oppDmg-pDef; //Deducts damage
        if(oppDmg<=0){ //Checks if damage is nullified
            oppDmg=0;
            document.getElementById("youAct").innerHTML="You completely blocked the attack";
        }else{
            pH=pH-oppDmg;
            if(pH<=0){ //Checks player health
                pH=0;
                document.getElementById("playH").innerHTML="Player: " + pH;
                document.getElementById("win").innerHTML="Opponent Wins!"; //Outputs winner
                document.getElementById("def").disabled=true; //Disables defense button
            }else{
                document.getElementById("youAct").innerHTML="Opponent inflicts " + oppDmg + " damage"; //Outputs damage
                document.getElementById("playH").innerHTML="Player: " + pH; //Updates health
            }
        }
    }else{
        document.getElementById("youAct").innerHTML="Both of you defended" //Checks if both defended
    }
    if(pH<=0){ //Checks if player lost
        document.getElementById("atk").disabled=true;
    }else{ //Continues the game with enabled attack button
        document.getElementById("atk").disabled=false;
    }
}

function resetBtn(){ //Resets game
    location.reload();
}