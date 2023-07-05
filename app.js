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

const lastScreenDiv = document.getElementById('lastScreen');
const thatsItElement = document.getElementById('thatsIt');

const images = [
    'Mole.png',
    'Wrestler1.png',
    'Wrestler2.png',
    'Wrestler3.png',
];


// below makes splash screen disappear after 3 seconds
window.addEventListener('load', function() {
    var splashScreen = document.getElementById('splash-screen');
    setTimeout(function() {
      splashScreen.style.display = 'none';
    }, 4000); // 3000 milliseconds = 3 seconds
  });

//   below makes the wooo button get rid of the div and start the game. 

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    characterSelect();  
}

function updateCharacterImage() {
    const wrestlerSpan = document.querySelector('.wrestler');
    wrestlerSpan.innerHTML = `<img src="${selectedImage}" alt="Selected Wrestler">`;
    const wrestlerSpan2 = document.querySelector('.wrestler2');
    wrestlerSpan2.innerHTML = `<img src="${selectedImage}" alt="Selected Wrestler">`;
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
}, 2500);
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
      computerChoiceOptions = ['rock', 'paper', 'scissors']; // Pick all for Ric Flair
  }
}

function generateComputerChoice() {
  let computerChoiceIndex = Math.floor(Math.random() * computerChoiceOptions.length);
  computerChoice = computerChoiceOptions[computerChoiceIndex];
  computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
  if (computerChoice === userChoice) {
      result = "DRAW! Try Again";
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

  const specialGuestRefereeDiv = document.getElementById('specialGuestReferee');
  specialGuestRefereeDiv.style.display = 'none';
}


function updateScore(result) {
  if (result === "VICTORY") {
      userScore++;
  } else if (result !== "DRAW! Try Again") {
    updateImages();
      setTimeout(() => {
          alert("Your title run is over. Click 'OK' to start over.");
          resetGame();
      }, 250); // Delay the alert message by 1 second (1000 milliseconds)
  }

  if (userScore === 4) {
    nextMatchButton.innerHTML = '????'; // Change the text of the button
  } else if (userScore >= 5){
    nextMatchButton.innerHTML = 'Ask referee if we have a new champion?'; // Change the text of the button
  } else {
    nextMatchButton.innerHTML = 'Click for next match'; // Change the text of the button
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

  if (result === "DEFEAT" && userScore >= 4) {
    taunt.style.backgroundImage = "url('Ric Flair Loss.png')";
    opponent.style.backgroundImage = "url('ric-flair-nature.jpg')";
  } else if (result === "VICTORY" && userScore >= 4) {
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

// invented souly to make ric flair taunt2/3 show after jack tunney ref selected

function updateImages2() {
  var taunt = document.querySelector('.taunt');
  var opponent = document.querySelector('.opponent');

  if (userScore == 4) {
    taunt.style.backgroundImage = "url('Ric Flair Taunt 2.png')";
    opponent.style.backgroundImage = "url('ric-flair-nature.jpg')";
    } else {
      taunt.style.backgroundImage = "url('Ric Flair Taunt 3.png')";
      opponent.style.backgroundImage = "url('ric-flair-nature.jpg')";
  }  
}


//function to show jack tunney
function showJackTunneyDiv() {
  alert("It looks like Ric is refusing to give up his title. Jack Tunney has scheduled an emergency announcement.");
  const TunneyDiv = document.getElementById('jackTunneyDiv');
  TunneyDiv.style.display = 'block';
  const theGameDiv = document.getElementById('theGame');
  theGameDiv.style.display = 'none';
}

function showJackTunneyDiv2() {
  
  const TunneyDiv = document.getElementById('jackTunneyDiv');
  TunneyDiv.style.display = 'block';
  const refereeVerdictDiv = document.getElementById('refereeVerdict');
  refereeVerdictDiv.style.display = 'none';
  const button = document.getElementById('screwed');
  button.style.display = 'none';
}



//function to select ref and then close jack tunney div

function selectRef() {
  const refereeSelectionDiv = document.getElementById('refereeSelection');
  refereeSelectionDiv.style.display = 'block';

  const TunneyDiv = document.getElementById('jackTunneyDiv');
  TunneyDiv.style.display = 'none';

  updateImages2();
}



function handleRefereeSelection(referee) {
  const refereeSelectionDiv = document.getElementById('refereeSelection');
  refereeSelectionDiv.style.display = 'none';
  
  // showRefereeVerdict(referee);

  const refereeSpan = document.querySelector('.referee');
  const specialGuestSpan = document.querySelector('.specialGuest');
  const TunneyDiv = document.getElementById('jackTunneyDiv');
  TunneyDiv.style.display = 'none';
  const theGameDiv = document.getElementById('theGame');
  theGameDiv.style.display = 'block';

  const refImages = document.getElementById('specialGuestReferee')
  refImages.style.display = 'block';

  if (referee === 'Jesse The Body Ventura') {
    refereeSpan.innerHTML = ''; // Clear existing content
    specialGuestSpan.innerHTML = ''; // Clear existing content

    const jesseVenturaImage = document.createElement('img');
    jesseVenturaImage.src = "Jesse_Ventura.png";
    jesseVenturaImage.alt = "Jesse The Body Ventura";
    refereeSpan.appendChild(jesseVenturaImage);

    const specialGuestImage = document.createElement('img');
    specialGuestImage.src = "Special-Guest-Referee.png";
    specialGuestImage.alt = "Special Guest Referee";
    specialGuestSpan.appendChild(specialGuestImage);

    // alert("You selected Jesse The Body Ventura as the referee.");
  } else if (referee === 'Paul Bearer') {
    refereeSpan.innerHTML = ''; // Clear existing content
    specialGuestSpan.innerHTML = ''; // Clear existing content

    const paulBearerImage = document.createElement('img');
    paulBearerImage.src = "Paul_Bearer.png";
    paulBearerImage.alt = "Paul Bearer";
    refereeSpan.appendChild(paulBearerImage);

    const specialGuestImage = document.createElement('img');
    specialGuestImage.src = "Special-Guest-Referee.png";
    specialGuestImage.alt = "Special Guest Referee";
    specialGuestSpan.appendChild(specialGuestImage);

    // alert("You selected Paul Bearer as the referee.");
  }
}


// Function to show the next-match button and hide game buttons
function showNextMatchButton() {

var taunt = document.querySelector('.taunt');
var opponent = document.querySelector('.opponent');

if (userScore >= 3) {
  taunt.style.backgroundImage = "url('Ric Flair Lawyers.png')";
  opponent.style.backgroundImage = "url('ric-flair-nature.jpg')"
} else {
  taunt.style.backgroundImage = "url('Blank.png')";
  opponent.style.backgroundImage = "url('Next-Round.png')"
}


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

  if (userScore == 4) {
    showJackTunneyDiv();
  }

  if (userScore >= 5) {
    showRefereeVerdict();
  }

  nextMatchButton.innerHTML = 'Click for next match'; // Change the text of the button
}

//show ref verdict

function showRefereeVerdict() { 
  const refereeVerdictDiv = document.getElementById('refereeVerdict');
  const verdictImage = document.createElement('img');

  refereeVerdictDiv.style.display = 'block';
  document.getElementById('theGame').style.display = 'none';

  var refereeSpan = document.querySelector('.referee');
  var refereeImage = refereeSpan.querySelector('img');

  var verdictDiv = document.getElementById('refereeVerdict');
  var verdictDiv2 = document.getElementById('refereeVerdict2');

  if (refereeImage.src.includes('Paul_Bearer.png')) {
      verdictDiv2.innerHTML = '<img src="bearer-verdict.png" alt="Bearer Verdict">';
      playAudio('oh-Yes!.mp3');
      setTimeout(function() {
        var refereeVerdict = document.getElementById('refereeVerdict');
        refereeVerdict.style.display = 'none';
      
        var lastScreen = document.querySelector('.lastScreen');
        lastScreen.style.display = 'block';
        var fireworks = document.querySelector('.fireworks');
        fireworks.style.display = 'block';
      }, 5000);
      setTimeout(function() {
  var lastScreen = document.querySelector('.lastScreen');
  if (lastScreen.style.display === 'block') {
    document.getElementById('restartButton').style.display = 'block';
    // document.getElementById('thatsIt').style.display = 'block';
    
  }
}, 9000);
setTimeout(function() {
  var lastScreen = document.querySelector('.lastScreen');
  if (lastScreen.style.display === 'block') {
    // document.getElementById('restartButton').style.display = 'block';
    document.getElementById('thatsIt').style.display = 'block';
  }
}, 7000);


      } else if (refereeImage.src.includes('Jesse_Ventura.png')) {
      verdictDiv2.innerHTML = '<img src="ventura-verdict.png" alt="Ventura Verdict">';
      setTimeout(function() {
        // Get the button element
        var button = document.getElementById('screwed');
        
        // Update the display property to make the button visible
        button.style.display = 'block';

         // Position the button below the image
    button.style.position = 'relative';
    button.style.top = '10px'; // Adjust the value as needed
        
        // Add click event listener to the button
        button.addEventListener('click', showJackTunneyDiv2);
      }, 3000);

      }
}


function playAudio(audioFile) {
  var audio = new Audio(audioFile);
  audio.play();
}

// restart game button

function restartGame() {
  resetGame();
  const lastScreenElements = document.getElementsByClassName("lastScreen");
  if (lastScreenElements.length > 0) {
    lastScreenElements[0].style.display = "none";
  }
  document.getElementById("start-screen").style.display = "block";
  document.getElementById('restartButton').style.display = 'none';
  document.getElementById('thatsIt').style.display = 'none';
  var fireworks = document.querySelector('.fireworks');
        fireworks.style.display = 'none';

}


// fireworks

window.oncontextmenu = function () { return false; } // Block menu

			var canvas = document.getElementById('canvas'); // Get element by ID canvas
			var ctx = canvas.getContext('2d'); 				// Get concent of canvas 2d graphics
			var frameRate = 60.0;							// Frame rate per second use in loop
			var frameDelay = 1000.0/frameRate;				// Frame Delay per second like latency

			var clientWidth = innerWidth;					// Clients Width of web screen
			var clientHeight = innerHeight;					// Clients height of web screen
			var timer = 0;									// Timer is ticker, how many ticks per round
			var x = 0;										// Mouse x coordinates
			var y = 0;										// Mouse y coordinates

			canvas.width = clientWidth;						// Set canvas width to user width
			canvas.height = clientHeight;					// Set canvas height to user height

			var TimedFirework = 1000;						// Repeat Firework every x MS
			var LimiterTicker = 0;							// 
			var fireworks = [];								// Array with starting fireworks
			var particles = [];								// Array with particles
			var typecount = 1;								// Variable to change firework type
			var sparks = [];								// Array for sparkles drops
			var num = 1;									// number of color
			var colorchanger = 0;							// colorchange timer

			// Function to calculate distance = Simple Pythagorean theorem
			function distance(px1, py1, px2, py2) {
				xdis = px1 - px2;
				ydis = py1 - py2;
				return Math.sqrt((xdis*xdis) + (ydis*ydis));
			}

			// My own created function to get angle from point to point
			function getAngle(posx1, posy1, posx2, posy2) {
				if (posx1 == posx2) { if (posy1 > posy2) { return 90; } else { return 270; } }
				if (posy1 == posy2) { if (posy1 > posy2) { return 0; } else { return 180; } }

				var xDist = posx1 - posx2;
				var yDist = posy1 - posy2;

				if (xDist == yDist) { if (posx1 < posx2) { return 225; } else { return 45; } }
				if (-xDist == yDist) { if (posx1 < posx2) { return 135; } else { return 315; } }

				if (posx1 < posx2) {
					return Math.atan2(posy2-posy1, posx2-posx1)*(180/Math.PI) + 180;
				} else {
					return Math.atan2(posy2-posy1, posx2-posx1)*(180/Math.PI) + 180;
				}
			}

			// My function to create random number
			function random(min, max, round) {
				if (round == 'round') {
					return Math.round(Math.random() * (max - min) + min);
				} else {
					return Math.random() * (max - min) + min;
				}
			}

			// Function to choose one of these best colors
			function colors() {
				if (timer > colorchanger) { num = random(0, 7, 'round'); colorchanger = timer + (500); }
				switch(num) {
					case 1: return '#ff0000'; break;
					case 2: return '#c86a13'; break;
					case 3: return '#1ea31e'; break;
					case 4: return '#18bebe'; break;
					case 5: return '#0000ff'; break;
					case 6: return '#ff00ff'; break;
					case 7: return '#d09212'; break;
				}
			}

			// Function to make firework
			createFirework = function() {
				firework = new Firework();

				firework.x = firework.sx = clientWidth/2;
				firework.y = firework.sy = clientHeight;

				firework.color = colors();

				if (x != 0 && y != 0) {
					firework.tx = x;
					firework.ty = y;
					x = y = 0;
				} else {
					firework.tx = random(400, clientWidth-400);
					firework.ty = random(0, clientHeight / 2);
				}

				var angle = getAngle(firework.sx, firework.sy, firework.tx, firework.ty);

				firework.vx = Math.cos(angle * Math.PI/180.0);
				firework.vy = Math.sin(angle * Math.PI/180.0);

				fireworks.push(firework);
			}

			// Function to start Firework
			Firework = function() {

				this.x = 0;
				this.y = 0;
				this.sx = 0;
				this.sy = 0;
				this.tx = 0;
				this.ty = 0;
				this.vx = 0;
				this.vy = 0;
				this.color = 'rgb(255,255,255)';
				this.dis = distance(this.sx, this.sy, this.tx, this.ty);
				this.speed = random(700, 1100);
				this.gravity = 1.5;
				this.ms = 0;
				this.s = 0;
				this.del = false;

				this.update = function(ms) {
					this.ms = ms / 1000;

					if (this.s > 2000/ms) {
						createParticles(typecount, 30, this.x, this.y, this.color);
						this.del = true;
					} else {
						this.speed *= 0.98;
						this.x -= this.vx * this.speed * this.ms;
						this.y -= this.vy * this.speed * this.ms - this.gravity;
					}

					this.s++;
				}

				this.draw = function() {
					ctx.beginPath();
					ctx.fillStyle = this.color;
					ctx.arc(this.x, this.y, 1, 0, 2*Math.PI);
					ctx.fill();
				}
			}

			// Function to create array particles
			createParticles = function(type, count, pox, poy, color) {
				for (var i = 0; i < count; i++) {
					par = new Particles();
					par.type = type;

					par.color = color;
					par.x = pox;
					par.y = poy;

					var angle = random(0, 360);
					par.vx = Math.cos(angle * Math.PI/180.0);
					par.vy = Math.sin(angle * Math.PI/180.0);

					particles.push(par);
				};
			}

			// Function to make particles
			Particles = function() {

				this.x = 0;
				this.y = 0;
				this.vx = 0;
				this.vy = 0;
				this.speed = random(200, 500);
				this.gravity = 1;
				this.wind = 0;
				this.type = 1;
				this.opacity = 1;
				this.s = 0;
				this.scale = 1;
				this.color = '#FFF';
				this.del = false;

				this.update = function(ms) {
					this.ms = ms / 1000;

					if (this.s > 900/ms) { if (this.opacity - 0.05 < 0) { this.opacity = 0; } else { this.opacity -= 0.05; } }

					if (this.type == 1) {
						this.speed *= 0.96;
						this.x -= this.vx * this.speed * this.ms + this.wind;
						this.y -= this.vy * this.speed * this.ms - this.gravity;
					} else if (this.type == 2) {
						if (this.s < 800/ms) { this.scale += 0.1; } else { this.scale -= 0.2; }
						this.speed *= 0.96;
						this.x -= this.vx * this.speed * this.ms + this.wind;
						this.y -= this.vy * this.speed * this.ms - this.gravity;
					} else if (this.type == 3) {
						this.speed *= 0.95;
						this.x -= this.vx * this.speed * this.ms + this.wind;
						this.y -= this.vy * this.speed * this.ms;
					} else if (this.type == 4) {
						this.speed *= 0.96;
						this.x -= this.vx * this.speed * this.ms + this.wind;
						this.y -= this.vy * this.speed * this.ms - this.gravity;

						spark = new Sparkler();
						spark.x = this.x;
						spark.y = this.y;
						spark.vx = Math.cos(random(0, 360, 'round') * (Math.PI/180))*1.05;
						spark.vy = Math.sin(random(0, 360, 'round') * (Math.PI/180))*1.05;
						spark.tx = this.x;
						spark.ty = this.y;
						spark.color = this.color;
						spark.limit = random(4, 10, 'round');
						sparks.push(spark);
					} else {

					}

					this.s++;
				}

				this.draw = function() {
					ctx.save();
					ctx.globalAlpha = this.opacity;
					ctx.fillStyle = this.color;
					ctx.strokeStyle = this.color;

					if (this.type == 1) {
						ctx.beginPath();
						ctx.arc(this.x, this.y, 1.5, 0, 2*Math.PI);
						ctx.fill();
					} else if (this.type == 2) {
						ctx.translate(this.x, this.y);
						ctx.scale(this.scale, this.scale);
						ctx.beginPath();
						ctx.fillRect(0, 0, 1, 1);
					} else if (this.type == 3) {
						ctx.beginPath();
						ctx.moveTo(this.x, this.y);
						ctx.lineTo(this.x - this.vx * 10, this.y - this.vy * 10);
						ctx.stroke();
					} else if (this.type == 4) {
						ctx.beginPath();
						ctx.arc(this.x, this.y, 1.5, 0, 2*Math.PI);
						ctx.fill();
					} else {
						ctx.arc(this.x, this.y, 1, 0, 2*Math.PI);
						ctx.fill();
					}

					ctx.closePath();
					ctx.restore();
				}
			}

			// Function for sparkler type of firework
			Sparkler = function() {

				this.x = 0;
				this.y = 0;
				this.tx = 0;
				this.ty = 0;
				this.limit = 0;
				this.color = 'red';

				this.update = function() {
					this.tx += this.vx;
					this.ty += this.vy;

					this.limit--;
				}

				this.draw = function() {
					ctx.beginPath();
					ctx.moveTo(this.x, this.y);
					ctx.lineTo(this.tx, this.ty);
					ctx.lineWidth = 1;
					ctx.strokeStyle = this.color;
					ctx.stroke();
					ctx.closePath();
				}
			}

			text = function() {
				ctx.beginPath();
				ctx.fillStyle = 'white';
				ctx.font = "14px arial";
				ctx.fillText("", 2, clientHeight-2);
			}

			// Mouse coordinates to fire
			canvas.addEventListener('mousedown', function(evt) {
				evt = evt || window.event;
				var button = evt.which || evt.button;
			    if (button == 1) {
			    	// If button is first (left) on mouse
					x = evt.clientX; y = evt.clientY; createFirework();
				} else { 
					// If button is second (right) on mouse
					if (typecount == 4) { typecount = 1; } else { typecount++; }
				}
			});

			update = function(frame) {

				// text to controll firework
				text();

				// Every tick clear screen with black rectangle with opacity 0.15
				// ctx.globalAlpha = 1;
				// ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
				// ctx.fillRect(0, 0, clientWidth, clientHeight);
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.clearRect(0, 0, clientWidth, clientHeight);
        ctx.fillRect(0, 0, clientWidth, clientHeight)


				if (timer > LimiterTicker) {
					// Creating array with starting Firework
					createFirework();

					LimiterTicker = timer + (TimedFirework / frame);
				}

				var i = fireworks.length;
				while(i--) {
					// Progress starting Fireworks
					if (fireworks[i].del == true) { fireworks.splice(i, 1); } else {
						fireworks[i].update(frame);
						fireworks[i].draw();
					}
				}

				var i = particles.length;
				while(i--) {
					// Progress particles
					if (particles[i].opacity == 0) { particles.splice(i, 1); } else {
						particles[i].update(frame);
						particles[i].draw();
					}
				}

				var i = sparks.length;
				while(i--) {
					// Progress sparks
					if (sparks[i].limit < 0) { sparks.splice(i, 1); } else {
						sparks[i].update(frame);
						sparks[i].draw();
					}
				}

				timer++;
			}

			var main = setInterval(function() { update(frameDelay); }, frameDelay);
