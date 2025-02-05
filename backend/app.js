const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const cors = require('cors');
const main = require('./config/database');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db_test = main()

// Routes
app.use('/api', userRoutes);
app.use('/api', projectRoutes)
app.use('/api', sensorRoutes)

module.exports = app;