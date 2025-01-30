const express = require('express');
const registerUser = require('../controllers/user/registerUser');
const getAllUser = require('../controllers/user/getAllUser');
const updateUser = require('../controllers/user/updateUser');
const deleteUser = require('../controllers/user/deleteUser');
const signinUser = require('../controllers/user/signinUser');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Define user-related routes
router.post('/users/register', registerUser);
router.post('/users/signin', signinUser);
router.get('/users/getAll', authenticateToken, getAllUser);
router.patch('/users/update/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

module.exports = router;