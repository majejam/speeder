let NUMBER_OF_TRAPS = parseInt(document.getElementById('numberElements').value)
let autoRun = false
let VELOCITY = 0
let numberTrap = 0
const $canvas = document.querySelector('.js-canvas')
const ctx = $canvas.getContext('2d')
let sizeOfTraps = getSizeElement()
let windowWidth = $canvas.width
let windowHeight = $canvas.height
let autoGenerate = false
let debug = false
let curve = 0
let curve_speed = 0

//Resize
const resize = () => {
  windowWidth = window.innerWidth
  windowHeight = window.innerHeight
  $canvas.width = windowWidth
  $canvas.height = windowHeight
}
function Particle(x,y){
  this.posX= x;
  this.posY= y;
	this.pointsToGive = Math.ceil(Math.random()*20)
  this.radius= 1 + this.pointsToGive /4 ;
  this.color= '#FAF523';
	this.originX = x
	this.originY = y
	this.attractionSpeedX = 1
	this.attractionSpeedY = 1
}
let particlesArray = new Array()
window.addEventListener('resize', resize)
resize()

let traps = generateTraps(autoGenerate, getNumberOfElement(), getSizeElement(), getNumberOfSpacing())

const loop = () => {
  window.requestAnimationFrame(loop)
	gameLoop()
}
loop()

document.getElementById('Play').addEventListener('click', function() {
	resetLevel()
	resetPlayer()
	if(autoRun == false){
		autoRun = true
		document.getElementById('Play').style.borderColor = "#12fa21"
	}
	else{
		autoRun = false
		document.getElementById('Play').style.borderColor = "black"
	}
}, false)

window.addEventListener("keydown", keyManagement, true)
window.addEventListener("keydown", function (e) {
    Player.keys[e.keyCode] = true
})
window.addEventListener("keyup", function (e) {
    Player.keys[e.keyCode] = false
})


function resetLevel(){
	resetCanvas()
	traps = generateTraps(autoGenerate, getNumberOfElement(),getSizeElement(),getNumberOfSpacing())
}

function resetPlayer(){
	Player.mouvement = true
	Player.life = 1
	Player.isFinished = false
	Player.score = 0
	VELOCITY = 10
}


function gameLoop(){
	drawAllElements(curve, curve_speed)
  trapDetection()
	playerMouvement()
  playerLifeHandler()
  if(Player.isFinished){
    finishLineHandler()
  }
	if(autoRun == true){
			trapsMouvement(-1,VELOCITY)
	}
}

function initCanvasSize(){
	game.width = screen.width
  game.height = screen.height
}

function updateLevelSize(width,heigth){
	initCanvasSize()
}
function getSeedLevel(){
  let seed = document.getElementById('seed').value
  return seed
}
function getSizeElement(){
  let size = parseInt(document.getElementById('size').value)
  return size
}
function getNumberOfElement(){
  let numberElements = parseInt(document.getElementById('numberElements').value)
  return numberElements
}
function getNumberOfSpacing(){
  let numberSpacing = parseInt(document.getElementById('numberSpacing').value)
  return numberSpacing
}
function setNumberOfSpacing(element){
  document.getElementById('numberSpacing').value = element
  console.log("Spacing set succesfully")
}
function setNumberOfElement(element){
  document.getElementById('numberElements').value = element
  console.log("Number set succesfully")
}
function setSizeElement(element){
  document.getElementById('size').value = element
  console.log("Size set succesfully")
}
function setSeedLevel(element){
  document.getElementById('seed').value = element
  console.log("Seed set succesfully")
}
document.getElementById('manualGenerate').addEventListener('click', function() {
  resetCanvas()
  if(autoGenerate == true){
    console.clear()
    setElementInDOM()
  }
  console.log('difficulty of the level is : ' + Math.abs(Math.round(getDifficulty())))
  traps = generateTraps(autoGenerate, getNumberOfElement(),getSizeElement(),getNumberOfSpacing())
}, false)



document.getElementById('autoGenerate').addEventListener('click', function() {
  if(autoGenerate == true){
    document.getElementById('autoGenerate').classList.toggle('unselected')
    document.getElementById('autoGenerate').classList.toggle('selected')
      console.log("Generation is manual")
    autoGenerate = false
  }else{
    autoGenerate = true
    document.getElementById('autoGenerate').classList.toggle('unselected')
    document.getElementById('autoGenerate').classList.toggle('selected')
      console.log("Generation is automatic")
  }
}, false)

function setElementInDOM(){
  setSeedLevel(Math.ceil(Math.random()*10000))
  setSizeElement(0.5 + Math.ceil(Math.random()*200)/100)
  setNumberOfElement(Math.ceil(Math.random()*200))
  setNumberOfSpacing(50 + Math.ceil(Math.random()*2000))
}

