let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes
let timerInterval;
let restInterval; // Rest timer interval
let restTimeLeft = 0; // Variable for the rest time left

const timeDisplay = document.getElementById("time-display");
const startStopButton = document.getElementById("start-stop");
const message = document.getElementById("message");
const alarmSound = document.getElementById("alarm-sound"); // Get the audio element

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
            clearInterval(timerInterval);  // Clear the Pomodoro timer when it finishes
            alarmSound.play(); // Play the sound when the timer reaches 0
            message.textContent = "Time's up! Take a break.";
            
            // Show rest options after Pomodoro ends
            showRestOptions();
            resetTimer(); // Reset the Pomodoro timer
        } else {
            timeLeft--;
            updateTimer();
        }
    }, 1000);
}

function stopPomodoroTimer() {
    isRunning = false;
    startStopButton.textContent = "Start";
    clearInterval(timerInterval);  // Stop the Pomodoro timer
    message.textContent = "Take a deep breath!";
}

function startRestTimer(duration) {
    // Set the rest time based on user's choice (5 or 10 minutes)
    restTimeLeft = duration * 60;
    restInterval = setInterval(() => {
        if (restTimeLeft <= 0) {
            clearInterval(restInterval);  // Clear the rest timer when it finishes
            alarmSound.play(); // Play the sound when the rest timer finishes
            message.textContent = "Rest's over! Time to focus!";
            hideRestOptions();
        } else {
            restTimeLeft--;
            updateRestTimer();
        }
    }, 1000);
}

function showRestOptions() {
    // Display rest time options (5-minute or 10-minute buttons)
    document.getElementById('rest-options').style.display = 'block';
}

function hideRestOptions() {
    // Hide the rest time options after a selection is made or rest timer finishes
    document.getElementById('rest-options').style.display = 'none';
}

function resetTimer() {
    timeLeft = 25 * 60;  // Reset Pomodoro timer to 25 minutes
    updateTimer();
}

startStopButton.addEventListener("click", () => {
    if (isRunning) {
        stopPomodoroTimer();
    } else {
        startPomodoroTimer();
    }
});

// Event listeners for rest time buttons (5-min and 10-min buttons)
document.getElementById('rest-5min').addEventListener("click", () => {
    startRestTimer(5);  // Start a 5-minute rest timer
});

document.getElementById('rest-10min').addEventListener("click", () => {
    startRestTimer(10);  // Start a 10-minute rest timer
});

// Initial display
updateTimer();
