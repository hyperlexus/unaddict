let startTime;
let timerInterval;
let elapsedTime = 0; // wtf javascript, why


// helper to calculate the elapsed time since the JSON Date in ms
function calcElapsedTime(startTime) {
    return Date.now() - new Date(startTime).getTime();
}

// helper to get date of (now - elapsedTime)
function getPastDate(millisecondsDiff) {
    let currentTime = Date.now();
    let pastDate = new Date(currentTime - millisecondsDiff);
    return pastDate;
}

// helper to format timer
function timeToString(time) {
    let dY = time / 31449600000;
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

// set "You started at" time
function setStarted() {
    let datestart = new Date(startTime);
    document.getElementById('starttime').innerHTML = datestart.toLocaleString('sv-SE');
}

// start
function startTimer(elapsedTime) {
    clearInterval(timerInterval);
    timerInterval = setInterval(function printTime() {
        elapsedTime = calcElapsedTime(startTime);
        document.getElementById("timer").innerHTML = timeToString(elapsedTime);
    }, 1000);
    startTime = Date.now() - elapsedTime;
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
                console.log(elapsedTime);
                return elapsedTime;
                // setStarted();
            } else {
                console.error('Start time not found in response');
            }
        })
        .catch(error => {
            console.error('Error:', error)
        });
}



// fetch elapsed time from timeData.txt on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchElapsedTime();
    setStarted(elapsedTime);
    startTimer(elapsedTime);
});

startTimer(elapsedTime);

// reset
document.getElementById("resetButton").addEventListener("click", function() {
    let currentTime = new Date().toISOString(); // Get current time as ISO string

    fetch('/save-start-time', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ startTime: currentTime }) // Send current time as startTime
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            startTime = new Date(currentTime).getTime(); // Update startTime
            elapsedTime = 0; // Reset elapsedTime
            startTimer(elapsedTime); // Restart the timer
            document.getElementById("starttime").innerHTML = new Date(currentTime).toLocaleString('sv-SE');
        })
        .catch(error => console.error('Error:', error));

    document.getElementById("timer").innerHTML = "Resetting timer...";
});