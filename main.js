document.addEventListener('DOMContentLoaded', () => {
  
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  let audio = document.getElementsByClassName("myAudio")[0]
  
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    '#d70f37',
    '#109bd7',
    '#ffc729',
    '#c528a6',
    '#83d718'
  ]


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
  
  
  const allFigures = [figure0, figure1, figure2, figure3, figure4]

  let currentPosition = 4
  let currentRotation = 0

  console.log(allFigures[0][0])


  let random = Math.floor(Math.random()*allFigures.length)
  let current = allFigures[random][currentRotation]


  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('figure')
      squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }


  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('figure')
      squares[currentPosition + index].style.backgroundColor = ''

    })
  }


  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown(moveDown())
    }
  }
  document.addEventListener('keyup', control)

  function playAudio() {
    audio.play();
}


  function moveDown() {
    undraw()
    currentPosition += 10
    draw()
    freeze()
  }


  function freeze() {
    if(current.some(index => squares[currentPosition + index + 10].classList.contains('full'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('full'))
      //start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * allFigures.length)
      current = allFigures[random][currentRotation]
      currentPosition = 4
      draw()
      addScore()
      gameOver()
    }
  }


  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % 10 === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('full'))) {
      currentPosition +=1
    }
    draw()
  }


  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % 10 === 10 -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('full'))) {
      currentPosition -=1
    }
    draw()
  }


  function isAtRight() {
    return current.some(index=> (currentPosition + index + 1) % 10 === 0)  
  }
  
  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % 10 === 0)
  }
  
  function checkRotatedPosition(P){
    P = P || currentPosition    
    if ((P+1) % 10 < 4) {       
      if (isAtRight()){         
        currentPosition += 1  
        checkRotatedPosition(P) 
        }
    }
    else if (P % 10 > 5) {
      if (isAtLeft()){
        currentPosition -= 1
      checkRotatedPosition(P)
      }
    }
  }
  

  function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) { 
      currentRotation = 0
    }
    current = allFigures[random][currentRotation]
    checkRotatedPosition()
    draw()
  }





  startBtn.addEventListener('click', () => {
    playAudio() 
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*allFigures.length)

    }
  })


  function addScore() {
    for (let i = 0; i < 199; i +=10) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('full'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('full')
          squares[index].classList.remove('figure')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, 10)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('full'))) {
      scoreDisplay.innerHTML = 'Game Over'
      clearInterval(timerId)
    }
  }

})



