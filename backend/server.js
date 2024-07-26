const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

let sensorData = {};

app.get('/sensor', (req, res) => {
    const { device_id, temp, humidity } = req.query;

    sensorData = {
        device_id: device_id,
        temp: temp,
        humidity: humidity
    };

    res.send({
        message: 'Data received successfully',
        ...sensorData
    });
});

app.post('/sensor', (req, res) => {
    res.send({
        message: 'Data get successfully',
        device_id: sensorData.device_id,
        temp: sensorData.temp,
        humidity: sensorData.humidity
});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
