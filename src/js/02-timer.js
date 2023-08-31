import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateInputEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const daysFieldEl = document.querySelector('[data-days]');
const hoursFieldEl = document.querySelector('[data-hours]');
const minutesFieldEl = document.querySelector('[data-minutes]');
const secondsFieldEl = document.querySelector('[data-seconds]');

let timerIsStarted = false;
startButtonEl.disabled = true;

const fp = flatpickr(dateInputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const diffDt = selectedDates[0].getTime() - new Date().getTime();
    if (diffDt > 0 && !timerIsStarted) {
      startButtonEl.disabled = false;

      startButtonEl.addEventListener('click', () => {
        startTimer(diffDt);
        timerIsStarted = true;
        startButtonEl.disabled = true;
      });
    } else {
      startButtonEl.disabled = true;
      if (timerIsStarted) {
        Notiflix.Notify.failure('Timer is started');
      } else {
        Notiflix.Notify.failure('Please choose the future time');
      }
    }
  },
});
function startTimer(milSec) {
  let timerId = setInterval(() => {
    if (milSec > 0) {
      printTime(convertMs(milSec));
      milSec -= 1000;
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = (value) => {
  return value.toString().padStart(2, '0');
};

function printTime(t) {
  daysFieldEl.textContent = addLeadingZero(t.days);
  hoursFieldEl .textContent = addLeadingZero(t.hours);
  minutesFieldEl.textContent = addLeadingZero(t.minutes);
  secondsFieldEl.textContent = addLeadingZero(t.seconds);
}