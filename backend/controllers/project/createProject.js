const ProjectModel = require("../../models/projectModel");
const UserModel = require("../../models/userModel");
const { formatResponse } = require("../../utils/helper");
const Joi = require('joi');

const createProject = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        microcontroller: Joi.string().required(),
        userId: Joi.number().integer().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    try {   
        // Check if user exists
        const userExists = await UserModel.findById(value.userId);
        if (!userExists) {
            return res.status(404).json(formatResponse('error', 'User not found'));
        }

        // Check if project with the same name exists
        const projectExist = await ProjectModel.findProjectByName(value.name);
        if(projectExist) {
            return res.status(409).json(formatResponse('error', 'Project with the same name already'))
        }

        const project = await ProjectModel.createProject(value);
        res.status(201).json(formatResponse('success', 'Project created successfully', project));
    } catch (error) {
        const errorMessage = error.message.includes('prisma.project.create')
            ? 'Invalid data provided for project creation'
            : error.message;
        res.status(500).json(formatResponse('error', 'Internal Server Error', errorMessage));
    }
}

module.exports = createProject;