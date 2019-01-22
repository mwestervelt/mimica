document.addEventListener("DOMContentLoaded", init)
let easyBtn = document.querySelector('#easy')
easyBtn.addEventListener('click', init)
let mediumBtn = document.querySelector('#medium')
mediumBtn.addEventListener('click', init)
let hardBtn = document.querySelector('#hard')
hardBtn.addEventListener('click', init)

function init(){
  console.log('%c the DOM content has super been loaded...how do you say...."namespace"', 'color: magenta');
  getWords().then(splitWordStrength)

}

function splitWordStrength(wordsArray){
  const easyWords = []
  const mediumWords = []
  const hardWords = []
  wordsArray.forEach(word => {
    if (word.category_id === 1) {
      easyWords.push(word)
    } else if (word.category_id === 2) {
      mediumWords.push(word)
    } else if (word.category_id === 3) {
      hardWords.push(word)
    }
  })
  randomizeEasyWord(easyWords)
  randomizeMediumWord(mediumWords)
  randomizeHardWord(hardWords)
}

function randomizeEasyWord(easyWords){
  let randomWord = easyWords[Math.floor(Math.random()*easyWords.length)];
  slapAWord(randomWord);
}

function randomizeMediumWord(mediumWords){
  let randomWord = mediumWords[Math.floor(Math.random()*mediumWords.length)];
  slapAWord(randomWord);
}

function randomizeHardWord(hardWords){
  let randomWord = hardWords[Math.floor(Math.random()*hardWords.length)];
  slapAWord(randomWord);
}

function slapAWord(word){
  const wordDiv = document.querySelector(".words-here")

  wordDiv.innerHTML = `<h1>${word.wordname}<h1>`
}


// function navBarHide(event){
//   // event.target.className === 'navbar-header'
//     console.log("ANYONE ???")
// }

///// FETCH THE DANG WORDS
const wordsURL =  'http://localhost:3000/api/v1/words'
function getWords(){
  return fetch(wordsURL)
  .then(response => response.json())
}
