function Particle(x,y){
  this.posX= x
  this.posY= y
	this.pointsToGive = Math.ceil(Math.random()*20)
  this.size= 1 + this.pointsToGive /4
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

function Star(){
  this.posX= Math.random()* game.width
  this.posY= Math.random()* game.height
	this.size = Math.random()*2
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
      drawXP(Particles[i])
		}
		else{
			if(Particles[i].pointsToGive > 0){
				Particles[i].pointsToGive--
        levelxp++
				//Player.xp++
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
            for(let k =0;  k <20;  k++){
              explosionParticlesArray.push(new Explosionparticles(Laser[j].posX,Laser[j].posY))
            }
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
  this.radius= 0.5 + Math.random()*2
  this.color= 'rgba(255,165,0,1)'
  this.opacity = 1
	this.originX = x
	this.originY = y
}

function drawExplosion(){
  if(particles_display){
    for(let i = 0; i < explosionParticlesArray.length; i++){
      if(explosionParticlesArray[explosionParticlesArray.length-1].opacity > 0.05){
        explosionParticlesArray[i].speedX *= 0.91 + Math.random()/10
        explosionParticlesArray[i].speedY *= 0.91 + Math.random()/10
        explosionParticlesArray[i].posY += explosionParticlesArray[i].speedY
        explosionParticlesArray[i].posX += explosionParticlesArray[i].speedX
        explosionParticlesArray[i].opacity *= 0.94
        explosionParticlesArray[i].color = `rgba(255,165,0,${explosionParticlesArray[i].opacity})`
        ctx.save()
        ctx.beginPath()
        ctx.shadowColor   =  explosionParticlesArray[i].color
        ctx.shadowBlur    = 1
        ctx.arc(explosionParticlesArray[i].posX,  explosionParticlesArray[i].posY,  explosionParticlesArray[i].radius, 0, 2 * Math.PI, false)
        ctx.fillStyle =  explosionParticlesArray[i].color
        ctx.stroke()
        ctx.fill()
        ctx.restore()
      }
      else{
        explosionParticlesArray.splice(0,explosionParticlesArray.length)
      }
    }
  }
}

function drawShield(){
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle =  "white"
  ctx.shadowColor   =  "blue"
  ctx.shadowBlur    = 20
  ctx.lineWidth   = 3
  ctx.arc(Player.posX + Player.size/2,Player.posY + Player.size/2,50,0,2*Math.PI);
  ctx.stroke()
  ctx.restore()
}

function drawXP(traps){
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle =  "white"
  ctx.fillStyle = 'white'
  ctx.shadowColor   =  "rgb(255,223,0)"
  ctx.shadowBlur    = traps.size/2
  ctx.lineWidth   = 3
  ctx.arc(traps.posX + traps.size/2,traps.posY + traps.size/2,traps.size/4,0,2*Math.PI);
  ctx.stroke()
  ctx.fill()
  ctx.restore()
}

function initBG(){
  bgArray.splice(0,bgArray.length)
  for(let i = 0; i <100; i++){
    bgArray.push(new Star())
  }
}
function drawBG(){
  for(let i = 0; i < bgArray.length; i++){
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle =  "white"
    //ctx.shadowColor   =  "rgb(255,255,224)"
    //ctx.shadowBlur    = 10
    ctx.arc(bgArray[i].posX+bgArray[i].size/2, bgArray[i].posY+bgArray[i].size/2, bgArray[i].size,0,2*Math.PI);
    ctx.fill()
    ctx.restore()
  }
}
