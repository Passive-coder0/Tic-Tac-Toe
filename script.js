let newGame = document.getElementById("new");
let boxes = document.querySelectorAll(".box");
let chosenBox = null;

newGame.addEventListener('click', function(){
    boxes.forEach(box => box.innerHTML = "");
    console.log("Clicked New Game");
})
boxes.forEach(box => {
    box.addEventListener('click', function() {
        chosenBox = box;
        if (chosenBox.innerHTML == ""){
            player1.play();
            console.log("Clicked");
            console.log(chosenBox);
        }
    })
});

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.play = function() {
        chosenBox.innerHTML = `${this.marker}`;
    }
}
let player1 = new Player("User", "X");
let player2 = new Player("CPU", "O");