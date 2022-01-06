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
let click = 7
let trial = 2 
let y

sessionStorage.setItem('click', click);

let listOfCeleb = [
  {
  fullName: "Jennifer Lopez",
  alt2: "jennifer lopez",
  alt3: "JLo",
  image: "image1.jpg",
  clicks: 8,
  trials: 2
},{
  fullName: "Gustaf Skarsgård",
  alt2: "gustaf skarsgård",
  alt3: "Gustaf Skarsgard",
  image: "image2.jpg",
  clicks: 7,
  trials: 2
},{
  fullName: "Lionel Messi",
  alt2: "lionel messi",
  alt3: "Messi",
  image: "image3.jpg",
  clicks: 7,
  trials: 2
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

  console.log(y)

  picture.src = "./assets/" + listOfCeleb[y].image
  image.appendChild(picture)

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
  console.log("Kom in i ifCeleb")

  answerButton.addEventListener("click", ()=> {

    var id = localStorage.getItem('celebId')

    if(!id) {
      id = 0
    }
  
    let result = document.getElementsByTagName("input")[0].value

    console.log(result)

    if(result == listOfCeleb[id].fullName || result == listOfCeleb[id].alt2 || result == listOfCeleb[id].alt3) {

      puzzle.classList.add("none")

      alert("Congratulations!")

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

        let restart = document.querySelector(".restart")
        restart.classList.remove("none")

        restart.addEventListener("click", () => {
          reload();
          
        })

      }


    } else {

      console.log("Kom in i ELSE")

      trial = trial - 1

      tell.innerText = "You have "+ trial +" attempt(s) left"

      alert("WROOONG!")

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

      }
    } 
  })
}


 function newCeleb() {

  console.log("Kom in i newCeleb")
  let next = document.querySelector(".next")
  next.classList.add("none")
  answer.classList.remove("none")
  clickAmount.classList.remove("none")
  tell.classList.remove("none")
  var y = localStorage.getItem('celebId')
  puzzle.classList.remove("none")

  picture.src = "./assets/" + listOfCeleb[y].image

  ifCeleb();

} 


function reload() {
  location.reload();
}

window.addEventListener("load", onLoad)