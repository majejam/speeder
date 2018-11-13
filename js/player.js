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


function playerMouvement(){
  Player.speed *= Player.friction
  Player.posY += Player.speed
  if(VELOCITY > 10){
    VELOCITY *= 0.98
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

 function drawPlayer(){
  ctx.fillStyle =  Player.color;
	ctx.fillRect(Player.posX, Player.posY, Player.width, Player.size);
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
