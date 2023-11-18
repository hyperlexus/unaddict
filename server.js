const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve your front-end files

// Endpoint to get the start time
app.get('/get-start-time', (req, res) => {
    fs.readFile('timeData.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        try {
            //parse as json
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).send('Error parsing JSON');
        }
    });
});

// Endpoint to save the start time
app.post('/save-start-time', (req, res) => {
    const startTime = req.body.startTime;
    if (!startTime) {
        res.status(400).send('No start time provided');
        return;
    }

    fs.writeFile('timeData.txt', JSON.stringify({ startTime: startTime }), 'utf8', err => {
        if (err) {
            res.status(500).send('Error writing file');
            return;
        }
        res.send('Start time updated');
    });
});


app.listen(3000, () => console.log('running on port 3000'));
