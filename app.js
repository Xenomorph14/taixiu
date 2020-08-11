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
money.innerText = `${localStorage.getItem("money")}`;
let result_totalTai = 0;
let result_totalXiu = 0;
btnBet.addEventListener("click", () => {
  if (start <= 0) {
    showStatus("Hết giờ đặt cược");
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
  } else {
    totalTai.innerText = Number(totalTai.innerText) + Number(inputBetTai.value);
    money.innerText = Number(money.innerText) - Number(inputBetTai.value);
    totalXiu.innerText = Number(totalXiu.innerText) + Number(inputBetXiu.value);
    money.innerText = Number(money.innerText) - Number(inputBetXiu.value);
    inputBetTai.value = 0;
    inputBetXiu.value = 0;
    localStorage.setItem("money", money.innerText);
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
  dice.style.display = "block";
  setTimeout(() => {
    dice.style.display = "none";
    result.style.display = "flex";
  }, 3200);
  setTimeout(() => {
    result.style.display = "none";
    time.style.display = "block";
    startGame();
  }, 9000);
}

function showStatus(msg, timeout = 3000) {
  thongBao.innerHTML = msg;
  thongBao.style.opacity = 1;
  setTimeout(() => {
    thongBao.style.opacity = 0;
  }, timeout);
}
function gameOver() {
  let arrDice = rdDice();
  if (Number(arrDice[0] + arrDice[1] + arrDice[2]) <= 10) {
    money.innerText = Number(money.innerText) + Number(totalXiu.innerText) * 2;
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
  } else {
    money.innerText = Number(money.innerText) + Number(totalTai.innerText) * 2;
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
  }
  totalXiu.innerText = 0;
  totalTai.innerText = 0;
}
function startGame() {
  showStatus(`Game bắt đầu`);
  start = 10;
  let coutDownTime = setInterval(function () {
    time.innerHTML = `${start}`;
    start--;
    if (time.innerText == -1) {
      clearInterval(coutDownTime);
      time.style.display = "none";
      countDownDice();
      gameOver();
      time.innerText = "10";
      result_totalTai = 0;
      result_totalXiu = 0;
    }
  }, 1000);
}
startGame();
