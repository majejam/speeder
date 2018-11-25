const menuButton = document.querySelector('.option-menu-button')
const menuContainer = document.querySelector('.option-menu-container')
const menuButtonBar = document.querySelectorAll('.hidding-bar-effect')
const starContainers = document.querySelectorAll('.star-containers')
const returnHome = document.querySelector('.return-home')
const homeContainer = document.querySelector('.menu-container')
const playButtton = document.querySelector('.play-button')
const playGenerateButtton = document.querySelector('.play-generate-button')
const finishContainer = document.querySelector('.finishing-container')
const variablesContainer = document.querySelector('.finishing-variables')
const canvasButton = document.querySelector('.canvas-button')
const mainOptionButton = document.querySelector('.principal-option-button')
const mainOptionInnerButton = document.querySelector('.principal-option-inner-button')
const mainOptionContainer = document.querySelector('.option-main-container')
const controlsContainer = document.querySelector('.controls-main-container')
const controlsButton = document.querySelector('.controls-button')
const returnControlsButton = document.querySelector('.controls-return-button')
const generateContainer = document.querySelector('.generate-main-container')
const generateReturn = document.querySelector('.principal-generate-button')
const generateMenu = document.querySelector('.generate-button')
const timerContaier = document.querySelector('.timer-container')
const xpContainer = document.querySelector('.xp-container')
const totalXpContainer = document.querySelector('.total-xp-container')
const motionBlurButtons = document.querySelectorAll('.motion-blur-button')
const particlesButtons = document.querySelectorAll('.particles-button')
const soundButtons = document.querySelectorAll('.sound-button')
for (let i = 0; i < 150; i++) {
  for(let j =0; j < starContainers.length;j++){
      generateStarsMenu(starContainers[j])
  }
}

controlsButton.addEventListener('click', function() {
  controlsContainer.classList.toggle('controls-main-container-selected')
}, false)

returnControlsButton.addEventListener('click', function() {
  controlsContainer.classList.toggle('controls-main-container-selected')
}, false)

const starSingleElement = document.querySelectorAll('.single-star-element')
menuButton.addEventListener('click', () => {
  optionShow()
})

for(let i = 0; i < soundButtons.length; i++){
  soundButtons[i].addEventListener('click', () => {
    if(!soundPlay){
      for(let j = 0; j < soundButtons.length; j++){
        soundButtons[j].classList.add('sound-on')
      }
      soundPlay = true
    }
    else{
        for(let j = 0; j < soundButtons.length; j++){
          soundButtons[j].classList.remove('sound-on')
        }
          soundPlay = false
    }
  })
}

for(let i = 0; i < particlesButtons.length; i++){
  particlesButtons[i].addEventListener('click', () => {
    if(!particles_display){
      for(let j = 0; j < particlesButtons.length; j++){
        particlesButtons[j].classList.add('particles-on')
      }
      particles_display = true
    }
    else{
        for(let j = 0; j < particlesButtons.length; j++){
          particlesButtons[j].classList.remove('particles-on')
        }
          particles_display = false
    }
  })
}
playGenerateButtton.addEventListener('click', () => {
  homeContainer.classList.toggle('menu-container-unselected')
  homeContainer.classList.toggle('menu-container-selected')
  mainOptionContainer.classList.toggle('option-main-container-unselected')
  generateContainer.classList.toggle('generate-main-container-selected')
  resetLevel()
  optionShow()
  chronoStop()
  chronoReset()
  if(!autoRun){
    autoRun = true
  }
})

generateMenu.addEventListener('click', function() {
  generateContainer.classList.toggle('generate-main-container-selected')
}, false)

generateReturn.addEventListener('click', function() {
  generateContainer.classList.toggle('generate-main-container-selected')
}, false)


mainOptionButton.addEventListener('click', function() {
  mainOptionContainer.classList.toggle('option-main-container-unselected')
}, false)

mainOptionInnerButton.addEventListener('click', function() {
  mainOptionContainer.classList.toggle('option-main-container-unselected')
}, false)

