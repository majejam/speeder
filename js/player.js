const Player = {}
  Player.posX= 500;
  Player.posY= 500;
  Player.width= 25;
  Player.size= 25;
  Player.color= '#FAF523';
  Player.velY= 0;
  Player.velX= 0;
  Player.speed= 0;
  Player.friction= 0.95;
  Player.keys= [];
  Player.mouvement= true;
  Player.life = 1
  Player.isFinished = false
  Player.score = 0
  Player.trail_color = '#341093'
  Player.trail_size = 20

function playerMouvement(){
  Player.speed *= Player.friction
  Player.posY += Player.speed
  if(VELOCITY > 10){
    VELOCITY *= 0.99
  }
  if (Player.keys[38]  && Player.mouvement ) {
    Player.speed += -0.5*1.2
 }

 if (Player.keys[40] && Player.mouvement) {
   Player.speed += 0.5*1.2
 }

  if (Player.posY + 170 > screen.height) {
    Player.posY = 0
  }
  if (Player.posY  < 0) {
    Player.posY = windowHeight - Player.size
  }
}

 function drawPlayer(curve,curve_speed){
  curve_speed = -Player.speed * 3
  curve += curve_speed + (Player.posY+Player.size/2)
  ctx.fillStyle =  Player.color;
	ctx.fillRect(Player.posX, Player.posY, Player.width, Player.size);
  ctx.beginPath();
  ctx.lineWidth   = 20       // Largeur de la ligne
  const gradient = ctx.createLinearGradient(Player.posX - ((Player.trail_size*VELOCITY)/1.5), 2000, 500, 2000) // x1, y1, x2, y2
  gradient.addColorStop(0, 'rgba(105, 206, 205,0)')    // Couleur de départ
  gradient.addColorStop(1, 'rgba(105, 206, 205,1)') // Couleur de arrivée
  ctx.strokeStyle = gradient
  ctx.moveTo(Player.posX, (Player.posY+Player.size/2) )
  ctx.quadraticCurveTo(Player.posX -((Player.trail_size*VELOCITY)/4), (Player.posY+Player.size/2) , Player.posX - ((Player.trail_size*VELOCITY)/1.5), curve);
  ctx.stroke();
}

/* currently working on this
function playerTrail(){
	let playerClone = new Array()
	if(VELOCITY>0 && VELOCITY<=10 ){
			for(let i = 0; i<VELOCITY; i++){
				playerClone.push(player)
				playerClone[i].posX = playerClone[i].posX - i;
				playerClone[i].color = 'rgba(250, 245, 35, 1 - i)'
			}
	}
		console.log(playerClone)
}
*/
