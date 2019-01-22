document.addEventListener("DOMContentLoaded", init)

function init(){
  const easyBtn = document.querySelector("#easy-btn")
  document.addEventListener('click', navBarHide)
  easyBtn.addEventListener("click", printRandomWord)
}

function printRandomWord(){
  // debugger
  getWords().then( wordsArray => {
    const mainSpace = document.querySelector("#words-here")
    var randEasy = wordsArray[Math.floor(Math.random()*wordsArray.length)];
    mainSpace.innerText = randEasy
  })
}


const wordsURL =  'http://localhost:3000/easywords'
function getWords(){
  return fetch(wordsURL)
  .then(response => response.json())
}

const navBarHide(event){
  // event.target.className === 'navbar-header'
    console.log("???")

}
