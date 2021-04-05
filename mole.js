const moles = document.querySelectorAll(".mole");
const startButton = document.getElementById("start");
const scoreText = document.querySelector("#score");
const timeText = document.querySelector("#time");

let lastMole;
let timesUp = false;
let score = 0;
let time = 15;



startButton.addEventListener("click", startGame);
moles.forEach((mole) => mole.addEventListener("click", hit));


function randomMole() {
  const line = Math.floor(Math.random() * moles.length);
  const choosen = moles[line];
  if (lastMole === choosen) {
    return randomMole();
  } else {
    lastMole = choosen;
  }
  return choosen;
}

function randomTime(min, max) {
  const time = Math.round(Math.random() * (max - min)) + min;
  return time;
}

function up() {
  const mole = randomMole();
  const moleTime = randomTime(750, 1250);
  mole.classList.add("choosen");
  setTimeout(() => {
    mole.classList.remove("choosen");
    if (!timesUp) up();
  }, moleTime);
}

function startTime() {
  if (!timesUp) {
    time--;
    timeText.textContent = time;
  } else {
    timeText.textContent = "Time's Up!";
  }
}

function startGame() {
  time = 15;
  score = 0;
  timesUp = false;
  const interval = setInterval(() => {
    startTime();
    if (timesUp) clearInterval(interval);
  }, 1000);
  up();
  setTimeout(() => {
    timesUp = true;
  }, time * 1000);
}

function hit(e) {
  if (e.target.classList.contains("choosen")) {
    score++;
    e.target.classList.remove("choosen");
  }
  scoreText.textContent = score;
}