function generateTraps(auto,nbTraps,sizeTrap,spacingTrap){
  let seedLevel = getSeedLevel()
  let startingPoint = 600
  Math.seedrandom(seedLevel)
  let sizeOfTraps = sizeTrap
  let numberElements = nbTraps
  let spacing = spacingTrap
  let array = new Array()
  array.push(new Trap(500, 0, numberElements+1, 0, true, false))
  for(let i = 0;  i < numberElements; i++){
		 startingPoint += 500
		console.log(startingPoint)
    array.push(new Trap(startingPoint, spacing, i,sizeOfTraps, false, false))
    startingPoint = startingPoint + spacing
  }

  array.push(new Trap(startingPoint+1000,spacing,numberElements+1, 0, false,true))
  return array
}

function resetCanvas(){
	ctx.fillStyle =  'rgba(23, 41, 58,1)'
	ctx.fillRect(0, 0, game.width, game.height)
	console.log("reset of the canvas")
}

function keyManagement(e) {
    e = e || window.event
    switch (e.keyCode) {
        case 38:   // arrow up key
				case 90: //z key
            break
        case 40: // arrow down key
				case 83:
            break
        case 37:
           autoRun = true
           break
        case 39:
          autoRun = false
          break
				case 13:
	        traps = generateTraps()
	        break
        default:
				  break
    }
}

function drawTraps(width,heigth){
	ctx.fillStyle = 'rgba(23, 41, 58, 0.5)'
	ctx.fillRect(0, 0, game.width, game.height)
  for(let i = 0;  i < traps.length;  i++){
		ctx.font = "50px Borg"
		if(traps[i].type !=1){
			ctx.fillStyle =  traps[i].color
			ctx.fillRect(traps[i].posX, traps[i].posY, traps[i].width, traps[i].size)
		}
		else{
			ctx.save()
			ctx.beginPath();
			ctx.fillStyle =  '#bbbbbb';
			ctx.strokeStyle =  "#454545";
			ctx.lineWidth   = 3
			ctx.translate( traps[i].posX +  traps[i].width /2,  traps[i].posY +  traps[i].size /2);
			ctx.rotate(traps[i].rotation*Math.PI/180);
			ctx.translate( - traps[i].posX- traps[i].width/2, - traps[i].posY- traps[i].size/2  );
			ctx.moveTo(traps[i].posX, traps[i].posY);
			ctx.lineTo(traps[i].posX+traps[i].size, traps[i].posY-10);
			ctx.lineTo(traps[i].posX+traps[i].size*1.5, traps[i].posY+traps[i].size/3);
			ctx.lineTo(traps[i].posX+traps[i].size*1.4, traps[i].posY+traps[i].size/2.8);
			ctx.lineTo(traps[i].posX+traps[i].size*1.2, traps[i].posY+traps[i].size/2.5);
			ctx.lineTo(traps[i].posX+traps[i].size*1.4, traps[i].posY+traps[i].size/2);
			ctx.lineTo(traps[i].posX+traps[i].size, traps[i].posY+traps[i].size);
			ctx.lineTo(traps[i].posX+traps[i].size/2, traps[i].posY+traps[i].size/1.5);
			ctx.lineTo(traps[i].posX+traps[i].size/3, traps[i].posY+traps[i].size/1.2);
			ctx.lineTo(traps[i].posX, traps[i].posY+traps[i].size);
			ctx.lineTo(traps[i].posX-traps[i].size/2, traps[i].posY+traps[i].size/2);
			ctx.lineTo(traps[i].posX, traps[i].posY);
			ctx.stroke();
			ctx.fill();
			ctx.restore()
			ctx.fillStyle =  traps[i].color
			ctx.fillRect(traps[i].posX, traps[i].posY, traps[i].width, traps[i].size)
		}
		if(debug){

			ctx.fillText(traps[i].number,traps[i].posX,traps[i].posY-10)
			ctx.fillText(Math.round(traps[i].posX),traps[i].posX+50,traps[i].posY-10)
		}
  }
}
function drawPlayerDebug(){
	if(debug){
		ctx.fillText(Math.round(Player.posY),Player.posX,Player.posY-10)
	}
}

function drawPoints(){
	ctx.fillStyle =  traps[traps.length-1].color
	ctx.fillText("FINISH",traps[traps.length-1].posX+50,game.height/2)
	ctx.fillText('Difficulty : ' + Math.abs(Math.round(getDifficulty())),game.width-300,100)
	ctx.fillText('Score : ' + Player.score, game.width-500,100)
}

