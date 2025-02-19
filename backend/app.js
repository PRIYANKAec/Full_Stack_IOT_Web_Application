const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const main = require('./config/database');
const attachSocketIO = require('./utils/attachSocketIO');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("execution test")
app.use(attachSocketIO);

// Database connection
const db_test = main();

// Routes
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', sensorRoutes);
console.log("execution test1")

module.exports = app;