
const highScoresDisplay = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");
const noScore = document.getElementById("no-scores");

clearBtn.addEventListener("click", () => {
    localStorage.clear();    
  });

