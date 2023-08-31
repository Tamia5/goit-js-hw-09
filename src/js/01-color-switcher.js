const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let timerId = null;
stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', startColorSwitcher);
stopBtnEl.addEventListener('click', stopColorSwitcher);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
function startColorSwitcher() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
}
function stopColorSwitcher() {
    clearInterval(timerId);
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
}