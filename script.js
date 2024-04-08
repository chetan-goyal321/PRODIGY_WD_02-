let timer; // To hold the setInterval instance
let startTime; // To store the start time of the stopwatch
let elapsedTime = 0; // Time elapsed since start in milliseconds

function formatTime(ms) {
    const date = new Date(ms);
    return (
        ('0' + date.getUTCHours()).slice(-2) + ':' +
        ('0' + date.getUTCMinutes()).slice(-2) + ':' +
        ('0' + date.getUTCSeconds()).slice(-2) + '.' +
        ('00' + date.getUTCMilliseconds()).slice(-3)
    );
}

function displayTime() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startPause() {
    if (!timer) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            displayTime();
        }, 10);
        document.getElementById('startPause').textContent = 'Pause';
    } else {
        clearInterval(timer);
        timer = null;
        document.getElementById('startPause').textContent = 'Resume';
    }
}

function reset() {
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    displayTime();
    document.getElementById('startPause').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (timer) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        document.getElementById('laps').appendChild(lapItem);
    }
}
