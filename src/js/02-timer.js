import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');

let timerDeadline = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = Date.parse(selectedDates[0]);
    if (selectedDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
      btnEl.disabled = true;
    } else {
      timerDeadline = selectedDate;
      btnEl.disabled = false;
    }
  },
};

const timer = {
  intervalId: null,

  start(rootSelector, deadline) {
    this.intervalId = setInterval(() => {
      const ms = deadline - Date.now();

      if (ms <= 0) {
        this.stop();
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(ms);

      rootSelector.querySelector('[data-days]').textContent = this.pad(days);
      rootSelector.querySelector('[data-hours]').textContent = this.pad(hours);
      rootSelector.querySelector('[data-minutes]').textContent =
        this.pad(minutes);
      rootSelector.querySelector('[data-seconds]').textContent =
        this.pad(seconds);
      1000;
    });
  },

  stop() {
    clearInterval(this.intervalId);
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },

  convertMs(ms) {
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
  },
};

btnEl.addEventListener('click', () => {
  timer.stop();
  timer.start(timerEl, timerDeadline);
});

flatpickr(inputEl, options);
