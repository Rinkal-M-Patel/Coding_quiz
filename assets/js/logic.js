
// import the question set
import { questions } from "./questions.js";

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

// Create audio elements for handling offscreen
const correct = new Audio("./assets/sfx/correct.wav");
const incorrect = new Audio("./assets/sfx/incorrect.wav");


startButton.addEventListener("click", () => {
  // ! call the core gameplay function
  startGame();
});

choices.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    checkAnswer(e);
  }
});

// Initialise global variables
let timer = 60;
time.innerText = timer;
let intervalId;
let score = 0;
let wrongAns = 10;
let currentIndex = 0;


function startGame() {
  // hide the start-screen
  startScreen.classList.add("hide");
  // show the questionCard
  questionCard.classList.remove("hide");
  playerFeedback.classList.remove("hide");

  if (timer <= 0) {
    // if true the game is over
    clearInterval(intervalId);
    time.innerText = "Game Over!";
    endGame();
    return;
  }

  
  // this interval sets the core game timer
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

  
  displayQuestion(currentIndex);
}

function endGame() {
  
  questionCard.classList.add("hide");
  playerFeedback.classList.add("hide");

  endScreen.classList.remove("hide");

  
  finalScore.innerText = score;

}

function displayQuestion(questionIndex) {
  if (currentIndex >= questions.length) {
 
    clearInterval(intervalId);
    time.innerText = "Game Over";
    endGame();
    return;
  }

  // add question to the questionTitle heading
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
  
  if (
    questions[currentIndex].correctAnswer.toString() === e.target.value
  ) {
    score += 10;
    playerFeedback.textContent = "Correct!";
    correct.play();
   
  } else {
    subtractTime();
    playerFeedback.textContent = "Incorrect!";
    incorrect.play();
  }

  currentIndex++;

 
  displayQuestion(currentIndex);
}

function subtractTime() {
  timer -= wrongAns;
}