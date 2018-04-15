function Trap(type, spacing){
  this.type = type;
  this.posX =  spacing + parseInt(Math.random()*(spacing))
  //if bonus
  if(type == 0){
    this.posY = parseInt(Math.random()*(game.height - 100));
    this.size = parseInt(20 + Math.random()*50);
    this.width = this.size;
    this.color = "#ff6501";
  }
  if(type == 1){
    this.posY = parseInt(Math.random()*(game.height - 100));
    this.size = parseInt(20 + Math.random()*500);
    this.width = parseInt(10 + Math.random()*10);
    this.color = "#ff5041";
  }

}
function trapsMouvement(direction, elements){
  for(let i = 0; i < elements;i++){
     traps[i].posX = traps[i].posX + direction;
  }
}
