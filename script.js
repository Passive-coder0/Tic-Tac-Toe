let newGame = document.getElementById("new");
let boxes = document.querySelectorAll(".box");
let chosenBox = null;
let gameStatus = document.getElementById("status");

newGame.addEventListener('click', function(){
    boxes.forEach(box => box.innerHTML = "");
    gameStatus.innerHTML = "";
    console.log("Clicked New Game");
})
boxes.forEach(box => {
    box.addEventListener('click', function() {
        chosenBox = box;

        // Player 1 plays
        if (chosenBox.innerHTML === "") {
            player1.play();

            // Check if Player 1 won
            if (checkWin()) {
                gameStatus.innerHTML = "Player 1 Wins!";
                return;
            }

            // Check if the board is full
            let emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
            if (emptyBoxes.length === 0) {
                gameStatus.innerHTML = "No more empty boxes, game over!";
                return;
            }

            // Player 2 plays
            chosenBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            player2.play();

            // Check if Player 2 won
            if (checkWin()) {
                gameStatus.innerHTML = "Player 2 Wins!";
                return;
            }

            // Check if the board is full after Player 2's move
            emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
            if (emptyBoxes.length === 0) {
                gameStatus.innerHTML = "No more empty boxes, game over!";
            }
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
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];
    //A = B = C and not empty
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boxes[a].innerHTML !== "" &&
               boxes[a].innerHTML === boxes[b].innerHTML &&
               boxes[a].innerHTML === boxes[c].innerHTML;
    });
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.play = function() {
        chosenBox.innerHTML = `${this.marker}`;
    }
}
let player1 = new Player("User", "X");
let player2 = new Player("CPU", "O");