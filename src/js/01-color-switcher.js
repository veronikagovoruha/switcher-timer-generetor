function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId;

function startPaintBckg() {
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function stopPaintBckg() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}

startBtn.addEventListener('click', startPaintBckg);
stopBtn.addEventListener('click', stopPaintBckg);
