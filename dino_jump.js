var dino = document.getElementById("dino");
var spike = document.getElementById("spike");
var scoreText = document.getElementById('score');
var hiscoreText = document.getElementById('hiscore');

var isDead = true;
var isJumping = false;
var spikeImages = ['img/cactus1.png', 'img/cactus2.png'];

if ( window.innerWidth <= 600 ) {
	toastr.options.timeOut = 2000;
	toastr.options.extendedTimeOut = 1000;
	toastr.options.progressBar = true;
	toastr.info("Rotate your phone for better experience.")
}

// Start button using Toastr
toastr.options = {
	'timeOut': 0,
	'extendedTimeOut': 0,
	'onclick': startGame,
	'positionClass': "toast-bottom-right"
}

toastr.success("Click this to start...");

// Start game when toastr is clicked
function startGame () {
	// Initialize scores
	sessionStorage.score = 0;
	sessionStorage.hiscore = sessionStorage.hiscore || 0;

	// Start animations
	isDead = false;
	spike.style.animationPlayState = "running";

	// Update game once every 10ms
	setInterval(updateGame, 10);
}

function updateGame () {
	var dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
	var dinoLeft = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
	var dinoWidth = parseInt(window.getComputedStyle(dino).getPropertyValue("width"));
	var spikeLeft = parseInt(window.getComputedStyle(spike).getPropertyValue("left"));

	if ( spikeLeft < (dinoLeft+dinoWidth/3) && spikeLeft > dinoLeft && dinoBottom <= 100 ) {
		gameOver();
	} else if ( spikeLeft < -95 ) {
		generateNewSpike();
	}
	updateScore();
}

function updateScore () {
	if (!(isDead)) {
		sessionStorage.score = Number(sessionStorage.score) + 0.01;
		if (Number(sessionStorage.score) > Number(sessionStorage.hiscore)) {
			sessionStorage.hiscore = sessionStorage.score;
		}	
	}
	scoreText.innerHTML = "Score: " + Math.floor(sessionStorage.score);
	hiscoreText.innerHTML = "Best: " + Math.floor(sessionStorage.hiscore);
}

function gameOver () {
	if (!(isDead)) {
		isDead = true;
		toastr.options.onclick = function () {
			document.location.reload(true);
		};
		toastr.success("Click to Play Again...");
		toastr.options.timeOut = 3000;
		toastr.options.extendedTimeOut = 500;
		toastr.options.progressBar = true;
		toastr.warning("GAME OVER!");
	}
	dino.style.backgroundImage = "url('img/dead.png')";
	dino.style.animation = "none";
	spike.style.animationPlayState = "paused";
	document.getElementById("bg").style
	.animationPlayState = "paused";
}

function jump () {
	if (!(isDead) && !(isJumping)) {
		isJumping = true;
		dino.style.animation = "jumping 800ms steps(1,end)";
		setTimeout(resetAnim, 800);
	}
}

function resetAnim () {
	isJumping = false;
	dino.style.animation = "moving 500ms steps(1,end) infinite";
}

function generateNewSpike () {
	// Random image
	randIndex = Math.floor(Math.random() * spikeImages.length);
	spike.style.backgroundImage = "url(" + spikeImages[randIndex] + ")";

	// Increase speed as score higher
	if (sessionStorage.score > 20) {
		spike.style.animationDuration = "3s";
	}
}

