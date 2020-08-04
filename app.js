const inputBetXiu = document.getElementById("input-bet-xiu");
const inputBetTai = document.getElementById("input-bet-tai");
let totalTai = document.getElementById("total-tai");
let totalXiu = document.getElementById("total-xiu");
const btnBet = document.getElementById("btn-bet");
const btnClear = document.getElementById("btn-clear");

//bet

let result_totalTai = 0;
let result_totalXiu = 0;
btnBet.addEventListener("click", () => {
    result_totalTai += Number(inputBetTai.value);
    totalTai.innerHTML = `Tổng: ${result_totalTai}`;
    result_totalXiu += Number(inputBetXiu.value);
    totalXiu.innerHTML = `Tổng: ${result_totalXiu}`;
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
});
btnClear.addEventListener("click", () => {
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
})
inputBetXiu.addEventListener("blur", () => {
    let value_bet_xiu = inputBetXiu.value;
    if (value_bet_xiu < 0) {
        inputBetXiu.value = 0;
    }
    else if (value_bet_xiu > 100000)
        inputBetXiu.value = 100000;
})
inputBetTai.addEventListener("blur", () => {
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
    dice.style.backgroundImage = 'url(./img/roll1.gif)';
    setTimeout(() => {
        dice.style.display = "none";
        result.style.display = "block";
    }, 4000);
    setTimeout(() => {
        result.style.display = "none";
        time.style.display = "block";
        startGame();
    }, 7000);
}

function startGame() {
    let start = 5;
    let coutDownTime = setInterval(function () {
        time.innerText = start;
        start--;
        if (start == -1) {
            clearInterval(coutDownTime);
            time.style.display = "none";
            countDownDice();
        }
    }, 1000);
}

startGame();



