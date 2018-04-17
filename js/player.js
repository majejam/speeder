function Player(type, spacing){
  this.posX = 50;
  this.posY = 500;
  this.width = 25;
  this.size = 25;
  this.color = '#FAF523';
  this.velocity = 0;
  this.mouvement = false;
}

Player.prototype.playerMouvement = function(acceleration){
	if(player.posY+player.size < (game.heigth) || player.posY > 0){
			player.velocity -=  acceleration;
			player.posY = player.posY + player.velocity;
		}
}

Player.prototype.drawPlayer = function(){
  ctx.fillStyle =  player.color;
	ctx.fillRect(500, player.posY, player.width, player.size);
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
