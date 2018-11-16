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
