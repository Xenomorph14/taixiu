const inputBetXiu = document.getElementById("input-bet-xiu");
const inputBetTai = document.getElementById("input-bet-tai");
inputBetXiu.addEventListener("blur", ()=>{
    let value_bet_xiu = inputBetXiu.value;
    if(value_bet_xiu< 0){
        inputBetXiu.value = 0;
    }
    else if(value_bet_xiu > 100000)
        inputBetXiu.value = 100000;
})
inputBetTai.addEventListener("blur", ()=>{
    let value_bet = inputBetTai.value;
    if(value_bet< 0){
        inputBetTai.value = 0;
    }
    else if(value_bet > 100000)
        inputBetTai.value = 100000;
})

// Time
    let time = document.getElementById("time");
    const dice = document.getElementById("dice");
    let result = document.getElementById("dice-result");
    let start = 1;
    function countDownDice(){
        dice.style.display ="block";
        setTimeout(() => {
            dice.style.display = "none";
            result.style.display = "block";
        },5000);
    }
    function show(){
        result.style.display = "none";
        time.style.display = "block";
    }
    let coutDownTime =  setInterval(function(){
        time.innerText = start;
        start--;
        if(start == -1){
            clearInterval(coutDownTime);
            time.style.display = "none";
            countDownDice();
        }
    },1000);



