let isRunning = false;
let timeLeft; // Time will be set based on user input
let timerInterval;
let restInterval; // Rest timer interval
let restTimeLeft = 0; // Variable for the rest time left

const timeDisplay = document.getElementById("time-display");
const startStopButton = document.getElementById("start-stop");
const message = document.getElementById("message");
const alarmSound = document.getElementById("alarm-sound"); // Get the audio element
const customTimeInput = document.getElementById("custom-time"); // Get the input field for custom time
const customTimeInputContainer = document.getElementById("custom-time-container"); // Container for the custom time input
const gifPrompt = document.getElementById("gif-prompt"); // The GIF element to show when custom timer finishes

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

function showGifPrompt() {
    // Display the GIF for 3 seconds
    gifPrompt.style.display = "block"; 
    setTimeout(() => {
        gifPrompt.style.display = "none"; // Hide the GIF after 3 seconds
    }, 3000);
}

function startPomodoroTimer() {
    // Set timeLeft based on the input (in minutes)
    timeLeft = parseInt(customTimeInput.value) * 60; // Convert minutes to seconds
    
    if (timeLeft <= 0) {
        message.textContent = "Please enter a valid time!";
        return;
    }

    isRunning = true;
    startStopButton.textContent = "Stop";
    message.textContent = "Focus, you got this!";

    // Hide custom time input when Pomodoro timer starts
    customTimeInputContainer.style.display = 'none';

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);  // Clear the Pomodoro timer when it finishes
            alarmSound.play(); // Play the sound when the timer reaches 0
            message.textContent = "Time's up! Take a break.";
            
            // Show the GIF prompt only after the custom timer ends
            showGifPrompt();

            // Show rest options after Pomodoro ends
            showRestOptions();
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
            
            // After rest time ends, show the custom timer input again
            customTimeInputContainer.style.display = 'block';
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
    // Reset the Pomodoro timer to the user's input value
    timeLeft = parseInt(customTimeInput.value) * 60;  // Reset to user-defined time
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
