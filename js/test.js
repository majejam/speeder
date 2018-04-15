let NUMBER_OF_TRAPS = parseInt(document.getElementById('numberElements').value);
let autoRun = false;
let traps = generateTraps();
window.onload = function() {
	game = document.getElementById('game');
	ctx = game.getContext('2d');
  document.getElementById('seedButton').addEventListener('click', function() {
    traps = generateTraps();
  }, false);
  document.getElementById('autoScroll').addEventListener('click', function() {
    console.log(autoRun)
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
    drawTraps();
    if(autoRun == true){
        trapsMouvement(-10,NUMBER_OF_TRAPS)
    }

},5);
window.addEventListener("keydown", changeSpeed, true);
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

function changeSpeed(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 38:   // arrow up key
				case 90: //z key
          trapsMouvement(-10,NUMBER_OF_TRAPS)
            break;
        case 40: // arrow down key
				case 83:
          trapsMouvement(10,NUMBER_OF_TRAPS)
            break;
        case 37:
           autoRun = true;
            console.log(traps)
           break;
        case 39:
          autoRun = false;
          break;
        default: return;
    }
}
function drawTraps(){
  ctx.clearRect(0, 0, game.width, game.height);
  ctx.fillStyle =  "#09046a";
  ctx.fillRect(0, 0, game.width, game.height);
  for(let i = 0; i < traps.length; i++){
    ctx.fillStyle =  traps[i].color;
    ctx.fillRect(traps[i].posX, traps[i].posY, traps[i].width, traps[i].size);
  }
}


function Trap(startingPoint,spacing){
  this.type = Math.floor(Math.random()*4);
  this.posX = startingPoint +  parseInt(Math.random()*(spacing))
  this.posY = parseInt(Math.random()*(game.height - 100));
  //if bonus
  if(this.type == 0){
    this.size = parseInt(20 + Math.random()*50);
    this.width = this.size;
    this.color = "#ff6501";
  }
  if(this.type == 1){
    this.size = parseInt(20 + Math.random()*500);
    this.width = parseInt(10 + Math.random()*10);
    this.color = "#ff5041";
  }
  if(this.type == 2){
    this.size = parseInt(20 + Math.random()*500);
    this.width = parseInt(10 + Math.random()*10);
    this.color = "#12fa21";
  }

}
function trapsMouvement(direction, elements){
  for(let i = 0; i < traps.length;i++){
     traps[i].posX = traps[i].posX + direction;
  }
}
