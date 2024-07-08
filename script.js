document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("resetButton");
    const overlay = document.getElementById("overlay");
    const resultMessage = document.getElementById("resultMessage");
    const newGameButton = document.getElementById("newGameButton");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const checkWinner = () => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          isGameActive = false;
          resultMessage.textContent = `Player ${currentPlayer} Wins!`;
          overlay.classList.add("active");
          return true;
        }
      }
      if (!gameBoard.includes("")) {
        isGameActive = false;
        resultMessage.textContent = "It's a Draw!";
        overlay.classList.add("active");
        return true;
      }
      return false;
    };
  
    const handleCellClick = (event) => {
      const index = event.target.getAttribute("data-index");
      if (gameBoard[index] === "" && isGameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (!checkWinner()) {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    };
  
    const resetGame = () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach(cell => cell.textContent = "");
      currentPlayer = "X";
      isGameActive = true;
      messageElement.textContent = `Player ${currentPlayer}'s turn`;
    };
  
    const startNewGame = () => {
      overlay.classList.remove("active");
      resetGame();
    };
  
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", startNewGame);
  
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
  });
  