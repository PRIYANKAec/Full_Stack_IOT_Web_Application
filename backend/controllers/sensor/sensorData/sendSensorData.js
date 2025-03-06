const SensorModel = require("../../../models/sensorModel");
const ProjectModel = require("../../../models/projectModel");
const { formatResponse } = require("../../../utils/helper");
const Joi = require('joi');
const sendEmail = require('../../../utils/email');

const sendSensorData = async (req, res) => {
    const paramsSchema = Joi.object({
        projectId: Joi.number().integer().required(),
        sensorId: Joi.number().integer().required()
    });

    const bodySchema = Joi.object({
        id: Joi.number().integer().required(),
        value: Joi.number().required()
    });

    const { error: paramsError, value: paramsValue } = paramsSchema.validate(req.params);
    if (paramsError) {
        const formattedError = paramsError.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    const { error: bodyError, value: bodyValue } = bodySchema.validate(req.body);
    if (bodyError) {
        const formattedError = bodyError.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    try {
        // Check if project exists
        const projectExists = await ProjectModel.findProjectById(parseInt(paramsValue.projectId, 10));
        if (!projectExists) {
            return res.status(404).json(formatResponse('error', 'Project not found'));
        }

        // Retrieve user email from project ID
        const userEmail = await ProjectModel.findUserEmailByProjectId(paramsValue.projectId);
        if (!userEmail) {
            return res.status(404).json(formatResponse('error', 'User email not found'));
        }

        // Check if Sensor exists
        const sensor = await SensorModel.findSensorById(paramsValue.sensorId);
        if (!sensor) {
            return res.status(404).json(formatResponse('error', 'Sensor not found'));
        }

        // Check if input type sensor
        if (sensor.type === 'INPUT') {
            if(bodyValue.value !== 0 && bodyValue.value !== 1){
                return res.status(400).json(formatResponse('error', 'Validation Error', 'Value must be 0 or 1 for input type sensor'));
            }
            const sensorData = await SensorModel.createSensorData({
                value: bodyValue.value,
                sensorId: paramsValue.sensorId
            });
            // Emit sensor data via WebSocket
            req.io.emit('sensorData', sensorData);
            res.status(201).json(formatResponse('success', 'Input data change sent successfully', sensorData));
        } 
        else {
            const sensorData = await SensorModel.createSensorData({
                value: bodyValue.value,
                sensorId: paramsValue.sensorId
            });

            // Check thresholds and send email
            if (sensorData.value < sensor.minThreshold || sensorData.value > sensor.maxThreshold) {
                const emailBody = `Sensor ${sensor.name} has a value of ${sensorData.value}, which is out of the threshold range (${sensor.minThreshold} - ${sensor.maxThreshold}).`;
                setTimeout(async () => {
                    await sendEmail(userEmail, 'Sensor Alert', emailBody); // Use the retrieved user email
                }, 15 * 60 * 1000); // 15 minutes in milliseconds
            }

            // Emit sensor data via WebSocket
            req.io.emit('sensorData', sensorData);
            res.status(201).json(formatResponse('success', 'Output Sensor data sent successfully', sensorData));
        }        
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = sendSensorData;