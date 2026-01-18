
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
iziToast.show({
    message: 'Please choose a date in the future',
    backgroundColor: '#ef4040',
    messageColor: 'white',
    position: 'topRight'
})}else{
       timer.start();
    startBtn.disabled = false;
  }
  },
};

flatpickr('#datetime-picker', options);

let userSelectedDate = null;

startBtn.addEventListener('click', () => {
    if(userSelectedDate){
   startBtn.disabled = true;
  }
});

class Timer {
  constructor(optionsTimer) {
    this.intervalID = null;
    this.isActive = false;
    this.onTimer = optionsTimer.onTimer;

    this.init();
  }

  init() {
    const ms = this.convertMs(0);
    this.onTimer(ms);
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTimer = userSelectedDate;
    this.isActive = true;
    this.intervalID = setInterval(() => {
      const timeNow = new Date();
      const timesTimer = startTimer - timeNow;

      const time = this.convertMs(timesTimer);

      this.onTimer(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalID);
    this.isActive = false;
    value = this.convertMs(0);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days: String(this.pad(days)), hours:String(this.pad(hours)), minutes:String(this.pad(minutes)), seconds: String(this.pad(seconds))};
  }

  pad(valueTimer) {
    return String(valueTimer).padStart(2, '0');
  }
}

const optionsTimer = {
  onTimer: update,
};

const timer = new Timer(optionsTimer);

function update({ days, hours, minutes, seconds }) {
  daysTimer.textContent = `${days}`;
  hoursTimer.textContent = `${hours}`;
  minutesTimer.textContent = `${minutes}`;
  secondsTimer.textContent = `${seconds}`;
}