const { io } = require('./socket');
const { fomatResponse } = require('./helper');

const attachSocketIO = (req, res, next) => {
    if (!io) {
        console.error("Socket.io instance is undefined!❌");
        return res.status(500).json(formatResponse('error', 'Bad Request', 'Socket.io not initialized'));
    }
    
    // console.log("Attaching Socket.IO to request✅");
    req.io = io;
    next();
};

module.exports = attachSocketIO;