function drawAllElements(curve, curve_speed){
	 drawTraps()
	 drawPoints()
	 drawPlayer(curve,curve_speed)
	 drawPlayerDebug()
	 drawParticle(particlesArray, game.width - 500, 100)
}

function drawParticle(Particles, posx, posy){
	for(let i = 0; i < Particles.length; i++){
		if(Particles[i].attractionSpeedY > 0.2 && Particles[i].attractionSpeedX > 0.2){
			if( Particles[i].posY > posy - (posy - Particles[i].originY)/2){
					Particles[i].attractionSpeedY *=  1.05
					Particles[i].posY += -Particles[i].attractionSpeedY
			}
			else{
				Particles[i].attractionSpeedY *=  0.95
				Particles[i].posY += -Particles[i].attractionSpeedY
			}
			if( Particles[i].posX < posx - (posx -Particles[i].originX)/2){
					Particles[i].attractionSpeedX *=  1.05
					Particles[i].posX += Particles[i].attractionSpeedX
				}
				else{
					Particles[i].attractionSpeedX *=  0.95
					Particles[i].posX += Particles[i].attractionSpeedX
				}
			ctx.beginPath();
			ctx.arc( Particles[i].posX,  Particles[i].posY,  Particles[i].radius, 0, 2 * Math.PI, false);
			ctx.fillStyle =  Particles[i].color;
			ctx.fill();
		}
		else{
			if(Particles[i].pointsToGive > 0){
				console.log(Particles[i].pointsToGive)
				Particles[i].pointsToGive--
				Player.score++
			}
		}
	}

}
//Calculate the overall difficulty of the level
function getDifficulty(){
  let difficulty = (difficultyOfSize() + difficultyNumberOfElements() + difficultySpacingAverage())
  return difficulty
}

function difficultyNumberOfElements(){
  if(getNumberOfElement()<10000){
    difficultyOfElements =  5
  }
  if(getNumberOfElement()<200){
    difficultyOfElements =  4
  }
  if(getNumberOfElement()<100){
    difficultyOfElements =  3
  }
  if(getNumberOfElement()<50){
    difficultyOfElements =  2
  }
  if(getNumberOfElement()<30){
    difficultyOfElements = 1
  }
  return difficultyOfElements
}
//Calculate de difficulty of the spacing
function difficultySpacingAverage(){
  let sum = 0
  for(let i = 1;  i < traps.length-2;  i++){
    sum = sum + (traps[i+1].posX - traps[i].posX)
  }
  let avg = sum/traps.length-2
  let difficultyElement = 0
  if(avg<1000){
    difficultyElement = 1
  }
  if(avg<500){
    difficultyElement = 2
  }
  if(avg<300){
    difficultyElement = 3
  }
  if(avg<200){
    difficultyElement = 4
  }
  if(avg<100){
    difficultyElement = 5
  }
  return difficultyElement
}
//Calculate de difficulty of the spacing
function difficultyOfSize(){
  let difficultyElement = getSizeElement()
  return difficultyElement
}



function trapDetection(){
  for(let i = 1;  i < traps.length;  i++){
    if((traps[i].posX < Player.posX + Player.size) &&(traps[i].posX + traps[i].width > Player.posX + Player.size) && Player.life >= 0 ){
      if(((traps[i].posY + traps[i].size > (Player.posY)) && ((Player.posY) > traps[i].posY)) ||
				((traps[i].posY + traps[i].size > (Player.posY+Player.size)) && ((Player.posY+Player.size) > traps[i].posY))){
        if(VELOCITY < 40 && traps[i].type == 2 ){
          VELOCITY += 5
        }
        if(traps[i].type == 1){
          Player.life -= 1
        }
        if(traps[i].type == 3){
          Player.isFinished = true
        }
				if(traps[i].type == 0){
					particlesArray.push(new Particle(traps[i].posX,traps[i].posY))
					traps[i].posY = 10000
				}
        console.log('contact with : ' + traps[i].number)
        console.log('Augmenting speed by one, velocity is at :  ' + VELOCITY)
      }
    }
  }
}

function playerLifeHandler(){
  if(Player.life <= 0){
    VELOCITY = 0
    Player.mouvement = false
    Player.speed = 0
    playerDeathHandler()
  }
}

function playerDeathHandler(){
  resetCanvas()
  ctx.save()
  ctx.font = "50px Poppins"
  ctx.fillStyle = "#ffffff"
  ctx.fillText("UR DEAD",600,game.height/2)
  ctx.restore()
}

function finishLineHandler(){
  ctx.font = "50px Poppins"
  ctx.fillStyle = "#ffffff"
  ctx.fillText("WELL DONE YOU HAVE FINISHED THE LEVEL !!!!!",600,game.height/2)
}
