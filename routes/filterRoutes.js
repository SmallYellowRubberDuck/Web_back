const express = require('express');
const router = express.Router();
const { handleAudioRequest, handleVideoRequest } = require('../controllers/filterController');

router.get('/audio', handleAudioRequest);
router.get('/video', handleVideoRequest);

module.exports = router;