let startTime;
let elapsedTime = 0;
let timerInterval;

// Load saved time
window.onload = function() {
    if(localStorage.getItem("elapsedTime")){
        elapsedTime = parseInt(localStorage.getItem("elapsedTime"));
        startTimer();
    }
};

// Update the timer display
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

// Start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = timeToString(elapsedTime);
    }, 1000);
}

// Reset the timer
document.getElementById("resetButton").addEventListener("click", function() {
    clearInterval(timerInterval);
    localStorage.setItem("elapsedTime", 0);
    document.getElementById("timer").innerHTML = "00:00:00";
    elapsedTime = 0;
    startTimer();
});

startTimer();