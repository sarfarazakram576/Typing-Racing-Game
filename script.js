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
  "monitor",
  "zebra",
  "buzzing",
  "pillow",
  "forest",
  "subtle",
  "light",
  "wallet",
  "imagination",
  "web",
  "microphone",
  "window",
  "needle",
  "door",
  "castle",
  "pumpkin",
  "run",
  "guitar",
  "sofa",
  "desktop",
  "twelfth",
  "phone",
  "fan",
  "zip",
  "motorcycle",
  "environment",
  "mirror",
  "orange",
  "pirate",
  "bottle",
  "storm",
  "people",
  "keyboard",
  "plate",
  "calendar",
  "road",
  "camera",
  "window",
  "kingdom",
  "awkward",
  "vortex",
  "penguin",
  "hill",
  "bizarre",
  "plastic",
  "yacht",
  "hunter",
  "whiz",
  "planet",
  "cloudy",
  "rain",
  "zombie",
  "sphinx",
  "goat",
  "jar",
  "sky",
  "moon",
  "pen",
  "lamp",
  "lamp",
  "cup",
  "people",
  "browser",
  "syzygy",
  "goblin",
  "sail",
  "bark",
  "brush",
  "fluff",
  "peach",
  "cactus",
  "zodiac",
  "butter",
  "reboot",
  "cat",
  "improvement",
  "exodus",
  "notebook",
  "mouse",
  "lemon",
  "badge",
  "spark",
  "blanket",
  "snow",
  "jungle",
  "storm",
  "rocket",
  "gate",
  "garage",
  "glass",
  "door",
  "valley",
  "cliff",
  "drawer",
  "curtain",
  "owl",
  "path",
  "whistle",
  "cheetah",
  "breeze",
  "trunk",
  "penguin",
  "jigsaw",
  "egg",
  "mystify",
  "paint",
  "rhythm",
  "buzz",
  "warm",
  "zip",
  "bat",
  "glass",
  "book",
  "ant",
  "gizmo",
  "station",
  "twelfth",
  "pencil",
  "tiger",
  "subtle",
  "badge",
  "egg",
  "luxury",
  "astronomy",
  "magic",
  "syzygy",
  "train",
  "sun",
  "puzzle",
  "xylophone",
  "opaque",
  "exodus",
  "kite",
  "vortex",
  "bridge",
  "forest",
  "leaf",
  "ship",
  "rain",
  "peak",
  "numb",
  "quiz",
  "pickle",
  "dark",
  "flower",
  "cloud",
  "pen",
  "shade",
  "twilight",
  "sparkle",
  "castle",
  "lamp",
  "the",
  "door",
  "meat",
  "knife",
  "dog",
  "consequence",
  "toilet",
  "blanket",
  "keyboard",
  "handle",
  "dragon",
  "lamp",
  "table",
  "gate",
  "plane",
  "jazz",
  "xylophone",
  "syzygy",
  "draw",
  "shower",
  "cat",
  "zipper",
  "butter",
  "rhythm",
  "phobia",
  "tray",
  "shade",
  "creativity",
  "faucet",
  "steak",
  "luxury",
  "light",
  "snake",
  "moon",
  "plate",
  "pillow",
  "depth",
  "stream",
  "steep",
  "knapsack",
  "quartz",
  "zipper",
  "pickle",
  "freezer",
  "queue",
  "trophy",
  "watch",
  "fire",
  "horse",
  "penguin",
  "incredible",
  "jigsaw",
  "river",
  "laptop",
  "couch",
  "brush",
  "towel",
  "zip",
  "kitchen",
  "field",
  "fish",
  "creativity",
  "fluff",
  "cold",
  "oxygen",
  "barn",
  "imagination",
  "spark",
  "door",
  "jazz",
  "crypt",
  "shampoo",
  "fluff",
  "opaque",
  "apple",
  "glass",
  "lamp",
  "buzz",
  "chalk",
  "knapsack",
  "cup",
  "mug",
  "axe",
  "root",
  "jungle",
  "zipper",
  "steam",
  "wave",
  "sphinx",
  "pneumonia",
  "remote",
  "remote",
  "charger",
  "bag",
  "purse",
  "wrist",
  "revolution",
  "achievement",
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
    wordInput.blur(); // force re-focus
    wordInput.focus(); // so user can type immediately
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
