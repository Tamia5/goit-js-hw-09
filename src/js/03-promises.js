import Notiflix from "notiflix";

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const result = {position, delay}
      if (shouldResolve) {
        // Fulfill
        resolve(result) 
       } else {
        // Reject
        reject(result)
        }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);
  formEl.reset();

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay) // 
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`); // 
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`); // 
    });

    delay += step;
  }
}