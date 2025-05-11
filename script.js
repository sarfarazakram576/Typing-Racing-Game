const carOne = document.getElementById("car-1");
const carTwo = document.getElementById("car-2");
const wordView = document.getElementById("word-to-type");
const wordInput = document.getElementById("typed-word");
const modal = document.getElementById("modal");
const startGameBtn = document.getElementById("start-game");

setTimeout(() => {
  carOne.style.left = "0%";
  carTwo.style.left = "0%";
}, 200);

let carOnePosition = 0;
let carTwoPosition = 0;
let isGameOver = false;
let startTime = null;
let wordCount = 0;
let currentWord = "";
let previousWord = "";

const words = [
  "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog",
  "sun", "moon", "star", "tree", "river", "hill", "sky", "cloud",
  "grass", "flower", "stone", "light", "dark", "wind", "storm",
  "snow", "rain", "cold", "hot", "warm", "cool", "day", "night",
  "dawn", "dusk", "leaf", "branch", "root", "seed", "bark", "wood",
  "fire", "ice", "steam", "wave", "ocean", "lake", "pond", "fish",
  "frog", "ant", "bee", "bird", "worm", "lamb", "goat", "cow",
  "horse", "lion", "tiger", "bear", "wolf", "mouse", "snake",
  "eagle", "hawk", "kite", "plane", "ship", "boat", "sail", "windy",
  "breeze", "calm", "rock", "cliff", "valley", "peak", "mount",
  "path", "trail", "road", "field", "farm", "barn", "fence",
  "gate", "house", "home", "room", "chair", "table", "cup", "plate",
  "spoon", "glass", "bottle", "book", "pen", "pencil", "brush", "paint"
];

const winner = (status) => {
  isGameOver = true;
  const elapsedTime = (Date.now() - startTime) / 1000 / 60;
  const wpm = Math.round(wordCount / elapsedTime);
  modal.innerHTML = `
    <h2>Game Over</h2>
    <h3>${status}</h3>
    <h3>Your WPM: ${wpm}</h3>
    <button onclick="playAgain()" class="btn">Play Again</button>
  `;
  modal.showModal();
};

const setNewWord = () => {
  let newWord;
  do {
    newWord = words[Math.floor(Math.random() * words.length)];
  } while (newWord === previousWord);

  currentWord = newWord;
  previousWord = newWord;
  wordView.innerText = currentWord;
};

wordInput.addEventListener("input", (e) => {
  if (isGameOver) return;
  if (e.target.value.trim() === currentWord) {
    wordCount++;
    wordInput.value = "";
    carTwoPosition += 10;
    carTwo.style.left = carTwoPosition + "%";

    if (carTwoPosition >= 80) {
      winner("You win");
    } else {
      setNewWord();
    }
  }
});

const carOneConstantMove = () => {
  const carOneMove = setInterval(() => {
    if (isGameOver) {
      clearInterval(carOneMove);
      return;
    }
    carOnePosition += 1;
    carOne.style.left = carOnePosition + `%`;
    if (carOnePosition >= 80) {
      winner("You lost");
    }
  }, 200);
};

const carTwoConstantMove = () => {
  const carTwoMove = setInterval(() => {
    if (isGameOver) {
      clearInterval(carTwoMove);
      return;
    }
    carTwoPosition += 0.05;
    carTwo.style.left = carTwoPosition + "%";
  }, 200);
};

const startGame = () => {
  carOnePosition = 0;
  carTwoPosition = 0;
  isGameOver = false;
  wordCount = 0;
  wordInput.value = "";
  carOne.style.left = "0%";
  carTwo.style.left = "0%";
  startTime = Date.now();
  setNewWord();
  wordInput.focus();
  carOneConstantMove();
  carTwoConstantMove();
};

const playAgain = () => {
  modal.close();
  carOne.style.left = "0%";
  carTwo.style.left = "0%";
  carOnePosition = 0;
  carTwoPosition = 0;
  isGameOver = true;

  setTimeout(() => {
    wordInput.blur();   // force re-focus
    wordInput.focus();  // so user can type immediately
  }, 700);

  setTimeout(() => {
    startGame();
  }, 800);
};

// Close modal on outside click but don’t restart game
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
    carOnePosition = 0;
    carTwoPosition = 0;
    carOne.style.left = "0%";
    carTwo.style.left = "0%";
    isGameOver = true;
  }
});

startGameBtn.addEventListener("click", startGame);
