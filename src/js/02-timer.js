import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    dd: document.querySelector('[data-days]'),
    hh: document.querySelector('[data-hours]'),
    mm: document.querySelector('[data-minutes]'),
    ss: document.querySelector('[data-seconds]'),
};

let intervalID = null;
refs.btnStart.disabled = true;

function convertMs(ms) {
    const ss = 1000;
    const mm = ss * 60;
    const hh = mm * 60;
    const dd = hour * 24;

    const days = Math.floor(ms / dd);
    const hours = Math.floor((ms % dd) / hh);
    const min = Math.floor(((ms % dd) % hh) / mm);
    const seconds = Math.floor((((ms % dd) % hh) % mm) / ss);
    return { days, hours, min, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notify.failure("Please choose a date in the future");
            return;
        } else {
            refs.btnStart.disabled = false;           
        }
        refs.btnStart.addEventListener("click", onButtonClick)
        function onButtonClick() {
            intervalID = setInterval(() => {
                refs.btnStart.disabled = true;
                const timeUnixLeft = selectedDates[0].getTime() - (new Date().getTime());
                const timeLeft = convertMs(timeUnixLeft);

                refs.dd.textContent = addLeadingZero(timeLeft.days);
                refs.hh.textContent = addLeadingZero(timeLeft.hours);
                refs.mm.textContent = addLeadingZero(timeLeft.minutes);
                refs.ss.textContent = addLeadingZero(timeLeft.seconds);

                if (timeLeft.days === 0 &&
                    timeLeft.hours === 0 &&
                    timeLeft.minutes === 0 &&
                    timeLeft.seconds === 0) {
                    clearInterval(intervalID);
                };
            }, 1000
            );
        }
    },
};

flatpickr(refs.input, options);


