function Laser(Player, nb){
  this.posX= Player.posX + Player.size ;
  this.posY= Player.posY + Player.size/2;
  this.speedX = 10 ;
  this.speedY = Player.speed*1.5/18 + nb ;
  this.velocity = 1.01
	this.size = 20;
  this.color = 'red'
}


function drawLaser(Laser){
  for(let i = 0; i < Laser.length; i++){
    Laser[i].speedX *= Laser[i].velocity
    Laser[i].speedY *= Laser[i].velocity
    Laser[i].posY += Laser[i].speedY
    Laser[i].posX += Laser[i].speedX
    ctx.fillRect(Laser[i].posX,Laser[i].posY, Laser[i].size,  5 )
    if(Laser[Laser.length - 1].posX > 2000){
      keyPressed = false
      Laser.splice(0,i+1)
      console.log("ok")
    }
  }
  console.log(Laser)
}


function playerShoot(Player,nb){
  arrayLaser.push(new Laser(Player,nb))
}
