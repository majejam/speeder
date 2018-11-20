function Particle(x,y){
  this.posX= x
  this.posY= y
	this.pointsToGive = Math.ceil(Math.random()*20)
  this.radius= 1 + this.pointsToGive /4
  this.color= '#FAF523'
	this.originX = x
	this.originY = y
	this.attractionSpeedX = 1
	this.attractionSpeedY = 1
}

function Laser(Player, nb){
  this.posX= Player.posX + Player.size
  this.posY= Player.posY + Player.size/2
  this.speedX = 10
  this.speedY = Player.speed*1.5/18 + nb
  this.velocity = 1.01
	this.size = 20
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
    if(Laser[Laser.length - 1].posX > 3000){
      keyPressed = false
      Laser.splice(0,i+1)
    }
  }
}
function drawParticle(Particles, posx, posy){
	for(let i = 0; i < Particles.length; i++){
		if(Particles[i].attractionSpeedX > 0.15){
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
			ctx.beginPath()
			ctx.arc( Particles[i].posX,  Particles[i].posY,  Particles[i].radius, 0, 2 * Math.PI, false)
			ctx.fillStyle =  Particles[i].color
			ctx.fill()
		}
		else{
			if(Particles[i].pointsToGive > 0){
				Particles[i].pointsToGive--
				Player.xp++
			}
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

function Explosionparticles(x,y, color){
  this.posX= x
  this.posY= y
  this.speedX = -5+Math.random()*30
  this.speedY = -15+Math.random()*30
  this.radius= 1 + Math.random()*5
  this.color= 'rgba(255,165,0,1)'
  this.opacity = 1
	this.originX = x
	this.originY = y
}

function drawExplosion(){
  for(let i = 0; i < explosionParticlesArray.length; i++){
    if(explosionParticlesArray[0].opacity > 0.05){
      explosionParticlesArray[i].speedX *= 0.91 + Math.random()/10
      explosionParticlesArray[i].speedY *= 0.91 + Math.random()/10
      explosionParticlesArray[i].posY += explosionParticlesArray[i].speedY
      explosionParticlesArray[i].posX += explosionParticlesArray[i].speedX
      explosionParticlesArray[i].opacity *= 0.94
      explosionParticlesArray[i].color = `rgba(255,165,0,${explosionParticlesArray[i].opacity})`
      ctx.beginPath()
      ctx.arc(explosionParticlesArray[i].posX,  explosionParticlesArray[i].posY,  explosionParticlesArray[i].radius, 0, 2 * Math.PI, false)
      ctx.fillStyle =  explosionParticlesArray[i].color
      ctx.fill()
    }
  }
}
