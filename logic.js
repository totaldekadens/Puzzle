const puzzle = document.querySelector(".puzzle")
const image = document.querySelector(".image")
const container1 = document.querySelector(".container")
const main = document.getElementsByTagName("main")[0]
const form = document.getElementsByTagName("form")[0]
const answerButton = document.querySelector(".answerButton")
const answer = document.querySelector(".answer")
let clickAmount = document.createElement("div")
let tell = document.createElement("h3")
let picture = document.createElement("img")
let next = document.createElement("div")
let click = 9
let trial = 2 
let y

sessionStorage.setItem('click', click);

let listOfCeleb = [
  {
  fullName: "Jennifer Lopez",
  alt2: "jennifer lopez",
  alt3: "Jennifer lopez",
  alt4: "JLo",
  image: "image1.jpg",
  hint: "Actor and an artist"
},{
  fullName: "Alexander Skarsgård",
  alt2: "alexander skarsgård",
  alt3: "Alexander Skarsgard",
  alt4: "Alexander skarsgård",
  image: "image2.jpg",
  hint: "True Blood"
},{
  fullName: "Lionel Messi",
  alt2: "lionel messi",
  alt3: "Messi",
  alt4: "Lionel messi",
  image: "image3.jpg",
  hint: "Soccer player"
}

]

function onLoad(){
  addContent();
  ifCeleb();
}




function addContent() {

  var y = localStorage.getItem('celebId')

  if(!y) {
    y = 0
  }


  picture.src = "./assets/" + listOfCeleb[y].image
  image.appendChild(picture)

  let correct = document.createElement("div")
  main.appendChild(correct)
  correct.innerText = "Perfect!"
  correct.classList.add("none")
  correct.classList.add("correct")

  let wrong = document.createElement("div")
  main.appendChild(wrong)
  wrong.innerText = "Try again!"
  wrong.classList.add("none")
  wrong.classList.add("wrong")

  let next = document.createElement("div")
  container1.appendChild(next)
  next.innerText = "Next"
  next.classList.add("none")
  next.classList.add("next")

  let restart = document.createElement("div")
  container1.appendChild(restart)
  restart.innerText = "Good job! That was it :)"
  restart.classList.add("none")
  restart.classList.add("restart")

  let hint = document.createElement("div")
  main.appendChild(hint)
  hint.classList.add("none")
  hint.classList.add("hint")

  clickAmount.classList.add("clickAmount")
  main.append(clickAmount)
  main.appendChild(tell)

  tell.innerText = "You have "+ trial +" attempt(s) left"


  for(let i = 1 ; i < 100; i++){

    let bit = "bit"+i 

    let square = document.createElement("div")
    square.classList.add("square")
    square.classList.add(bit)
    puzzle.appendChild(square)

    let hejsan = document.querySelector(".bit"+i)


    hejsan.addEventListener("click", () => {

      if(!hejsan.classList.contains("hide")){

        hejsan.classList.add("hide")

        click = click - 1

        sessionStorage.setItem('click', click);

        if(click == 0) {

          puzzle.classList.add("pointerEvent")

        }
        amountOfClicks();
      }
    })
  }
}



function amountOfClicks() {

  let clickbate = sessionStorage.getItem('click'); 
  
  clickAmount.innerText = "You have " + clickbate + " click(s) left"
  
}

function ifCeleb() {

  answerButton.addEventListener("click", ()=> {

    var id = localStorage.getItem('celebId')

    if(!id) {
      id = 0
    }
  
    let result = document.getElementsByTagName("input")[0].value

    if(result == listOfCeleb[id].fullName || result == listOfCeleb[id].alt2 || result == listOfCeleb[id].alt3 || result == listOfCeleb[id].alt4) {

      document.querySelector(".hint").classList.add("none")

      setTimeout(correctAnimation,3000)

      document.querySelector(".correct").classList.remove("none")

      puzzle.classList.add("none")
      
      id = Number(id)

      y = id + 1

      localStorage.setItem('celebId', Number(y));

      var id = JSON.parse(localStorage.getItem('celebId'))

      answer.classList.add("none")
      clickAmount.classList.add("none")
      tell.classList.add("none")

      

      if(listOfCeleb.length > y) {

        let next = document.querySelector(".next")
        next.classList.remove("none")
        next.addEventListener("click", () => {
          reload();
          newCeleb();
  
        })
      } else {

        y = 0

        localStorage.setItem('celebId', y);

        document.querySelector(".restart").classList.remove("none")
        
        document.querySelector(".restart").addEventListener("click", () => {
          reload();
        })

      }

    } else {

      trial = trial - 1

      tell.innerText = "You have "+ trial +" attempt(s) left"
      
      setTimeout(wrongAnimation,2000)

      document.querySelector(".wrong").classList.remove("none")

      if(trial == 0) {

        let end = document.createElement("div")
        end.classList.add("end")
        end.innerText = "GAME OVER"
        main.appendChild(end)

        y = 0 

        localStorage.setItem('celebId', y)

        let again = document.createElement("div")
        again.classList.add("again")
        again.innerText = "Try again"
        again.addEventListener("click", reload)
        end.appendChild(again)

      } else if(trial == 1) {
        
        document.querySelector(".hint").classList.remove("none")
        document.querySelector(".hint").innerText = "HINT: " + listOfCeleb[id].hint

      }
    } 
  })
}


function correctAnimation() {
  document.querySelector(".correct").classList.add("none")
}

function wrongAnimation() {
document.querySelector(".wrong").classList.add("none")
}


function newCeleb() {

  next.classList.add("none")
  answer.classList.remove("none")
  clickAmount.classList.remove("none")
  tell.classList.remove("none")
  puzzle.classList.remove("none")

  var y = localStorage.getItem('celebId')
  
  picture.src = "./assets/" + listOfCeleb[y].image

  ifCeleb();
} 


function reload() {
  location.reload();
}

window.addEventListener("load", onLoad)