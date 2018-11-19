const Player = {}
  Player.posX= 500;
  Player.posY= 400;
  Player.width= 25;
  Player.size= 25;
  Player.color= '#454554';
  Player.velY= 0;
  Player.velX= 0;
  Player.speed= 0;
  Player.friction= 0.95;
  Player.keys= [];
  Player.mouvement= true;
  Player.life = 1
  Player.isFinished = false
  Player.xp = 0
  Player.trail_color = '#341093'
  Player.trail_size = 20
  Player.bonus = 0
  Player.bonusNumber = 33
  Player.rotation = 1
  Player.directionPlayer = true
  Player.directionDeath = 0

function playerMouvement(){
  Player.speed *= Player.friction
  Player.posY += Player.speed
  if(VELOCITY >= 10){
    VELOCITY *= 0.99
  }
  if(VELOCITY < 9){
    VELOCITY *= 1.1
  }
  if(VELOCITY > 9 && VELOCITY < 10 ){
    VELOCITY = 10
  }
  if (Player.keys[38]  && Player.mouvement ) {
    Player.speed += -0.5*1.2
 }

 if (Player.keys[40] && Player.mouvement) {
   Player.speed += 0.5*1.2
 }
 if (Player.keys[32] && Player.life > 0 ) {
   if(!keyPressed && Player.bonus != 2 ){
      playerShoot(Player,0)
      keyPressed = true
   }
   if(Player.bonus == 1 ){
     for(let i = 0; i <Player.bonusNumber; i++){
      playerShoot(Player, (Player.bonusNumber/2 - i))
     }
   }
   if(!keyPressed && Player.bonus == 2){
     for(let i = 0; i <Player.bonusNumber; i++){
      playerShoot(Player, (Player.bonusNumber/2 - i))
     }
      keyPressed = true
   }
}
  if (Player.posY + Player.size > game.height && Player.life != 0) {
    Player.posY = 1
  }
  if (Player.posY  < 0 && Player.life != 0) {
    Player.posY =  game.height - Player.size-1
  }
}

 function drawPlayer(curve,curve_speed){
  curve_speed = -Player.speed * 3
  curve += curve_speed + (Player.posY+Player.size/2)
  ctx.save()
  ctx.beginPath();
  ctx.lineWidth   = 20       // Largeur de la ligne
  const gradient = ctx.createLinearGradient(Player.posX - ((Player.trail_size*VELOCITY)/1.5), 2000, 500, 2000) // x1, y1, x2, y2
  gradient.addColorStop(0, 'rgba(105, 206, 205,0)')    // Couleur de départ
  gradient.addColorStop(1, 'rgba(105, 206, 205,1)') // Couleur de arrivée
  ctx.strokeStyle = gradient
  ctx.moveTo(Player.posX, (Player.posY+Player.size/2) )
  ctx.quadraticCurveTo(Player.posX -((Player.trail_size*VELOCITY)/4), (Player.posY+Player.size/2) , Player.posX - ((Player.trail_size*VELOCITY)/1.3), curve);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle =  Player.color;
  ctx.strokeStyle =  "#aa7870";
  ctx.translate(Player.posX + Player.size /2, Player.posY + Player.size /2);
  ctx.rotate(Player.rotation*Player.speed*1.5/180);
  ctx.translate( -Player.posX-Player.size/2, -Player.posY-Player.size/2);
  //ctx.fillRect(Player.posX, Player.posY, Player.width, Player.size);
  ctx.lineWidth   = 2
  ctx.moveTo(Player.posX, Player.posY);
  ctx.lineTo(Player.posX + Player.size, Player.posY+Player.size/2);
  ctx.lineTo(Player.posX, Player.posY+Player.size);
  ctx.lineTo(Player.posX, Player.posY);
  ctx.stroke();
  ctx.fill();
  ctx.restore()
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
