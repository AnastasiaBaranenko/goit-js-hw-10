
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

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate > new Date()){
       startBtn.disabled = false;
    } else {iziToast.show({
    message: 'Please choose a date in the future',
    backgroundColor: '#ef4040',
    messageColor: 'white',
    position: 'topRight'
});
  startBtn.disabled = true;
}
  },
};

flatpickr('#datetime-picker', options);

const input = document.querySelector('#datetime-picker')

startBtn.addEventListener('click', () => {
if (userSelectedDate > new Date()) {
       timer.start();
       startBtn.disabled = true;
    input.disabled = true;
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
    const ms = convertMs(0);
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

      if(timesTimer <= 0){
        this.stop();
this.onTimer(convertMs(0));
        return;
      }
      
      const time = convertMs(timesTimer);

      this.onTimer(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalID);
    this.isActive = false;
    input.disabled = false;
  }

}

const optionsTimer = {
  onTimer: update,
};

const timer = new Timer(optionsTimer);

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return {days:pad(days), hours:pad(hours), minutes:pad(minutes), seconds:pad(seconds)};
}

 function pad(valueTimer){
    return String(valueTimer).padStart(2, '0');
  }

function update({ days, hours, minutes, seconds }) {
  daysTimer.textContent = `${days}`;
  hoursTimer.textContent = `${hours}`;
  minutesTimer.textContent = `${minutes}`;
  secondsTimer.textContent = `${seconds}`;
}