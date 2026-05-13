const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lineController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, lineController.getAllLines);
router.get('/:id', authMiddleware, lineController.getLineById);
router.patch('/:id/status', authMiddleware, lineController.updateLineStatus);

module.exports = router;
