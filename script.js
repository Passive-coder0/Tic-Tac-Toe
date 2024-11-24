let newGame = document.getElementById("new");
let boxes = document.querySelectorAll(".box");
let chosenBox = null;
let gameStatus = document.getElementById("status");
let gameActive = true;

newGame.addEventListener("click", function () {
  boxes.forEach((box) => {
    box.innerHTML = ""; // Clear the box content
    box.classList.remove("x-marker", "o-marker"); // Remove marker-specific classes
  });
  gameStatus.innerHTML = ""; // Clear the game status
  gameActive = true; // Reset the game to active
  console.log("Clicked New Game");
});

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (!gameActive) return; // Ignore clicks if the game is not active

    chosenBox = box;

    // Player 1 plays
    if (chosenBox.innerHTML === "") {
      player1.play();

      // Check if Player 1 won
      if (checkWin()) {
        gameStatus.innerHTML = "Player 1 Wins!";
        gameActive = false; // End the game
        return;
      }

      // Check if the board is full
      let emptyBoxes = Array.from(boxes).filter((box) => box.innerHTML === "");
      if (emptyBoxes.length === 0) {
        gameStatus.innerHTML = "No more empty boxes <br> game over!";
        gameActive = false; // End the game
        return;
      }

      // Delay Player 2's move
      setTimeout(() => {
        // Player 2 plays
        emptyBoxes = Array.from(boxes).filter((box) => box.innerHTML === ""); // Update empty boxes
        if (emptyBoxes.length > 0) {
          chosenBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
          player2.play();

          // Check if Player 2 won
          if (checkWin()) {
            gameStatus.innerHTML = "Player 2 Wins!";
            gameActive = false; // End the game
            return;
          }

          // Check if the board is full after Player 2's move
          emptyBoxes = Array.from(boxes).filter((box) => box.innerHTML === "");
          if (emptyBoxes.length === 0) {
            gameStatus.innerHTML = "No more empty boxes <br> game over!";
            gameActive = false; // End the game
          }
        }
      }, 1000); // Adjust the delay time as needed (e.g., 400 milliseconds)
    }
  });
});

function checkWin() {
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return (
      boxes[a].innerHTML !== "" &&
      boxes[a].innerHTML === boxes[b].innerHTML &&
      boxes[a].innerHTML === boxes[c].innerHTML
    );
  });
}

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.play = function () {
    if (chosenBox) {
      chosenBox.innerHTML = `${this.marker}`;
      chosenBox.classList.add(`${this.marker.toLowerCase()}-marker`); // Add the marker class for CSS animation
    }
  };
}

let player1 = new Player("User", "X");
let player2 = new Player("CPU", "O");
