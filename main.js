const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const startBtn= document.querySelector('#start-button')
let nextRandom = 0
startBtn.onclick= pause
document.addEventListener('keyup',keyboard)
const showGameOver = document.querySelector('#h3')

const figure0 = [
    [1, 11, 21, 2],
    [10, 11, 12, 22],
    [1, 11, 21, 20],
    [10, 20, 21, 22]
  ]

const figure1 = [
    [0,10,11,21],
    [11,12,20,21],
    [0,10,11,21],
    [11,12,20,21]
  ]

const figure2 = [
    [1,10,11,12],
    [1,11,12,21],
    [10,11,12,21],
    [1,10,11,21]
  ]
 const figure3 = [
    [0,1,10,11],
    [0,1,10,11],
    [0,1,10,11],
    [0,1,10,11]
  ]
 const figure4 = [
    [1,11,21,31],
    [10,11,12,13],
    [1,11,21,31],
    [10,11,12,13]
  ]
const allFigures = [figure0,figure1,figure2,figure3,figure4]

let currentPosition = Math.floor(Math.random()*Math.floor(8))
let style = 0

let random = Math.floor(Math.random()*allFigures.length)
let current = allFigures[random][style]


function draw () {
	current.forEach(index => {squares[currentPosition + index].classList.add('figure')})
    
}

function undraw () {
	current.forEach(index => {squares[currentPosition + index].classList.remove('figure')})
}


timerId = setInterval(moveDown,1000)
    draw()

function keyboard(e){
   if(e.which ===37){moveLeft()}
   else if(e.which ===39){moveRight()}
   else if(e.which ===38){rotate()}
   else if(e.which ===40){moveDown(moveDown())}	
}

function moveDown() {
    undraw()
	currentPosition+=10
    draw()
    stop()

}
  function moveLeft() {
    undraw()
    const isLeft = current.some(index => (currentPosition + index) % 10 === 0)

    if(!isLeft) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('full'))) {
      currentPosition +=1
    }
    draw()
  }


function moveRight() {
  undraw()
 const isRight = current.some(index => (currentPosition + index) % 10 === 10 -1)

  if(!isRight) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('full'))) {
      currentPosition -=1
}draw()
}


function pause() {

  if (timerId) {
    clearInterval(timerId)
    timerId = null
 } else { draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*allFigures.length)
 }
}


function stop() {
 if(current.some(index => squares[currentPosition + index + 10].classList.contains('full'))) {
    current.forEach(index => squares[currentPosition + index].classList.add('full'))
    random = nextRandom
    nextRandom = Math.floor(Math.random() * allFigures.length)
    current = allFigures[random][style]
    currentPosition = Math.floor(Math.random()*Math.floor(8))
    draw()
    gameOver()
    }
  }

function rotate() {
  undraw()
   style ++
 if(style === current.length) {style = 0}
    current = allFigures[random][style]
    draw()
  }

  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('full'))) {
      showGameOver.innerHTML = 'Game Over'
      clearInterval(timerId)
    }
  }




