let startTime;
let timerInterval;
let elapsedTime = 0; // wtf javascript, why


// does sth
function calcElapsedTime() {
    return Date.now() - new Date(startTime).getTime();
}

// fetch elapsed time using API endpoint from server.js line 9
function fetchElapsedTime() {
    fetch('/get-start-time', {
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.startTime) {
                startTime = new Date(data.startTime).getTime();
                let elapsedTime = calcElapsedTime(startTime);
                return elapsedTime;
            } else {
                console.error('Start time not found in response');
            }
        })
        .catch(error => {
            console.error('Error:', error)
        });
}
elapsedTime = fetchElapsedTime();

//set "You started at" time
function setStarted() {
    let datestart = new Date(Date.now() - elapsedTime);
    document.getElementById('starttime').innerHTML = datestart.toLocaleString('sv-SE');
}

// helper to get now - elapsedTime
function getPastDate(millisecondsDiff) {
    let currentTime = Date.now();
    let pastDate = new Date(currentTime - millisecondsDiff);
    return pastDate;
}
// format timer
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
function startTimer(elapsedTime) {
    clearInterval(timerInterval);
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = calcElapsedTime(startTime);
        document.getElementById("timer").innerHTML = timeToString(elapsedTime);
    }, 1000);
}

startTimer(elapsedTime);

// reset
document.getElementById("resetButton").addEventListener("click", function() {
    document.getElementById("timer").innerHTML = "Resetting timer...";

    elapsedTime = 0;
    startTimer();
    document.getElementById("starttime").innerHTML = "Resetting...";
    datestart = new Date(Date.now()).toLocaleString('sv-SE');
    setStarted();
    console.log(getPastDate(elapsedTime))
    // save new time to server
    fetch('/save-start-time', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ elapsedTime:  getPastDate(elapsedTime)})
    });
});

// execute
document.addEventListener('DOMContentLoaded', startTimer(elapsedTime));
document.addEventListener('DOMContentLoaded', setStarted);