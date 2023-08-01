
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