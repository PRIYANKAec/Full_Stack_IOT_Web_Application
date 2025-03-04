const SensorModel = require("../../models/sensorModel");
const ProjectModel = require("../../models/projectModel");
const { formatResponse } = require("../../utils/helper");
const Joi = require('joi');

const createSensor = async (req, res) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        unit: Joi.string().required(),
        type: Joi.string().valid('INPUT', 'OUTPUT').required(),
        threshold: Joi.number().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    const { projectId } = req.params;

    try {
        // Check if project exists
        const projectExists = await ProjectModel.findProjectById(parseInt(projectId, 10));
        if (!projectExists) {
            return res.status(404).json(formatResponse('error', 'Project not found'));
        }

        // Check if sensor name already exists within the project
        const sensorExists = await SensorModel.findSensorByNameAndProjectId(value.name, parseInt(projectId, 10));
        if (sensorExists) {
            return res.status(409).json(formatResponse('error', 'Sensor with same name already exist in the project'));
        }

        const sensor = await SensorModel.createSensor({
            name: value.name,
            type: value.type,
            unit: value.unit,
            threshold: value.threshold,
            projectId: parseInt(projectId, 10)
        });
        res.status(201).json(formatResponse('success', 'Sensor created successfully', sensor));
    } catch (error) {
        return res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
}

module.exports = createSensor;