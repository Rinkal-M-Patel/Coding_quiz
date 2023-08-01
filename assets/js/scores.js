
const highScoresDisplay = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");
const noScore = document.getElementById("no-scores");

const placeHolder = "no highscores";

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    highScoresDisplay.innerHTML = "";
    noScore.innerText = placeHolder;   
  });

  const highScores = JSON.parse(localStorage.getItem("highScores"));

  
if (!highScores) {
    noScore.innerText = placeHolder;
  }
  
  if (highScores) {
    highScores.sort((a, b) => b.score - a.score);
  }
  
  highScoresDisplay.innerHTML = "";
  

if (highScores) {
  highScores.forEach((score) => {
    const liElement = document.createElement("li");
    liElement.textContent = `${score.name}: ${score.score}`;
    highScoresDisplay.appendChild(liElement);
  });
}

