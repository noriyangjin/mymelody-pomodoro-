let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes for Pomodoro
let restTimeLeft = 5 * 60; // Default rest time is 5 minutes
let timerInterval;
let restTimerInterval;

const timeDisplay = document.getElementById("time-display");
const startStopButton = document.getElementById("start-stop");
const message = document.getElementById("message");
const alarmSound = document.getElementById("alarm-sound");

const restOptions = document.getElementById("rest-options");  // Rest duration options

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function updateTimer() {
    timeDisplay.textContent = formatTime(timeLeft);
}

function updateRestTimer() {
    timeDisplay.textContent = formatTime(restTimeLeft);
}

function startPomodoroTimer() {
    isRunning = true;
    startStopButton.textContent = "Stop";
    message.textContent = "Focus, you got this!";

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alarmSound.play(); // Play sound when Pomodoro timer ends
            message.textContent = "Time's up! Take a break.";
            setTimeout(() => {
                promptRestDuration(); // Show rest options after sound ends
            }, 500); // Wait for the sound to play before showing options
        } else {
            timeLeft--;
            updateTimer();
        }
    }, 1000);
}

function startRestTimer() {
    restTimerInterval = setInterval(() => {
        if (restTimeLeft <= 0) {
            clearInterval(restTimerInterval);
            alarmSound.play(); // Play sound when rest timer ends
            message.textContent = "Rest time's up! Get ready for the next session.";
            resetTimer(); // Reset the timer or start a new Pomodoro
        } else {
            restTimeLeft--;
            updateRestTimer();
        }
    }, 1000);
}

function promptRestDuration() {
    // Show the rest options for 5 or 10-minute rest
    restOptions.style.display = "block";

    // Handle the 5-minute rest button click
    document.getElementById("five-minute-rest").addEventListener("click", () => {
        restTimeLeft = 5 * 60; // Set 5 minutes rest
        restOptions.style.display = "none"; // Hide rest options
        startRestTimer(); // Start the rest timer
    });

    // Handle the 10-minute rest button click
    document.getElementById("ten-minute-rest").addEventListener("click", () => {
        restTimeLeft = 10 * 60; // Set 10 minutes rest
        restOptions.style.display = "none"; // Hide rest options
        startRestTimer(); // Start the rest timer
    });
}

function stopRestTimer() {
    clearInterval(restTimerInterval);
    alarmSound.pause(); // Stop the sound
    alarmSound.currentTime = 0; // Reset sound position to the start
    message.textContent = "Rest timer paused.";
}

function stopPomodoroTimer() {
    isRunning = false;
    startStopButton.textContent = "Start";
    clearInterval(timerInterval);
    clearInterval(restTimerInterval); // Ensure rest timer is stopped
    alarmSound.pause(); // Stop the sound if it's playing
    alarmSound.currentTime = 0; // Reset sound position to the start
    message.textContent = "Take a deep breath!";
}

function resetTimer() {
    timeLeft = 25 * 60;
    restTimeLeft = 5 * 60; // Reset rest time to 5 minutes
    updateTimer();
}

startStopButton.addEventListener("click", () => {
    if (isRunning) {
        stopPomodoroTimer();
    } else {
        startPomodoroTimer();
    }
});

// Initial display
updateTimer();
