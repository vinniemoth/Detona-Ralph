const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    lives: document.querySelector('#lives'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    livesLeft: 3,
    currentTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countdownTimerId: setInterval(countdown, 1000),
  },
};

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
  gameOver();
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        playSound();
        state.values.result += 100;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
      } else {
        alert('Você perdeu uma vida!');
        state.values.livesLeft--;
        state.view.lives.textContent = state.values.livesLeft;
      }
    });
  });
}

// function checkLives() {
//   if (state.values.livesLeft <= 0) {
//     clearInterval(state.actions.countdownTimerId);
//     clearInterval(state.actions.timerId);
//     alert('Game Over! O seu resultado foi ' + state.values.result);
//     init();
//   }
// }

function gameOver() {
  if (state.values.currentTime <= 0 || state.values.livesLeft <= 0) {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countdownTimerId);
    alert('Game Over! O seu resultado foi ' + state.values.result);
  }
}

function playSound() {
  let audio = new Audio('./src/audios/hit.m4a');
  audio.volume = 0.1;
  audio.play();
}

function countdown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
}

function init() {
  addListenerHitbox();
}

init();
