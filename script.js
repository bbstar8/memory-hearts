const cards = ["💖", "💖", "😍", "😍", "💌", "💌", "💕", "💕", "💘", "💘", "💓", "💓"];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false; // Flag to track if the game has started

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");
  const shuffledCards = shuffle(cards);
  gameBoard.innerHTML = ""; // Clear board before creating
  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;
    cardElement.dataset.value = card;
    cardElement.textContent = "?";
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard(event) {
  const card = event.target;
  if (!gameStarted) {
    // Start the timer on the first move
    gameStarted = true;
    startTimer();
  }
  if (!flippedCards.includes(card) && !matchedCards.includes(card) && flippedCards.length < 2) {
    card.textContent = card.dataset.value;
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      moves++; // Increment moves
      document.getElementById("moves-counter").textContent = `Moves: ${moves}`;
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      clearInterval(timerInterval); // Stop timer
      setTimeout(() => {
        alert(`🎉 You finished in ${timer} seconds and ${moves} moves! Look at you, Rockstar! Happy Valentine's Day ❤️`);
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.textContent = "?";
      card2.textContent = "?";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

function resetGame() {
  flippedCards = [];
  matchedCards = [];
  moves = 0;
  timer = 0;
  gameStarted = false; // Reset gameStarted flag
  clearInterval(timerInterval);
  document.getElementById("moves-counter").textContent = "Moves: 0";
  document.getElementById("timer").textContent = "Time: 0 seconds";
  startTimer();
  createBoard();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = `Time: ${timer} seconds`;
  }, 1000);
}


createBoard();

