const { Prisma } = require('@prisma/client');
const User = require('../../models/userModel');
const { formatResponse } = require('../../utils/helper');
const Joi = require('joi');

const updateUser = async (req, res) => {
    const schema = Joi.object({
        password: Joi.string().min(6)
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        const formattedError = error.details.map(detail => detail.message.replace(/"/g, '')).join(', ');
        return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
    }

    try {
        const { id } = req.params;
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            return res.status(400).json(formatResponse('error', 'Validation Error', 'Invalid user ID'));
        }
        const user = await User.updateUser(userId, value);
        return res.status(200).json(formatResponse('success', 'User updated successfully', user));
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const formattedError = `Unique constraint failed on the field: ${error.meta.target}`;
                return res.status(400).json(formatResponse('error', 'Validation Error', formattedError));
            }
        }
        return res.status(500).json(formatResponse('error', 'Internal Server Error', error.message));
    }
};

module.exports = updateUser;