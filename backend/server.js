//test commit

const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const cors = require('cors');
const app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.json());

app.get('/sensor', (req, res) => {
    const { device_id, temp, humidity } = req.query;

    const sensorData = {
        device_id: device_id,
        temp: temp,
        humidity: humidity
    };

    let workbook;
    let worksheet;
    const filePath = 'sensorData.xlsx';

    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
        worksheet = workbook.Sheets[workbook.SheetNames[0]];
    } else {
        workbook = xlsx.utils.book_new();
        worksheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    }

    const data = xlsx.utils.sheet_to_json(worksheet);
    data.push(sensorData);
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

    xlsx.writeFile(workbook, filePath);

    res.send({
        message: 'Data received successfully',
        ...sensorData
    });
});

app.post('/sensor', (req, res) => {
    const filePath = 'sensorData.xlsx';

    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: 'No file found' });
    }

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
        return res.status(404).send({ message: 'No data found' });
    }
    const recentData = data[data.length - 1];
    res.send({
        message: 'Data retrieved successfully',
        ...recentData
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
