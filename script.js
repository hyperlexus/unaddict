let startTime;
let elapsedTime = 8869420;
let timerInterval;

function youStarted(time) {
    document.addEventListener('DOMContentLoaded', (event) => {
        // Example: Change the text dynamically
        document.getElementById('starttime').textContent = 'nigger';
    })
}
youStarted(elapsedTime);

// update the timer display
function timeToString(time) {
    let dY = time / 31536000000;
    let y = Math.floor(dY);

    let dW = (dY - y) * 52;
    let w = Math.floor(dW);

    let dD = (dW - w) * 7;
    let d = Math.floor(dD);

    let dH = (dD - d) * 24;
    let h = Math.floor(dH);

    let dM = (dH - h) * 60;
    let m = Math.floor(dM);

    let dS = (dM - m) * 60;
    let s = Math.floor(dS);

    let fY = y.toString().padStart(4, "0");
    let fW = w.toString().padStart(2, "0");
    let fD = d.toString().padStart(1, "0");
    let fH = h.toString().padStart(2, "0");
    let fM = m.toString().padStart(2, "0");
    let fS = s.toString().padStart(2, "0");

    return `${fY}:${fW}:${fD}:${fH}:${fM}:${fS}`;
}

// start
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = timeToString(elapsedTime);
        console.log(elapsedTime)
    }, 1000);
}

// reset
document.getElementById("resetButton").addEventListener("click", function() {
    clearInterval(timerInterval);
    localStorage.setItem("elapsedTime", 0);
    document.getElementById("timer").innerHTML = "00:00:00";
    elapsedTime = 0;
    startTimer();
});

startTimer();