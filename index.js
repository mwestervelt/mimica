// THIS THIS THIS THIS THIS THIS THIS THIS THIS
document.addEventListener("DOMContentLoaded", init)
let easyBtn = document.querySelector('#easy')
easyBtn.addEventListener('click', splitWordStrength)
let mediumBtn = document.querySelector('#medium')
mediumBtn.addEventListener('click', splitWordStrength)
let hardBtn = document.querySelector('#hard')
hardBtn.addEventListener('click', splitWordStrength)
let startGame = true
const startBtn = document.createElement("button")
const aboutBtn = document.querySelector(".about")
const centerSpace = document.querySelector(".center")
const centerText = document.querySelector(".start-text")
const selectText = document.querySelector(".select-text")
const teamFormDiv = document.querySelector(".team-form-div")
const btnDiv = document.querySelector("#button-div")
const wordDiv = document.querySelector(".words-here")
let team1 = false
let team2 = false
aboutBtn.addEventListener("click", showAbout)
let round = 0

let team1Players = []
let team2Players = []

function init(){
  console.log('%c the DOM content has super been loaded...how do you say...."namespace", also....T H I S', 'color: magenta');

  btnDiv.setAttribute("class", "hidden")
  startBtn.innerHTML = "Start a Dang Game"

  centerSpace.append(startBtn)
  startBtn.addEventListener("click", createTeams)
}

function createTeams(){
  startBtn.setAttribute("class", "hidden")
  teamFormDiv.innerHTML = `<form style="text-align: center" class="team-form"> Team Name:<br>
  <input type="text" name="team1name" value="" placeholder="enter team name"><br>
  Player Names:<br>
  <input type="text" name="player1" value="" placeholder="enter player 1 name" required><br>
  <input type="text" name="player2" value="" placeholder="enter player 2 name" required><br>
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
      team2 = true
      team1 = true
    }
    if (!!team1 && !!team2 ){
      document.querySelector(".team-form").innerHTML = ""
      readyBtn = document.createElement("button")
      readyBtn.innerText = "GO"
      centerSpace.append(readyBtn)
      readyBtn.addEventListener("click", pickAPlayer)
    }
  })
}

function getTeam1FormInfo(event){
  event.preventDefault()
  let teamUl = document.createElement("ul")
  let team1Title = document.createElement("h2")
  let team1Name = event.target.team1name.value
  team1Title.append(team1Name)
  team1Players = [event.target.player1.value, event.target.player2.value, event.target.player3.value, event.target.player4.value, event.target.player5.value, event.target.player6.value]
  teamUl.append(team1Title)
  team1Players.forEach( player => {
    let team1Area = document.querySelector('.team-1-list')
    let playerLi = document.createElement("li")
    playerLi.innerHTML = player
    teamUl.appendChild(playerLi)
    team1Area.append(teamUl)
  })
  event.target.reset()
}

function getTeam2FormInfo(event){
  event.preventDefault()
  let team2Ul = document.createElement("ul")
  let team2Title = document.createElement("h2")
  let team2Name = event.target.team1name.value
  team2Title.append(team2Name)
  team2Players = [event.target.player1.value, event.target.player2.value, event.target.player3.value, event.target.player4.value, event.target.player5.value, event.target.player6.value]
  team2Ul.append(team2Title)

  team2Players.forEach( player => {
    let team2Area = document.querySelector('.team-2-list')
    let playerLi = document.createElement("li")
    playerLi.innerHTML = player
    team2Ul.appendChild(playerLi)
    team2Area.append(team2Ul)
  })
}

function pickAPlayer(event){
  let currentPlayer1 = team1Players[0]
  let currentPlayer2 = team2Players[0]
  centerText.append(("It's your turn, " + currentPlayer1 + "!").toUpperCase())
  selectText.append('Pick a word category:')
  console.log(currentPlayer1);

  rotatePlayers();
  beginGame();
}
// flash player up team1Players[0]
//picks player 1 team 1 after go button press
//then this calls splitWordStrength

function rotatePlayers(){
  // debugger
  team1Players = team1Players.filter(Boolean)
  currentPlayer1 = team1Players.shift();
   team1Players.push(currentPlayer1)
  console.log(currentPlayer1);
  readyBtn.setAttribute("class", "hidden")
  console.log(currentPlayer1)
}

function beginGame(){
  console.log('begin game working?')
  // splitWordStrength()
  btnDiv.setAttribute("class", "block")
}

function splitWordStrength(e){
  const wordDiv = document.querySelector(".words-here")
  // const getEffingWordBtn = document.createElement("button")
  // getEffingWordBtn.innerText = "Word me, dude."
  // wordDiv.append(getEffingWordBtn)
  wordDiv.innerHTML = `ready for a word?<br><br>`
  getWords(event.target.dataset.id).then(wordsArray => {
    // debugger;
    let randomWord = wordsArray[Math.floor(Math.random()*wordsArray.length)]
    setTimeout(()=>slapAWord(randomWord), 5000)
    // set interval is the thing that we're looking for - gigi
  })
}

function slapAWord(word){
const wordSpan = document.createElement("span")
wordDiv.append(wordSpan)
wordDiv.innerHTML

console.log("this is where the word gets added to the page");
  const timerButton = document.createElement('button')
  timerButton.innerText = `${word.wordname}`
  wordSpan.append(timerButton)
  timerButton.addEventListener('click', startTimer)
   // setTimeout( function () {
   //   wordSpan.remove()}, 1000)


   function startTimer(duration, display) {
     wordSpan.remove()
       var timer = duration, minutes, seconds;
       setInterval(function () {
           minutes = parseInt(timer / 60, 10)
           seconds = parseInt(timer % 60, 10);

           minutes = minutes < 10 ? "0" + minutes : minutes;
           seconds = seconds < 10 ? "0" + seconds : seconds;

           display.textContent = minutes + ":" + seconds;

           if (--timer < 0) {
               timer = duration;
           }
       }, 1000);
   }
   timerButton.onclick = function () {
       var fortyFiveSeconds = 45
           display = document.querySelector('#time');
       startTimer(fortyFiveSeconds, display);
   };
}

function showAbout(event){
  const mainSpace = document.querySelector("#main")
  mainSpace.innerHTML = ""
  mainSpace.innerHTML = `<div> <img src= "https://steamusercontent-a.akamaihd.net/ugc/912421910650108756/899260621E85B907BFE64760D7CD36E9F8007C60/">
  </div>`
}

///// FETCH THE DANG WORDS
const catsURL =  'http://localhost:3000/api/v1/categories'
function getWords(id){
  return fetch(catsURL + `/${id}`)
  .then(response => response.json())
}
