const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const createSensor = require('../controllers/sensor/createSensor');
const getSensorById = require('../controllers/sensor/getSensorById');
const getSensorByProjectId = require('../controllers/sensor/getSensorByProjectId');
const getAllSensor = require('../controllers/sensor/getAllSensor');
const updateSensor = require('../controllers/sensor/updateSensor');
const deleteSensor = require('../controllers/sensor/deleteSensor');
const sendSensorData = require('../controllers/sensor/sensorData/sendSensorData');
const deleteSensorData = require('../controllers/sensor/sensorData/deleteSensorData');
const deleteMultipleSensorData = require('../controllers/sensor/sensorData/deleteMultipleSensorData');

const router = express.Router();

// Define user-related routes
router.post('/projects/:projectId/sensor/create/:count', authenticateToken, createSensor);
router.post('/projects/:projectId/sensor/get/:id', authenticateToken, getSensorById);
router.post('/projects/:projectId/sensor/getByProject/:id', authenticateToken, getSensorByProjectId);
router.post('/projects/:projectId/sensor/getAll', authenticateToken, getAllSensor);
router.patch('/projects/:projectId/sensor/update/:id', authenticateToken, updateSensor);
router.delete('/projects/:projectId/sensor/delete/:id', authenticateToken, deleteSensor);

//send sensor data
router.post('/projects/:projectId/sensor/sendData', authenticateToken, sendSensorData);
//delete sensor data
router.delete('/projects/:projectId/sensor/deleteData/:id', authenticateToken, deleteSensorData);
//delete multiple sensor data
router.post('/projects/:projectId/sensor/deleteData/:id', authenticateToken, deleteMultipleSensorData);

module.exports = router;