// Login display

//Seletores

let login = document.querySelector("#login");
let home = document.querySelector("#home");
let modalGame = document.querySelector("#game-modal");
let playerOneInput = document.querySelector("#player1");
let playerTwoInput = document.querySelector("#player2");
let playerOneDisplay = document.querySelector("#displayp1");
let playerTwoDisplay = document.querySelector("#displayp2");

//Funções

let toggleGame = () => {
  modalGame.classList.toggle("hide");
};

//Eventos

playerOneInput.addEventListener("input", () => {
  playerOneDisplay.textContent = playerOneInput.value;
});

playerTwoInput.addEventListener("input", () => {
  playerTwoDisplay.textContent = playerTwoInput.value;
});

login.addEventListener("click", () => toggleGame());
home.addEventListener("click", () => toggleGame());

// Jogo da Velha

// Seletores

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
let winCounterOne = document.querySelector("#winCounterP1");
let winCounterTwo = document.querySelector("#winCounterP2");


const winConditions = [
  [0, 1, 2],
  [3, 4, 5], //[][][]
  [6, 7, 8], //[][][]
  [0, 3, 6], //[][][]
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentP = "X";
let program = false;
playGame();

function playGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Turno do ${currentP}`;
  program = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !program) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentP;
  cell.textContent = currentP;
}
function changePlayer() {
  currentP = currentP == "X" ? "0" : "X";
  if (currentP == "X") {
    statusText.textContent = ` Turno do ${playerOneInput.value}`;
    playerOneDisplay.classList.toggle("selecionado")
  } else {
    statusText.textContent = ` Turno do ${playerTwoInput.value}`;
    playerTwoDisplay.classList.toggle("selecionado")
  }
}
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if (currentP == "X") {
      statusText.textContent = ` ${playerOneInput.value} Venceu`;
      
      
    } else {
      statusText.textContent = ` ${playerTwoInput.value} Venceu`;
      
    }
    program = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Empate";
    program = false;
  } else {
    changePlayer();
  }
}

function pointsGame() {}

function restartGame() {
  currentP == "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Turno do ${currentP}`;
  cells.forEach((cell) => (cell.textContent = ""));
  program = true;
}
