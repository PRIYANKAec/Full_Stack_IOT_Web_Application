const { formatResponse } = require("../utils/helper");
const { verifyToken } = require("../utils/jwtUtils");

module.exports = {
    authenticateToken: (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json(formatResponse('error', 'Unauthorized', 'No token provided'));

        try {
            const user = verifyToken(token);
            req.user = user;
            next();
        } catch (err) {
            return res.status(403).json(formatResponse('error', 'Forbidden', 'Invalid token'));
        }
    },

    checkRole: (roles) => {
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.sendStatus(403);
            }
            next();
        };
    }
};