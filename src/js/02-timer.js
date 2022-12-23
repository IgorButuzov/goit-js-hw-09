import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

refs.startBtn.addEventListener('click', () => startTimer());
refs.startBtn.classList.add('start-btn');
refs.startBtn.setAttribute('disabled', true);

let selectedTime = null;
const CURRENT_DATE = new Date();
let SELECTED_DATE = new Date();
let delta;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < CURRENT_DATE) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      SELECTED_DATE = selectedDates[0];
    }
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}



function startTimer() {
    refs.startBtn.disabled = true;
    refs.dateInput.disabled = true;
    getDeltaTime();
}

function getDeltaTime() {
    timerId = setInterval(() => {
        delta = SELECTED_DATE - Date.now();
        const dateOffset = convertMs(delta);
        
        if (delta <= 0) {
             clearInterval(timerId);
        } else {
            clockView(dateOffset);
        }
        }, 1000);
}

function clockView(dateOffset) {
    refs.days.textContent = dateOffset.days;
    refs.hours.textContent = dateOffset.hours;
    refs.minutes.textContent = dateOffset.minutes;
    refs.seconds.textContent = dateOffset.seconds;
}