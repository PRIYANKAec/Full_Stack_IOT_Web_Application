const User = require("../../models/userModel");
const { formatResponse } = require("../../utils/helper");


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            return res.status(400).json(formatResponse('error', 'Validation Error', 'Invalid user ID'));
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(formatResponse("error", "User not found"));
        }
        await User.deleteUser(userId);
        return res.status(200).json(formatResponse("success", "User deleted successfully"));
    } catch (error) {
        return res.status(500).json(formatResponse("error", "Internal Server Error", error.message));
    }
}

module.exports = deleteUser;