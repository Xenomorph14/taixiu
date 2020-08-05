const inputBetXiu = document.getElementById("input-bet-xiu");
const inputBetTai = document.getElementById("input-bet-tai");
const totalTai = document.getElementById("total-tai");
const totalXiu = document.getElementById("total-xiu");
const btnBet = document.getElementById("btn-bet");
const btnClear = document.getElementById("btn-clear");
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const money = document.getElementById("tkhienco");

//Random Dice

function rdDice() {
    let rdDice1 = 1, rdDice2 = 1, rdDice3 = 1;
    rdDice1 = Math.floor(1 + Math.random() * 6);
    dice1.innerHTML = `  <img src="./img/dice${rdDice1}.png" alt="">`;
    rdDice2 = Math.floor(1 + Math.random() * 6);
    dice2.innerHTML = `  <img src="./img/dice${rdDice2}.png" alt="">`;
    rdDice3 = Math.floor(1 + Math.random() * 6);
    dice3.innerHTML = `  <img src="./img/dice${rdDice3}.png" alt="">`;
    return [rdDice1, rdDice2, rdDice3];
}

//BET
let result_totalTai = 0;
let result_totalXiu = 0;
btnBet.addEventListener("click", () => {
    result_totalTai += Number(inputBetTai.value);
    totalTai.innerHTML = `${result_totalTai}`;
    money.innerText = Number(money.innerText) - Number(inputBetTai.value);
    result_totalXiu += Number(inputBetXiu.value);
    totalXiu.innerHTML = `${result_totalXiu}`;
    money.innerText = Number(money.innerText) - Number(inputBetXiu.value);
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
});
btnClear.addEventListener("click", () => {
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
})
inputBetXiu.addEventListener("keyup", () => {
    let value_bet_xiu = inputBetXiu.value;
    if (value_bet_xiu < 0) {
        inputBetXiu.value = 0;
    }
    else if (value_bet_xiu > 100000)
        inputBetXiu.value = 100000;
})
inputBetTai.addEventListener("keyup", () => {
    let value_bet = inputBetTai.value;
    if (value_bet < 0) {
        inputBetTai.value = 0;
    }
    else if (value_bet > 100000)
        inputBetTai.value = 100000;
})

// Time
let time = document.getElementById("time");
const dice = document.getElementById("dice");
let result = document.getElementById("dice-result");
function countDownDice() {
    dice.style.display = "block";
    setTimeout(() => {
        dice.style.display = "none";
        result.style.display = "block";
    }, 3300);
    setTimeout(() => {
        result.style.display = "none";
        time.style.display = "block";
        startGame();
    }, 7000);
}

function gameOver() {
    let arrDice = rdDice();
    let result;
    let sum = Number(arrDice[0] + arrDice[1] + arrDice[2]);
    if (sum <= 10)
        result = "xiu";
    else result = "tai";
    if (result == "xiu") {
        money.innerText =Number(money.innerText) + Number(totalXiu.innerText) * 2;
    } else {
        money.innerText = Number(money.innerText) + Number(totalTai.innerText) * 2;
    }
};

function startGame() {
    let start = 15;
  
    let coutDownTime = setInterval(function () {
        time.innerText = start;
        start--;
        if (start == -1) {
            clearInterval(coutDownTime);
            time.style.display = "none";
            countDownDice();
        }
    }, 1000);
    gameOver();
    result_totalTai=0;
    result_totalXiu=0;
    totalXiu.innerHTML = `0`;
    totalTai.innerHTML = `0`;
    
}

startGame();
gameOver();



