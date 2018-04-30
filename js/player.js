let Player = {
  posX: 150,
  posY: 500,
  width: 25,
  size: 25,
  color: '#FAF523',
  velY: 0,
  velX: 0,
  speed: 8,
  friction: 0.98,
  keys: [],
  mouvement: false,


}

function playerMouvement(){
  if (Player.keys[38]) {
     if (Player.velY > -Player.speed) {
         Player.velY--;
     }
 }

 if (Player.keys[40]) {
     if (Player.velY < Player.speed) {
         Player.velY++;
     }
 }

  Player.velY *= Player.friction;
  Player.posY += Player.velY;

  Player.velX *= Player.friction;
  Player.posX += Player.velX;
  if (Player.posX >= screen.width) {
      Player.posX = screen.width;
  } else if (Player.posX <= 5) {
      Player.posX = 5;
  }
  if ( Player.posY > screen.heigth) {
        Player.posY =  screen.heigth;
  } else if (  Player.posY <= 5) {
        Player.posY = 5;
  }

}

 function drawPlayer(){
  ctx.fillStyle =  Player.color;
	ctx.fillRect(500, Player.posY, Player.width, Player.size);
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
