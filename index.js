const prompt = require("prompt-sync")({ sigint: true }); // For reading user input in Node.js

let gamesPlayed = [];

function initializeGame(category) {
  const words = {
    movies: ["John Wick", "The Godfather", "Matrix"],
    books: ["War and Peace", "Emma", "Dracula"],
    sports: ["football", "basketball", "tennis"],
  };
  const secretWord =
    words[category][Math.floor(Math.random() * words[category].length)];
  return {
    secretWord,
    guessedLetters: new Set(),
    attemptsLeft: 10,
    shrugman: "¯\\_(:/)_/¯".split(""),
    currentState: "_".repeat(secretWord.replace(/ /g, "").length),
  };
}

function updateCurrentState(game) {
  let displayState = "";
  for (let char of game.secretWord) {
    if (char === " " || game.guessedLetters.has(char.toLowerCase())) {
      displayState += char;
    } else {
      displayState += "_";
    }
  }
  return displayState;
}

function displayGameState(game) {
  console.clear();
  console.log(`${game.currentState}`);
  console.log(`${game.shrugman.slice(0, 10 - game.attemptsLeft).join("")}`);
  //   console.log(`Attempts left: ${game.attemptsLeft}`);
}

function playGame(category) {
  let game = initializeGame(category);

  while (game.attemptsLeft > 0 && game.currentState.includes("_")) {
    displayGameState(game);
    let guess = prompt("Guess a letter: ").toLowerCase();
    guess;
    if (game.guessedLetters.has(guess)) {
      continue;
    }

    game.guessedLetters.add(guess);

    if (game.secretWord.toLowerCase().includes(guess)) {
      game.currentState = updateCurrentState(game);
    } else {
      game.attemptsLeft--;
    }
  }

  const result = game.currentState.includes("_") ? "loss" : "win";
  gamesPlayed.push(`${game.secretWord} - ${result}`);
  displayGameState(game);

  console.log(
    result === "win" ? "Congratulations, you won!" : "Sorry, you lost."
  );

  const playAgain = prompt(
    "Do you want to play another round? (yes/no): "
  ).toLowerCase();
  if (playAgain === "yes") {
    playGame(category);
  } else {
    console.log("Bye");
  }
}

const category = prompt(
  "Choose a category (movies/books/sports): "
).toLowerCase();
playGame(category);
