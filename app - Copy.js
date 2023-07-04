const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('.game-button')
let userChoice
let computerChoice

let selectedImage
let userScore = 0
var scoreContainer = document.getElementById('scoreContainer')

const nextMatchButton = document.getElementById('next-match');
const gameButtons = document.querySelectorAll('.game-button');

const splash = document.querySelector('.splash'); 
nextMatchButton.style.display = 'none';


const images = [
    'mole.png',
    'Wrestler1.png',
    'Wrestler2.png',
    'Wrestler3.png',
];


// below makes splash screen disappear after 3 seconds
window.addEventListener('load', function() {
    var splashScreen = document.getElementById('splash-screen');
    setTimeout(function() {
      splashScreen.style.display = 'none';
    }, 1500); // 3000 milliseconds = 3 seconds
  });

//   below makes the wooo button get rid of the div and start the game. 

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    characterSelect();  
}

function updateCharacterImage() {
    const wrestlerSpan = document.querySelector('.wrestler');
    wrestlerSpan.innerHTML = `<img src="${selectedImage}" alt="Selected Wrestler">`;
  }


function characterSelect() {
    
  // Show prompt box to get user's input
prompt("Type up to 10 of your physical characteristics and our advanced AI will create an exact image of you.");

// Create a new div element
const div = document.createElement('div');
const divId = 'random-image-div-' + Date.now(); // Generate a unique ID using the current timestamp
div.setAttribute('id', divId);

// Set the text content of the div to the user's input
div.textContent = "Your exact replica is:";
div.style.fontSize = "50px"; // Set font size to 20 pixels
div.style.fontFamily = "Lucida Sans Unicode, sans-serif";
div.style.fontWeight = "bold";

// Generate a random number between 0 and the length of the array
const randomIndex = Math.floor(Math.random() * images.length);

// Create a new img element
const img = document.createElement('img');

selectedImage = images[randomIndex];

// Set the src attribute of the img element to the randomly selected image URL
img.src = images[randomIndex];

// Append the img element to the div element
div.appendChild(img);

// Add the div element to the body of the HTML document
document.body.appendChild(div);

//run fuction to make same image appear on game screen

updateCharacterImage();

// Use setTimeout() function to wait for 3 seconds and then remove the div element
setTimeout(() => {
 document.body.removeChild(div);
 document.getElementById("theGame").style.display = 'block';
}, 3000);
}




//rock paper scissors game below


possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  userChoice = e.target.id;
  userChoiceDisplay.innerHTML = userChoice;
  levelSelect();
  generateComputerChoice();
  getResult();
  updateScore(result);
}));

// Add a click event listener to the next match button
nextMatchButton.addEventListener('click', resetGameButtons);

let computerChoiceOptions;

function levelSelect() {
  if (userScore == 0) {
      computerChoiceOptions = ['paper']; // Only pick paper for BWL
  } else if (userScore == 1) {
      computerChoiceOptions = ['rock', 'paper']; // Pick between rock and paper for Mr Perfect
  } else if (userScore == 2) {
      computerChoiceOptions = ['scissors', 'paper']; // Pick between scissors and paper for Jake
  } else {
      computerChoiceOptions = ['scissors', 'rock', 'paper']; // Pick all for Ric Flair
  }
}

function generateComputerChoice() {
  let computerChoiceIndex = Math.floor(Math.random() * computerChoiceOptions.length);
  computerChoice = computerChoiceOptions[computerChoiceIndex];
  computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
  if (computerChoice === userChoice) {
      result = "Time Limit Reached. DRAW! Try Again";
  } else if (
      (computerChoice === 'rock' && userChoice === 'paper') ||
      (computerChoice === 'paper' && userChoice === 'scissors') ||
      (computerChoice === 'scissors' && userChoice === 'rock')
  ) {
      result = "VICTORY";
      showNextMatchButton(); // Show the next-match button on victory
  } else {
      result = "DEFEAT";
  }


  resultDisplay.innerHTML = result;
}


function resetGame() {
  userChoiceDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
  resultDisplay.innerHTML = '';
  userScore = 0;
  opponentIndex = 0;
  scoreContainer.innerHTML = 'Score: ' + userScore;
  // resets images - note var needed inclusion to work
  var taunt = document.querySelector('.taunt');
  var opponent = document.querySelector('.opponent');
  taunt.style.backgroundImage = "url('BWL Taunt.png')";
  opponent.style.backgroundImage = "url('bwl.png')";
}


function updateScore(result) {
  if (result === "VICTORY") {
      userScore++;
  } else if (result !== "Time Limit Reached. DRAW! Try Again") {
    updateImages();
      setTimeout(() => {
          alert("Your title run is over. Click 'OK' to start over.");
          resetGame();
      }, 250); // Delay the alert message by 1 second (1000 milliseconds)
  }


  resultDisplay.innerHTML = result;
  scoreContainer.innerHTML = 'Score: ' + userScore;

}

var tauntImages = [
  'BWL Taunt.png',
  'Mr P Taunt.png',
  'JTS Taunt.png',
  'Ric Flair Taunt.png',
  'Ric Flair Lawyers.png'
  
];

var loseTauntImages = [
  'BWL Loss.png',
  'Perfect Loss.png',
  'NeverTrustASnake.png',
  'Ric Flair Loss.png'
  
]

var opponentImages = [
  'bwl.png',
  'MrPerfect.png', 
  'jake.png',
  'ric-flair-nature.jpg'
];

function updateImages() {
  var taunt = document.querySelector('.taunt');
  var opponent = document.querySelector('.opponent');

  if (userScore >= 4) {
      taunt.style.backgroundImage = "url('Ric Flair Lawyers.png')";
      opponent.style.backgroundImage = "url('ric-flair-nature.jpg')";
  } else if (userScore === 0) {
    taunt.style.backgroundImage = "url('BWL Loss.png')";
    opponent.style.backgroundImage = "url('bwl.png')";
  } else {
      if (result === "DEFEAT") {
          taunt.style.backgroundImage = "url('" + loseTauntImages[userScore] + "')";
          opponent.style.backgroundImage = "url('" + opponentImages[userScore] + "')";
      } else {
          taunt.style.backgroundImage = "url('" + tauntImages[userScore] + "')";
          opponent.style.backgroundImage = "url('" + opponentImages[userScore] + "')";
      }
  }
}


// Function to show the next-match button and hide game buttons
function showNextMatchButton() {
nextMatchButton.style.display = 'block';
gameButtons.forEach(button => {
    button.style.display = 'none';
});
}

function resetGameButtons() {
nextMatchButton.style.display = 'none';
gameButtons.forEach(button => {
    button.style.display = 'inline';
});
updateImages();
userChoiceDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
  resultDisplay.innerHTML = '';
}
