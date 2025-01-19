// routes/comments.js
const express = require('express');
const router = express.Router();
const { getCommentsByAudioId, addComment } = require('../controllers/commentController');

// Получить все комментарии для конкретного подкаста
router.get('/:id', getCommentsByAudioId);

// Добавить новый комментарий
router.post('/post', addComment);

module.exports = router;
