const puzzle = document.querySelector(".puzzle")
const main = document.getElementsByTagName("main")[0]
const form = document.getElementsByTagName("form")[0]
let clickAmount = document.createElement("div")
let tell = document.createElement("h3")
let click = 8
let trial = 2 

sessionStorage.setItem('click', click);



function onLoad(){
  addContent();
  celebrity();
}




function addContent() {

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



function celebrity() {

  const answerButton = document.querySelector(".answerButton")
  answerButton.addEventListener("click", ()=> {

    let result = document.getElementsByTagName("input")[0].value

    if(result == "Lopez" || result == "Jennifer Lopez" || result == "JLo" || result == "jlo" || result == "JLO") {

      puzzle.classList.add("none")

      alert("Congratulations!")

    } else {

      trial = trial - 1

      tell.innerText = "You have "+ trial +" attempt(s) left"

      alert("WROOONG!")

      if(trial == 0) {

        let end = document.createElement("div")
        end.classList.add("end")
        end.innerText = "THE END"
        main.appendChild(end)

        let again = document.createElement("div")
        again.classList.add("again")
        again.innerText = "Start over"
        again.addEventListener("click", reload)
        end.appendChild(again)

      }
    }
  })
}



function reload() {
  location.reload();
}

window.addEventListener("load", onLoad)