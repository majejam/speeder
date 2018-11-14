const menuButton = document.querySelector('.option-menu-button')
const menuContainer = document.querySelector('.option-menu-container')
const menuButtonBar = document.querySelectorAll('.hidding-bar-effect')
const starContainer = document.querySelector('.star-container')
for (let i = 0; i < 150; i++) {
  generateStarsMenu(starContainer)
}
const starSingleElement = document.querySelectorAll('.single-star-element')
menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('button-open-animation')
  menuButton.classList.toggle('button-close-animation')
  menuContainer.classList.toggle('option-menu-container-selected')
  menuContainer.classList.toggle('menu-container-close')
  for (let i = 0; i < 150; i++) {
    starSingleElement[i].classList.toggle('single-star-element-show')
    starSingleElement[i].classList.toggle('shining-star')
  }
  for(let i =0; i<menuButtonBar.length; i++){
    menuButtonBar[i].classList.toggle('hidding-bar-effect-show')
  }
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
