document.addEventListener("DOMContentLoaded", init)
// let easyBtn = document.querySelector('#easy')
// easyBtn.addEventListener('click', splitWordStrength)
// let mediumBtn = document.querySelector('#medium')
// mediumBtn.addEventListener('click', splitWordStrength)
// let hardBtn = document.querySelector('#hard')
// hardBtn.addEventListener('click', splitWordStrength)
let startGame = true
const startBtn = document.createElement("button")
const centerSpace = document.querySelector(".center")
let team1 = false

function init(){
  console.log('%c the DOM content has super been loaded...how do you say...."namespace"', 'color: magenta');
  document.querySelector(".button-div").innerHTML = ""
  startBtn.innerHTML = "Start a Dang Game"

  centerSpace.append(startBtn)
  startBtn.addEventListener("click", createTeams)

}

startBtn.addEventListener("click",  () => {
  var f = document.createElement("form");
  startGame = !startGame
  if (startGame) {
    f.style.display = 'block'
  } else {
    f.style.display = 'none'
  }
})

function createTeams(){
  centerSpace.innerHTML = `<form style="text-align: center" class="team-form"> Team 1 Name:<br>
  <input type="text" name="team1name" value="" placeholder="enter team 1 name"><br>
  Player Names:<br>
  <input type="text" name="player1" value="" placeholder="enter player 1 name"><br>
  <input type="text" name="player2" value="" placeholder="enter player 2 name"><br>
  <input type="text" name="player3" value="" placeholder="enter player 3 name"><br>
  <input type="text" name="player4" value="" placeholder="enter player 4 name"><br>
  <input type="text" name="player5" value="" placeholder="enter player 5 name"><br>
  <input type="text" name="player6" value="" placeholder="enter player 6 name"><br><br>
  <input type="submit" value="Submit">
  </form>`
  document.querySelector('.team-form').addEventListener('submit', () => {
    // debugger
    if (!team1){
      getTeam1FormInfo(event)
      team1 = true
    } else {
      getTeam2FormInfo(event)
    }
  })
}

function getTeam1FormInfo(event){
  event.preventDefault()
  let teamUl = document.createElement("ul")
  let team1Title = document.createElement("h2")
  let team1Name = event.target.team1name.value
  team1Title.append(team1Name)
  let team1Players = [event.target.player1.value, event.target.player2.value, event.target.player3.value, event.target.player4.value, event.target.player5.value, event.target.player6.value]
  teamUl.append(team1Title)
  team1Players.forEach( player => {
    let team1Area = document.querySelector('.team-1-list')
    let playerLi = document.createElement("li")
    playerLi.innerHTML = player
    teamUl.appendChild(playerLi)
    team1Area.append(teamUl)
  })
  console.log(team1Players)
  event.target.reset()
  // document.querySelector('.team-form').addEventListener('submit', getTeam2FormInfo)
}

function getTeam2FormInfo(event){
  event.preventDefault()
  let team2Ul = document.createElement("ul")
  let team2Title = document.createElement("h2")
  let team2Name = event.target.team1name.value
  team2Title.append(team2Name)
  let team2Players = [event.target.player1.value, event.target.player2.value, event.target.player3.value, event.target.player4.value, event.target.player5.value, event.target.player6.value]
  team2Ul.append(team2Title)
  team2Players.forEach( player => {
    let team2Area = document.querySelector('.team-2-list')
    let playerLi = document.createElement("li")
    playerLi.innerHTML = player
    team2Ul.appendChild(playerLi)
    team2Area.append(team2Ul)
  })
}








///UNCOMMENT TO GET WORDS BUTTONS AND PUT RANDOM WORDS ON PAGE
// function splitWordStrength(){
//   getWords().then(wordsArray => {
//   const easyWords = []
//   const mediumWords = []
//   const hardWords = []
//   wordsArray.forEach(word => {
//     if (word.category_id === 1) {
//       easyWords.push(word)
//     } else if (word.category_id === 2) {
//       mediumWords.push(word)
//     } else if (word.category_id === 3) {
//       hardWords.push(word)
//     }
//   })
//   randomizeEasyWord(easyWords)
//   randomizeMediumWord(mediumWords)
//   randomizeHardWord(hardWords)
// })
// }
//
// function randomizeEasyWord(easyWords){
//   let randomWord = easyWords[Math.floor(Math.random()*easyWords.length)];
//   slapAWord(randomWord);
// }
//
// function randomizeMediumWord(mediumWords){
//   let randomWord = mediumWords[Math.floor(Math.random()*mediumWords.length)];
//   slapAWord(randomWord);
// }
//
// function randomizeHardWord(hardWords){
//   let randomWord = hardWords[Math.floor(Math.random()*hardWords.length)];
//   slapAWord(randomWord);
// }
//
// function slapAWord(word){
//   const wordDiv = document.querySelector(".words-here")
//   wordDiv.innerHTML = ""
//   wordDiv.innerHTML = `<h1>${word.wordname}<h1>`
// }


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
