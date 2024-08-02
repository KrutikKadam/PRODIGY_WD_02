let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

const display = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds')
};

function updateDisplay() {
    const time = new Date(elapsedTime);
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');

    display.hours.textContent = hours;
    display.minutes.textContent = minutes;
    display.seconds.textContent = seconds;
    display.milliseconds.textContent = milliseconds;
}

function startStopwatch() {
    if (running) return;

    running = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseStopwatch() {
    if (!running) return;

    running = false;
    clearInterval(timer);
}

function resetStopwatch() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (!running) return;

    const time = new Date(elapsedTime);
    const lapTime = `${time.getUTCHours().toString().padStart(2, '0')}:${time.getUTCMinutes().toString().padStart(2, '0')}:${time.getUTCSeconds().toString().padStart(2, '0')}:${Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0')}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
