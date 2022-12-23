import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formFields: document.querySelector('.form'),
};

refs.formFields.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
      })
      .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const objectPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }

    }, delay);
  });
  return objectPromise;
}