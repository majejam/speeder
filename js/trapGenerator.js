function Trap(startingPoint,spacing){
  this.type = Math.floor(Math.random()*4);
  this.posX = startingPoint +  parseInt(Math.random()*(spacing))
  this.posY = parseInt(Math.random()*(game.height - 100));
  //if bonus
  if(this.type == 0){
    this.size = parseInt(20 + Math.random()*50);
    this.width = this.size;
    this.color = "#ff6501";
  }
  if(this.type == 1){
    this.size = parseInt(20 + Math.random()*500);
    this.width = parseInt(10 + Math.random()*10);
    this.color = "#ff5041";
  }
  if(this.type == 2){
    this.size = parseInt(20 + Math.random()*500);
    this.width = parseInt(10 + Math.random()*10);
    this.color = "#12fa21";
  }

}
function trapsMouvement(direction, elements){
  for(let i = 0; i < traps.length;i++){
     traps[i].posX = traps[i].posX + direction;
  }
}
