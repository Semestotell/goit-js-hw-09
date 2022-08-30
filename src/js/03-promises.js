import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notiflix.Notify.init({
  width: '200px',
  timeout: 2000,});

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const numDelay = Number(delay.value);
  const numStep = Number(step.value);
  const numAmount = Number(amount.value);

    for (let i = 0; i < numAmount; i += 1) {
      createPromise(i + 1, numDelay + i * numStep)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.warning(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
  }
  event.currentTarget.reset();
}

