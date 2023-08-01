// Get references to DOM elements
const highScoresDisplay = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");
const noScore = document.getElementById("no-scores");

// Placeholder text for when there are no highscores
const placeHolder = "no highscores";

// Event listener for the "Clear Highscores" button
clearBtn.addEventListener("click", () => {
  // Clear the highscores from local storage and update the display
  localStorage.clear();
  highScoresDisplay.innerHTML = "";
  noScore.innerText = placeHolder;
});

// Get the highscores from local storage and parse the JSON data
const highScores = JSON.parse(localStorage.getItem("highScores"));

// Check if there are no highscores, and display the placeholder text if true
if (!highScores) {
  noScore.innerText = placeHolder;
}

// Sort the highscores in descending order based on the score
if (highScores) {
  highScores.sort((a, b) => b.score - a.score);
}

// Clear the previous content of the highscores display element
highScoresDisplay.innerHTML = "";

// If there are highscores, display them in the highScoresDisplay element
if (highScores) {
  highScores.forEach((score) => {
    const liElement = document.createElement("li");
    liElement.textContent = `${score.name}: ${score.score}`;
    highScoresDisplay.appendChild(liElement);
  });
}
