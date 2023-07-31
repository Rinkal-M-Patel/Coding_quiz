import { questions } from "./questions.js";

//select each card div by id and assign to variables
const startCard = document.querySelector("#start-screen");
const questionCard = document.querySelector("#questions");
const scoreCard = document.querySelector("#end-screen");
const leaderboardCard = document.querySelector("#leaderboard-card"); 

//hide all cards
function hideCards(){
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

