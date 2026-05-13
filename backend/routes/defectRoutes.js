const express = require('express');
const router = express.Router();
const defectController = require('../controllers/defectController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, defectController.getAllDefects);
router.post('/', authMiddleware, defectController.addDefect);
router.get('/stats', authMiddleware, defectController.getDefectStats);

module.exports = router;
