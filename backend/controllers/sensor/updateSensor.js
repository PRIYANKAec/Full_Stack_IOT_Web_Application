const SensorModel = require("../../models/sensorModel");
const ProjectModel = require("../../models/projectModel");
const { formatResponse } = require("../../utils/helper");
const Joi = require('joi');

const updateSensor = async (req, res) => {
    const paramsSchema = Joi.object({
        projectId: Joi.number().integer().required(),
        id: Joi.number().integer().required()
    });

    const bodySchema = Joi.object({
        name: Joi.string(),
        type: Joi.string().valid('INPUT', 'OUTPUT')
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

        // Check if Sensor exists
        const sensorExists = await SensorModel.findSensorById(paramsValue.id);
        if (!sensorExists) {
            return res.status(404).json(formatResponse('error', 'Sensor not found'));
        }

        const sensor = await SensorModel.updateSensor(paramsValue.id, bodyValue);
        if (!sensor) {
            return res.status(404).json(formatResponse('error', 'Sensor not found'));
        }
        res.status(200).json(formatResponse('success', 'Sensor updated successfully', sensor));
    } catch (error) {
        res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = updateSensor;