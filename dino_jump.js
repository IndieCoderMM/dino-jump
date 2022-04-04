var dino = document.getElementById("dino");
var object = document.getElementById("object");
var score_text = document.getElementById('score');
var hiscore_text = document.getElementById('hiscore');

var dead = false;
var object_images = ['img/spike1.png', 'img/spike2.png'];

sessionStorage.score = 0;
if (isNaN(sessionStorage.hiscore)) {
	sessionStorage.hiscore = 0;
}

console.log(sessionStorage.score, sessionStorage.hiscore);

var jump = function () {
	dino.style.animation = "jumping 800ms steps(1,end)";
	setTimeout(resetAnim, 800);
};

var  resetAnim = function () {
	dino.style.animation = "run 500ms steps(1,end) infinite";
};

var checkCollision = function () {
	var dinoBottom = 
	parseInt(window.getComputedStyle(dino).
	getPropertyValue("bottom"));

	var objectLeft = 
	parseInt(window.getComputedStyle(object).
	getPropertyValue("left"));

	// if ( objectLeft < 150 && objectLeft > 100 && dinoBottom <= 100 ) {
	// 		dead = true;

	// 		object.style.animationPlayState = "paused";
	// 		dino.style.backgroundImage = "url('img/dead.png')";
	// 		dino.style.animation = "none";
	// 		document.getElementById("desert").style
	// 		.animationPlayState = "paused";
	// }

	if ( objectLeft < -95 ) {
		generateNewObject();
	}

};

var getRandom = function (choices, count) {
	random_index = Math.floor(Math.random() * count);
	return choices[random_index];
};

var generateNewObject = function () {
	newObject = getRandom(object_images, 2);
	object.style.backgroundImage = "url(" + newObject + ")";
};

var updateScore = function () {
	if (dead != true) {
		sessionStorage.score = Number(sessionStorage.score) + 0.01;
		if (Number(sessionStorage.score) > Number(sessionStorage.hiscore)) {
			sessionStorage.hiscore = sessionStorage.score;
		}	
	}
	score_text.innerHTML = "Score: " + Math.floor(sessionStorage.score);
	hiscore_text.innerHTML = "Best: " + Math.floor(sessionStorage.hiscore);
}

setInterval(checkCollision, 10);
setInterval(updateScore, 10);