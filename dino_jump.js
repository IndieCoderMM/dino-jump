var dino = document.getElementById("dino");
var spike = document.getElementById("spike");
var scoreText = document.getElementById('score');
var hiscoreText = document.getElementById('hiscore');
var muteBtn = document.getElementById('mute');

var isDead = true;
var isJumping = false;
var isMute = true;
var spikeImages = ['img/cactus1.png', 'img/cactus2.png'];
var jumpSfx = new Audio('sound/jump_sfx.wav');
var bgMusic = new Audio('sound/bg_music.mp3');
var hitSfx = new Audio('sound/hit_sfx.wav');


// Start button using Toastr
toastr.options = {
	'timeOut': 0,
	'extendedTimeOut': 0,
	'onclick': startGame,
	'positionClass': "toast-bottom-right"
}

if ( window.innerWidth <= 600 ) {
	toastr.success("Rotate your phone for better experience.", "Click this to start");
} else {
	toastr.success("If you are ready...", "Click this to start");
}

muteBtn.addEventListener("click", musicOnOff);

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

	if ( spikeLeft < (dinoLeft+dinoWidth) && spikeLeft > dinoLeft && dinoBottom <= 100 ) {
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
		bgMusic.pause();
		hitSfx.play();
		toastr.options.onclick = function () {
			document.location.reload(true);
		};
		toastr.info("Click to Play Again...");
		toastr.options.timeOut = 3000;
		toastr.options.extendedTimeOut = 500;
		toastr.warning("GAME OVER!");
	}
	dino.style.backgroundImage = "url('img/dead.png')";
	dino.style.animation = "none";
	spike.style.animationPlayState = "paused";
	document.getElementById("bg").style
	.animationPlayState = "paused";
}

function jump () {
	if (isDead || isJumping) return
	isJumping = true;
	dino.style.animation = "jumping 800ms steps(1,end)";
	setTimeout(function() {
		isJumping = false;
		dino.style.animation = "moving 500ms steps(1,end) infinite";
	}, 800);
	jumpSfx.play();
}


function generateNewSpike () {
	// Random image
	randIndex = Math.floor(Math.random() * spikeImages.length);
	spike.style.backgroundImage = "url(" + spikeImages[randIndex] + ")";
	// Increase speed as score higher
	// if (sessionStorage.score > 20) {
	// 	spike.style.animationDuration = "3s";
	// }
}

function musicOnOff() {
	if (isMute) {
		isMute = false;
		bgMusic.loop = true;
		bgMusic.play();
		muteBtn.style.backgroundImage = "url('img/sound_icon.png')";
	} else {
		isMute = true;
		bgMusic.pause();
		muteBtn.style.backgroundImage = "url('img/mute_icon.png')";
	}	
}
