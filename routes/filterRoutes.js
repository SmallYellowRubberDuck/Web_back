const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {Audio, Video} = require('../models/db');
const { handleAudioRequest, handleVideoRequest } = require('../controllers/filterController');

router.post('/', async (req, res) => {
    const { duration, sortOrder, categories } = req.body;
    const [minDuration, maxDuration] = Array.isArray(duration) ? duration : [0, 0];

    try {
        const audios = await Audio.findAll({
            where: {
                duration: {
                    [Op.between]: [minDuration*60, maxDuration*60], 
                },
                categories: {
                    [Op.contains]: categories, 
                },
            },
            order: [[sortOrder === 'duration' ? 'duration' : 'createdAt', 'DESC']],
        });

        res.status(200).json(audios);
    } catch (error) {
        console.error('Ошибка при фильтрации данных:', error);
        res.status(500).json({ message: 'Ошибка при фильтрации данных' });
    }
});

module.exports = router;
// router.get('/video', handleVideoRequest);

module.exports = router;