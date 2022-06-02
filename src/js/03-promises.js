import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

formEl.addEventListener('submit', sumbmitForm);

function collectInputs(form) {
  const inputObj = {};
  for (let input of form.elements) {
    if (input.getAttribute('name')) {
      inputObj[input.getAttribute('name')] = parseInt(input.value);
    }
  }
  return inputObj;
}

function sumbmitForm(event) {
  event.preventDefault();
  const inputValues = collectInputs(event.target);
  let delay = inputValues['delay'];
  for (let i = 1; i <= inputValues['amount']; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += inputValues['step'];
  }
}
