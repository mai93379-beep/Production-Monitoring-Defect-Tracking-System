const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, logController.getAllLogs);
router.post('/', authMiddleware, logController.addLog);

module.exports = router;
