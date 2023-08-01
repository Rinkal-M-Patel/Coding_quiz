
const highScoresDisplay = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");
const noScore = document.getElementById("no-scores");

clearBtn.addEventListener("click", () => {
    localStorage.clear();    
  });

  const highScores = JSON.parse(localStorage.getItem("highScores"));

if (highScores) {
  highScores.forEach((score) => {
    const liElement = document.createElement("li");
    liElement.textContent = `${score.name}: ${score.score}`;
    highScoresDisplay.appendChild(liElement);
  });
}

