function Trap(startingPoint,spacing,number, sizeOfTraps, start, finish){
  this.type = Math.floor(Math.random()*3);
  if(finish){
    this.type = 3
  }
  if(start){
    this.type = 4
  }
  this.number = number;
  //if bonus
  if(this.type == 0){
    this.size = parseInt(20 + Math.random()*50 * sizeOfTraps);
    this.posY = parseInt(Math.random()*(game.height - this.size));
    this.width = this.size;
    this.color = "#ff6501";
  }
  if(this.type == 1){
    this.size = parseInt(20 + Math.random()*50* sizeOfTraps);
    this.posY = parseInt(Math.random()*(game.height - this.size));
    this.width = parseInt(10 + Math.random()*50);
    this.color = "#ff5041";
    this.rotation = Math.ceil(Math.random()*360)
  }
  if(this.type == 2){
    this.size = parseInt(20 + Math.random()*200*sizeOfTraps);
    this.posY = parseInt(Math.random()*(game.height - this.size));
    this.width = parseInt(100 + Math.random()*500);
    this.color = "#12fa21";
  }
  if(this.type == 3){
    this.size = game.height
    this.posY = 0
    this.width = 50;
    this.color = "#12faFF";
  }
  if(this.type == 4){
    this.size = game.height
    this.posY = 0
    this.width = 50;
    this.color = "#fffa21";
  }
  this.posX = startingPoint + this.width + parseInt(-spacing/2 + Math.random()*(spacing))
}
function trapsMouvement(direction, speed){
  for(let i = 0; i < traps.length;i++){
     traps[i].posX = traps[i].posX + (speed * direction);
  }
}
