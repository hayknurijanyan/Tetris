const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const startBtn= document.querySelector('#start-button')
const scoreDisplay = document.querySelector('#start-button')
const width = 10
startBtn.onclick=moveDown

timerId = setInterval(moveDown,1000)

squares[22].setAttribute('class', 'selected')


-



