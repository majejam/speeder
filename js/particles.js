function Laser(Player, nb){
  this.posX= Player.posX + Player.size ;
  this.posY= Player.posY + Player.size/2;
  this.speedX = 10 ;
  this.speedY = Player.speed*1.5/18 + nb ;
  this.velocity = 1.01
	this.size = 20;
  this.color = '#ef4545'
}


function drawLaser(Laser){
  for(let i = 0; i < Laser.length; i++){
    Laser[i].speedX *= Laser[i].velocity
    Laser[i].speedY *= Laser[i].velocity
    Laser[i].posY += Laser[i].speedY
    Laser[i].posX += Laser[i].speedX
    ctx.fillStyle = Laser[i].color
    ctx.fillRect(Laser[i].posX,Laser[i].posY, Laser[i].size,  5 )
    if(Laser[Laser.length - 1].posX > 10000){
      keyPressed = false
      Laser.splice(0,i+1)
    }
  }
}


function playerShoot(Player,nb){
  arrayLaser.push(new Laser(Player,nb))
}

function trapDetectionLaser(trap, Laser){
  if(Laser.length>0){
    for(let j =  0; j < Laser.length; j++){
      for(let i = 1;  i < traps.length;  i++){
        if((traps[i].posX < Laser[j].posX + Laser[j].size) &&(traps[i].posX + traps[i].width > Laser[j].posX + Laser[j].size) && traps[i].type == 1){
          if(((traps[i].posY + traps[i].size > (Laser[j].posY + Laser[j].size/2)) && ((Laser[j].posY + Laser[j].size/2) > traps[i].posY))){
            traps[i].posY = 9000
            Laser[j].posY = 9000
          }
        }
      }
    }
  }
}
