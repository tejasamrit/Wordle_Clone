const words = ["apple", "table", "chair", "grape", "spoon", "brush", "cloud", "plant", "stone", "light", "music", "house", "river", "ocean", "train", "mouse", "piano", "glove", "earth", "heart", "smile", "bread", "dance", "flame", "space", "crown", "dream", "peace", "beach", "flour", "grill", "lunch", "medal", "night", "paint", "queen", "robot", "sugar", "tower", "vowel", "wrist"];
let solution = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentGuess = "";
const maxGuesses = 6;

const board = document.getElementById("board");
const restartButton = document.createElement("button");
restartButton.innerText = "Restart";
restartButton.classList.add("btn");
restartButton.addEventListener("click", restartGame);
document.body.appendChild(restartButton);

const hintButton = document.createElement("button");
hintButton.innerText = "Hint";
hintButton.classList.add("btn");
hintButton.addEventListener("click", showHint);
document.body.appendChild(hintButton);

// const toggleModeButton = document.createElement("button");
// toggleModeButton.innerText = "Toggle Mode";
// toggleModeButton.classList.add("btn");
// toggleModeButton.addEventListener("click", toggleMode);
// document.body.appendChild(toggleModeButton);

// Create game board
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (event) => handleKeyPress(event.key.toUpperCase()));
    for (let i = 0; i < maxGuesses * 5; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("id", `tile-${i}`);
        board.appendChild(tile);
    }
});

// Handle key press
function handleKeyPress(key) {
    if (key === "BACKSPACE" && currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
    } else if (key === "ENTER" && currentGuess.length === 5) {
        checkGuess();
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
        currentGuess += key.toLowerCase();
    }
    updateBoard();
}

// Update board display
function updateBoard() {
    const rowStart = currentRow * 5;
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${rowStart + i}`);
        tile.textContent = currentGuess[i] || "";
    }
}

// Check guess function
function checkGuess() {
    if (currentGuess === solution) {
        alert("Congratulations! You guessed the word.");
    }
    
    const rowStart = currentRow * 5;
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${rowStart + i}`);
        if (currentGuess[i] === solution[i]) {
            tile.classList.add("correct");
        } else if (solution.includes(currentGuess[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }
    
    if (currentGuess === solution || currentRow === maxGuesses - 1) {
        setTimeout(() => alert(`The word was: ${solution}`), 500);
    } else {
        currentRow++;
        currentGuess = "";
    }
}

// Restart Game function
function restartGame() {
    solution = words[Math.floor(Math.random() * words.length)];
    currentRow = 0;
    currentGuess = "";
    document.querySelectorAll(".tile").forEach(tile => {
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    });
}

// Hint feature function
function showHint() {
    alert(`Hint: The word starts with '${solution[0]}'`);
}

// // Toggle Dark/Light Mode function
// function toggleMode() {
//     document.body.classList.toggle("light-mode");
// }

// document.getElementById('toggle-mode').addEventListener('click', function () {
//   document.body.classList.toggle('light-mode');
// });

