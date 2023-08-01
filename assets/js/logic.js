// Import the question set
import { questions } from "./questions.js";

// Get references to DOM elements
const time = document.getElementById("time");
const questionCard = document.getElementById("questions"); 
const questionTitle = document.getElementById("question-title");
const choices = document.getElementById("choices");
const playerFeedback = document.getElementById("feedback");

const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const startButton = document.getElementById("start");
const submitScore = document.getElementById("submit");
const inputElement = document.getElementById("initials");

// Create audio elements for handling offscreen sounds
const correct = new Audio("./assets/sfx/correct.wav");
const incorrect = new Audio("./assets/sfx/incorrect.wav");

// Event listeners
startButton.addEventListener("click", () => {
  // Call the core gameplay function when the "Start Quiz" button is clicked
  startGame();
});

choices.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    // Check the selected answer when the user clicks on a choice button
    checkAnswer(e);
  }
});

submitScore.addEventListener("click", () => {
  // Check for input and add the user's score and initials to the high scores
  if (!inputElement.value) {
    alert("Please enter your initials before pressing submit!");
    return;
  }
  addHighScore({ name: inputElement.value, score: score });
  location.href = "./highscores.html";
});

// Initialize global variables
let timer = 60;
time.innerText = timer;
let intervalId;
let score = 0;
let wrongAns = 10;
let currentIndex = 0;

function startGame() {
  // Hide the start-screen and show the questionCard
  startScreen.classList.add("hide");
  questionCard.classList.remove("hide");
  playerFeedback.classList.remove("hide");

  // Start the core game timer using an interval
  intervalId = setInterval(() => {
    if (timer > 0) {
      timer -= 1;
      time.innerText = timer;
    } else {
      clearInterval(intervalId);
      time.innerText = "Time's up!";
      endGame();
    }
  }, 1000);

  // Display the first question
  displayQuestion(currentIndex);
}

function endGame() {
  // Hide the questionCard and playerFeedback, show the end-screen
  questionCard.classList.add("hide");
  playerFeedback.classList.add("hide");
  endScreen.classList.remove("hide");

  // Display the final score
  finalScore.innerText = score;
}

function displayQuestion(questionIndex) {
  // Check if there are no more questions left
  if (currentIndex >= questions.length) {
    clearInterval(intervalId);
    time.innerText = "Game Over";
    endGame();
    return;
  }

  // Display the current question and its choices
  questionTitle.innerText = questions[questionIndex].question;
  choices.innerHTML = "";
  questions[questionIndex].options.forEach((choice, index) => {
    const button = document.createElement("button");
    button.value = index;
    button.id = `${questions[questionIndex].id}-${index}`;
    button.textContent = choice;
    choices.appendChild(button);
  });
}

function checkAnswer(e) {
  // Check if the selected answer is correct and update the score accordingly
  if (questions[currentIndex].correctAnswer.toString() === e.target.value) {
    score += 10;
    playerFeedback.textContent = "Correct!";
    correct.play();
  } else {
    subtractTime();
    playerFeedback.textContent = "Incorrect!";
    incorrect.play();
  }

  // Move to the next question
  currentIndex++;
  displayQuestion(currentIndex);
}

function subtractTime() {
  // Subtract time from the timer for incorrect answers
  timer -= wrongAns;
}

function addHighScore(newScore) {
  // Add the new score to the high scores in local storage
  var highScoresJSON = localStorage.getItem("highScores");
  var highScores = highScoresJSON ? JSON.parse(highScoresJSON) : [];

  var newHighScores = highScores.concat(newScore);
  localStorage.setItem("highScores", JSON.stringify(newHighScores));
}
