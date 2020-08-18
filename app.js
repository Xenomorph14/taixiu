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
const thongBao = document.getElementById("thongbao");
const diceRoll = document.getElementById("dice-roll");
const circleTai=document.getElementsByClassName("circle-tai");
const circleXiu=document.getElementsByClassName("circle-xiu");
//Random Dice

let start = 10;
function rdDice() {
  let rdDice1 = 1,
    rdDice2 = 1,
    rdDice3 = 1;
  rdDice1 = Math.floor(1 + Math.random() * 6);
  dice1.innerHTML = `  <img src="./img/dice${rdDice1}.png" alt="">`;
  rdDice2 = Math.floor(1 + Math.random() * 6);
  dice2.innerHTML = `  <img src="./img/dice${rdDice2}.png" alt="">`;
  rdDice3 = Math.floor(1 + Math.random() * 6);
  dice3.innerHTML = `  <img src="./img/dice${rdDice3}.png" alt="">`;
  return [rdDice1, rdDice2, rdDice3];
}

//BET
if(!localStorage.getItem('money')){
  localStorage.setItem("money", 10000000)
}
money.innerText = `${localStorage.getItem("money")}`;
btnBet.addEventListener("click", () => {
  if (start <= 0) {
    showStatus("Hết giờ đặt cược");
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
  } else {
    if (
      Number(money.innerText) >=
      Number(inputBetTai.value) + Number(inputBetXiu.value)
    ) {
      totalTai.innerText =
        Number(totalTai.innerText) + Number(inputBetTai.value);
      money.innerText = Number(money.innerText) - Number(inputBetTai.value);
      totalXiu.innerText =
        Number(totalXiu.innerText) + Number(inputBetXiu.value);
      money.innerText = Number(money.innerText) - Number(inputBetXiu.value);
      inputBetTai.value = 0;
      inputBetXiu.value = 0;
      localStorage.setItem("money", money.innerText);
    } else showStatus("Không đủ tiền để cược");
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
  }
});
btnClear.addEventListener("click", () => {
  inputBetTai.value = 0;
  inputBetXiu.value = 0;
});
inputBetXiu.addEventListener("keyup", () => {
  let value_bet_xiu = inputBetXiu.value;
  if (value_bet_xiu < 0) {
    showStatus("Số tiền cược không được âm");
    inputBetXiu.value = 0;
  } else if (value_bet_xiu > 100000) {
    inputBetXiu.value = 100000;
    showStatus("Số tiền cược không quá 100000");
  }
});

inputBetTai.addEventListener("keyup", () => {
  let value_bet = inputBetTai.value;
  if (value_bet < 0) {
    inputBetTai.value = 0;
    showStatus("Số tiền cược không được âm");
  } else if (value_bet > 100000) {
    inputBetTai.value = 100000;
    showStatus("Số tiền cược không quá 100000");
  }
});

// Time
let time = document.getElementById("time");
const dice = document.getElementById("dice");
let result = document.getElementById("dice-result");
function countDownDice() {
  diceRoll.src = "";
  diceRoll.src = "./img/roll1.gif";
  dice.style.display = "block";
}

function showStatus(msg, timeout = 3000) {
  thongBao.innerHTML = msg;
  thongBao.style.opacity = 1;
  setTimeout(() => {
    thongBao.style.opacity = 0;
  }, timeout);
}
function gameOver() {
  let roll = setInterval(() => {
    dice.style.display = "none";
    result.style.display = "flex";
    arrDice = rdDice();
    if(Number(arrDice[0] + arrDice[1] + arrDice[2]) <= 10){
      circleXiu[0].style.animation="zoominoutsinglefeatured 1s infinite";
    }else if(Number(arrDice[0] + arrDice[1] + arrDice[2]) > 10){
      circleTai[0].style.animation="zoominoutsinglefeatured 1s infinite";
  }
    tongKet();
    clearInterval(roll);
  }, 2000);
}
function tongKet() {
  // arrDice = rdDice();
  let resultMoney = setTimeout(() => {
    result.style.display = "none";
    time.style.display = "block";
    console.log(Number(arrDice[0] + arrDice[1] + arrDice[2]));
    if (Number(arrDice[0] + arrDice[1] + arrDice[2]) <= 10) {
      money.innerText =
        Number(money.innerText) + Number(totalXiu.innerText) * 2;
      if (totalXiu.innerText > totalTai.innerText)
        showStatus(
          `Ván này thắng ${
            Number(totalXiu.innerText) - Number(totalTai.innerText)
          }`
        );
      else if (totalXiu.innerText == totalTai.innerText)
        showStatus(`Ván này hòa`);
      else if (totalXiu.innerText < totalTai.innerText)
        showStatus(
          `Ván này thua ${
            Number(totalTai.innerText) - Number(totalXiu.innerText)
          }`
        );
        localStorage.setItem("money", money.innerText);
    } else {
      money.innerText =
        Number(money.innerText) + Number(totalTai.innerText) * 2;
      if (totalTai.innerText > totalXiu.innerText)
        showStatus(
          `Ván này thắng ${
            Number(totalTai.innerText) - Number(totalXiu.innerText)
          }`
        );
      else if (totalXiu.innerText == totalTai.innerText)
        showStatus(`Ván này hòa`);
      else if (totalTai.innerText < totalXiu.innerText)
        showStatus(
          `Ván này thua ${
            Number(totalXiu.innerText) - Number(totalTai.innerText)
          }`
        );
      localStorage.setItem("money", money.innerText);
    }
    totalXiu.innerText = 0;
    totalTai.innerText = 0;
    clearTimeout(resultMoney);
  }, 3000);
  setTimeout(function () {
    showStatus("Chờ game mới bắt đầu");
    circleXiu[0].style.animation="zoominoutsinglefeatured 0s infinite"
    circleTai[0].style.animation="zoominoutsinglefeatured 0s infinite"
  }, 4000);
  setTimeout(() => {
    startGame();
  }, 6000);
}
function startGame() {
  showStatus(`Game bắt đầu`);
  start = 60;
  let coutDownTime = setInterval(function () {
    time.innerHTML = `${start}`;
    start--;
    if (time.innerText == -1) {
      clearInterval(coutDownTime);
      time.style.display = "none";
      countDownDice();
      gameOver();
      time.innerText = "60";
    }
  }, 1000);
}
startGame();