function optionShow(){
  thrustSound.stop()
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
    chronoContinue()
  }
}
document.getElementById('Play').addEventListener('click', function() {
  nextLevel()
  resetLevel()
  chronoStop()
  chronoReset()
	if(autoRun == false){
		autoRun = true
	}
	else{
		autoRun = false
	}
}, false)

for(let i = 0; i < motionBlurButtons.length; i++){
  motionBlurButtons[i].addEventListener('click', () => {
    if(canvas_color == 'rgba(23, 41, 48, 1)'){
      for(let j = 0; j < motionBlurButtons.length; j++){
        motionBlurButtons[j].classList.add('motion-blur-on')
      }
      canvas_color = 'rgba(23, 41, 48, 0.5)'
    }
    else{
        for(let j = 0; j < motionBlurButtons.length; j++){
          motionBlurButtons[j].classList.remove('motion-blur-on')
        }
        canvas_color = 'rgba(23, 41, 48, 1)'
    }
  })
}


returnHome.addEventListener('click', () => {
  homeContainer.classList.toggle('menu-container-unselected')
})
playButtton.addEventListener('click', () => {
  homeContainer.classList.toggle('menu-container-unselected')
  homeContainer.classList.toggle('menu-container-selected')
  resetLevel()
  optionShow()
  chronoStop()
  chronoReset()
  if(!autoRun){
    autoRun = true
  }
})

function generateStarsMenu(starContainer) {
  let starElement = document.createElement('div')
  let random = 3000 + Math.ceil(Math.random() * 1000)
  starElement.classList.add('single-star-element')
  starElement.classList.add('single-star-element-show')
  starElement.classList.add('shining-star')
  starElement.style.left = `${Math.ceil(Math.random() * 100)}%`
  starElement.style.top = `${Math.ceil(Math.random() * 100)}%`
  starElement.style.width = `${Math.ceil(Math.random() * 10)}px`
  starElement.style.opacity = 50+ Math.ceil(Math.random() * 49)/100
  starElement.style.height = starElement.style.width
  starElement.style.animationDelay =`${random}ms`
  starElement.innerHTML = ' '
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
  nextLevel()
  resetLevel()
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
    autoGenerate = false
  }else{
    autoGenerate = true
    document.getElementById('autoGenerate').classList.toggle('unselected')
    document.getElementById('autoGenerate').classList.toggle('selected')
  }
}, false)

function setElementInDOM(){
  setSeedLevel(Math.ceil(Math.random()*10000))
  setSizeElement(0.5 + Math.ceil(Math.random()*200)/100)
  setNumberOfElement(Math.ceil(Math.random()*200))
  setNumberOfSpacing(50 + Math.ceil(Math.random()*2000))
}




/// finish

function finishLineHandler(){
  if(levelxp != 0 && Player.life > 0){
    xpContainer.innerHTML = `xp gained : ${levelxp}`
    Player.xp += levelxp
    levelxp = 0
  }
  finishContainer.classList.add('finishing-container-show')
  variablesContainer.classList.add('finishing-variables-show')
  timerContaier.innerHTML = `Time taken : ${min}:${sec}:${msec}`
  totalXpContainer.innerHTML = `Total xp : ${Player.xp}`
  canvasButton.style.backgroundColor = "rgba(23, 41, 48, 1)"
  canvasButton.style.color = "white"
  chronoStop()
}

canvasButton.addEventListener('click', () => {
  nextLevel()
})

function nextLevel(){
  Player.isFinished = false
  resetLevel()
  resetPlayer()
  VELOCITY = 10
  chronoResetVar()
  canvasButton.style.backgroundColor = "white"
  canvasButton.style.color = "rgba(23, 41, 48, 1)"
  finishContainer.classList.remove('finishing-container-show')
  variablesContainer.classList.remove('finishing-variables-show')
  traps = generateTraps(autoGenerate, getNumberOfElement(), getSizeElement(), getNumberOfSpacing())
  for(let i = 0; i<traps.length; i++){
    traps[i].posX +=2000
  }
}
