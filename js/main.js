let NUMBER_OF_TRAPS = parseInt(document.getElementById('numberElements').value);
let autoRun = false;
let VELOCITY = parseInt(document.getElementById('velocity').value);
let FPS = 60;
let traps = generateTraps();
window.onload = function() {
	game = document.getElementById('game');
	ctx = game.getContext('2d');
	initCanvasSize()
  document.getElementById('seedButton').addEventListener('click', function() {
	resetCanvas();
	traps = generateTraps();
  }, false);
  document.getElementById('autoScroll').addEventListener('click', function() {
    if(autoRun == false){
      autoRun = true;
      document.getElementById('autoScroll').style.borderColor = "#12fa21"
    }
    else{
      autoRun = false;
      document.getElementById('autoScroll').style.borderColor = "black"
    }
  }, false);
  setInterval(function(){
	gameLoop();
},1000 / FPS);
window.addEventListener("keydown", keyManagement, true);
window.addEventListener("keyup", resetVelocity, true);
}
function gameLoop(){
	FPS = getFPS();
	drawTraps();
	velocityManager()
	if(autoRun == true){
			trapsMouvement(-VELOCITY,NUMBER_OF_TRAPS)
	}
}
function initCanvasSize(){
	game.width = screen.width;
  game.height = screen.height;
}
function updateLevelSize(width,heigth){
	initCanvasSize();
}
function velocityManager(){
  VELOCITY = document.getElementById('velocity').value;
  document.getElementById('velocityOutput').innerHTML = "Speed : "+ VELOCITY;
}
function getFPS(){
  let fps = parseInt(document.getElementById('fps').value);
	return fps;
}
function getSeedLevel(){
  let seed = document.getElementById('seed').value;
  return seed;
}
function getSpacingLevel(){
  let spacing = parseInt(document.getElementById('spacing').value);
  return spacing;
}
function getNumberOfElement(){
  let numberElements = parseInt(document.getElementById('numberElements').value);
  return numberElements;
}
function getNumberOfSpacing(){
  let numberSpacing = parseInt(document.getElementById('numberSpacing').value);
  return numberSpacing;
}
function generateTraps(){
  let seedLevel = getSeedLevel();
  let startingPoint = getSpacingLevel();
  let numberElements = getNumberOfElement();
  let spacing = getNumberOfSpacing()
  Math.seedrandom(seedLevel);
  let array = new Array();
  for(let i = 0; i < numberElements;i++){
    array.push(new Trap(startingPoint,spacing))
    startingPoint = startingPoint + spacing;
  }
  return array;
}
function resetCanvas(){
	ctx.fillStyle =  'rgba(23, 41, 58,1)';
	ctx.fillRect(0, 0, game.width, game.height);
}
function playerMouvement(acceleration){
	if(player.posY+player.size < (game.heigth) || player.posY > 0){
			player.velocity -=  acceleration;
			player.posY = player.posY + player.velocity;
		}
}
function resetVelocity(e){
	e = e || window.event;
	switch (e.keyCode) {
			case 38:   // arrow up key
			case 90: //z key
					break;
			case 40: // arrow down key
			case 83:
					break;
	}
}
function keyManagement(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 38:   // arrow up key
				case 90: //z key
						playerMouvement(1);

            break;
        case 40: // arrow down key
				case 83:
						playerMouvement(-1);
            break;
        case 37:
           autoRun = true;
           break;
        case 39:
          autoRun = false;
          break;
				case 13:
	        traps = generateTraps();
	        break;
        default:
				  break;
    }
}
function drawTraps(width,heigth){
	ctx.fillStyle = 'rgba(23, 41, 58, 0.12)';
	ctx.fillRect(0, 0, game.width, game.height);
  for(let i = 0; i < traps.length; i++){
    ctx.fillStyle =  traps[i].color;
    ctx.fillRect(traps[i].posX, traps[i].posY, traps[i].width, traps[i].size);
  }
}
