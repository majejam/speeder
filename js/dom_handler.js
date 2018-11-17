const menuButton = document.querySelector('.option-menu-button')
const menuContainer = document.querySelector('.option-menu-container')
const menuButtonBar = document.querySelectorAll('.hidding-bar-effect')
const starContainers = document.querySelectorAll('.star-containers')
const returnHome = document.querySelector('.return-home')
const homeContainer = document.querySelector('.menu-container')
const playButtton = document.querySelector('.play-button')
for (let i = 0; i < 150; i++) {
  for(let j =0; j < starContainers.length;j++){
      generateStarsMenu(starContainers[j])
  }
}
const starSingleElement = document.querySelectorAll('.single-star-element')
menuButton.addEventListener('click', () => {
  optionShow()
})

function optionShow(){
  menuButton.classList.toggle('button-open-animation')
  menuButton.classList.toggle('button-close-animation')
  menuContainer.classList.toggle('option-menu-container-selected')
  menuContainer.classList.toggle('menu-container-close')
  for (let i = 0; i < starSingleElement.length; i++) {
    starSingleElement[i].classList.toggle('single-star-element-show')
    starSingleElement[i].classList.toggle('shining-star')
  }
  for(let i =0; i<menuButtonBar.length; i++){
    menuButtonBar[i].classList.toggle('hidding-bar-effect-show')
  }
  if(playingState){
    playingState = false
  }
  else{
    playingState = true
  }
}
document.getElementById('Play').addEventListener('click', function() {
	resetLevel()
	resetPlayer()
	if(autoRun == false){
		autoRun = true
	}
	else{
		autoRun = false
	}
}, false)
returnHome.addEventListener('click', () => {
  homeContainer.classList.toggle('menu-container-unselected')
})
playButtton.addEventListener('click', () => {
  homeContainer.classList.toggle('menu-container-unselected')
  homeContainer.classList.toggle('menu-container-selected')
  optionShow()
})
function generateStarsMenu(starContainer) {
  let starElement = document.createElement('div')
  let random = 3000 + Math.ceil(Math.random() * 1000)
  starElement.classList.add('single-star-element');
  starElement.style.left = `${Math.ceil(Math.random() * 100)}%`;
  starElement.style.top = `${Math.ceil(Math.random() * 100)}%`;
  starElement.style.width = `${Math.ceil(Math.random() * 10)}px`;
  starElement.style.opacity = 50+ Math.ceil(Math.random() * 49)/100 ;
  starElement.style.height = starElement.style.width ;
  starElement.style.animationDelay =`${random}ms`;
  starElement.innerHTML = ' ';
  starContainer.appendChild(starElement)
}




//game options
function getSeedLevel(){
  let seed = document.getElementById('seed').value
  return seed
}
function getSizeElement(){
  let size = parseInt(document.getElementById('size').value)
  return size
}
function getNumberOfElement(){
  let numberElements = parseInt(document.getElementById('numberElements').value)
  if(numberElements > 1000){
    numberElements = 1000
  }
  if(numberElements < 0){
    numberElements = 1
  }
  if( isNaN(numberElements) ){
    numberElements = 1
  }
  setNumberOfElement(numberElements)
  return numberElements
}
function getNumberOfSpacing(){
  let numberSpacing = parseInt(document.getElementById('numberSpacing').value)
  return numberSpacing
}
function setNumberOfSpacing(element){
  document.getElementById('numberSpacing').value = element
}
function setNumberOfElement(element){
  document.getElementById('numberElements').value = element
}
function setSizeElement(element){
  document.getElementById('size').value = element
}
function setSeedLevel(element){
  document.getElementById('seed').value = element
}
document.getElementById('manualGenerate').addEventListener('click', function() {
  resetCanvas()
  if(autoGenerate == true){
    console.clear()
    setElementInDOM()
  }
  traps = generateTraps(autoGenerate, getNumberOfElement(),getSizeElement(),getNumberOfSpacing())
}, false)



document.getElementById('autoGenerate').addEventListener('click', function() {
  if(autoGenerate == true){
    document.getElementById('autoGenerate').classList.toggle('unselected')
    document.getElementById('autoGenerate').classList.toggle('selected')
      console.log("Generation is manual")
    autoGenerate = false
  }else{
    autoGenerate = true
    document.getElementById('autoGenerate').classList.toggle('unselected')
    document.getElementById('autoGenerate').classList.toggle('selected')
      console.log("Generation is automatic")
  }
}, false)

function setElementInDOM(){
  setSeedLevel(Math.ceil(Math.random()*10000))
  setSizeElement(0.5 + Math.ceil(Math.random()*200)/100)
  setNumberOfElement(Math.ceil(Math.random()*200))
  setNumberOfSpacing(50 + Math.ceil(Math.random()*2000))
}
