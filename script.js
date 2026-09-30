/*
TIC TAC TOE - JS LOGIC

1. Select all cells and buttons.
2. Track current player: X / O.
3. Maintain board array.
4. On cell click:
   - Check game is not over.
   - Check cell is empty.
   - Show X / O.
   - Update board.
   - Check winner.
   - Check draw.
   - Switch player.
5. Check all winning combinations.
6. If winner:
   - Show winner.
   - Highlight winning cells.
   - Stop game.
7. If board is full without winner:
   - Show draw.
   - Stop game.
8. New Game:
   - Clear board.
   - Remove winner highlight.
   - Reset player.
   - Reset messages.
*/


// ========================================
// SELECT ELEMENTS
// ========================================

const cells = document.querySelectorAll(".cell");

const turnMessage =
    document.getElementById("turn-message");

const resultMessage =
    document.getElementById("result-message");

const resetButton =
    document.getElementById("reset-btn");


// ========================================
// GAME VARIABLES
// ========================================

let currentPlayer = "X";

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let gameOver = false;


// ========================================
// WINNING COMBINATIONS
// ========================================

const winningCombinations = [

    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]

];


// ========================================
// CELL CLICK
// ========================================

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        // Game already over?
        if (gameOver) {
            return;
        }


        // Cell already filled?
        if (cell.textContent !== "") {
            return;
        }


        // Get cell index
        const index = cell.dataset.index;


        // Show X or O
        cell.textContent = currentPlayer;


        // Update board
        board[index] = currentPlayer;


        // Check winner
        checkWinner();


        // If winner found, stop here
        if (gameOver) {
            return;
        }


        // Check draw
        if (!board.includes("")) {

            resultMessage.textContent =
                "It's a Draw! 🤝";

            resultMessage.style.background =
                "orange";

            gameOver = true;

            turnMessage.textContent =
                "Game Over!";

            return;
        }


        // Switch player
        currentPlayer =
            currentPlayer === "X" ? "O" : "X";


        // Get player name
        const playerName =
            currentPlayer === "X"
                ? "Player 1"
                : "Player 2";


        // Update turn message
        turnMessage.textContent =
            `${playerName}'s Turn`;

    });

});


// ========================================
// CHECK WINNER
// ========================================

function checkWinner() {

    for (let combination of winningCombinations) {

        if (

            // First cell is not empty
            board[combination[0]] !== "" &&

            // First = Second
            board[combination[0]] ===
            board[combination[1]] &&

            // Second = Third
            board[combination[1]] ===
            board[combination[2]]

        ) {


            // Get winner
            const winner =
                board[combination[0]];


            // Get player name
            const winnerName =
                winner === "X"
                    ? "Player 1"
                    : "Player 2";


            // Show winner message
            resultMessage.textContent =
                `${winnerName} Wins! 🎉`;


            // Winner color
            if (winner === "X") {

                resultMessage.style.background =
                    "green";

            } else {

                resultMessage.style.background =
                    "red";

            }


            // Highlight winning cells
            cells[combination[0]]
                .classList.add("winner");

            cells[combination[1]]
                .classList.add("winner");

            cells[combination[2]]
                .classList.add("winner");


            // Stop game
            gameOver = true;


            // Change turn message
            turnMessage.textContent =
                "Game Over!";


            return;
        }
    }
}


// ========================================
// NEW GAME
// ========================================

resetButton.addEventListener("click", function () {


    // Reset board
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    // Clear cells
    cells.forEach(function (cell) {

        cell.textContent = "";

        // Remove winner highlight
        cell.classList.remove("winner");

    });


    // Player 1 starts
    currentPlayer = "X";


    // Game active again
    gameOver = false;


    // Reset turn message
    turnMessage.textContent =
        "Player 1's Turn";


    // Remove old result
    resultMessage.textContent = "";


    // Remove old background
    resultMessage.style.background = "";

});