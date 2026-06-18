const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/stats', auth.protect, auth.admin, adminController.getStats);
router.get('/users', auth.protect, auth.admin, adminController.getUsers);

module.exports = router;
