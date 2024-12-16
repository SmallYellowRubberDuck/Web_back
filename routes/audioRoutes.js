const express = require('express');
const path = require('path');
const { Audio } = require('../models/db');  // Импортируем модель Audio

const router = express.Router();

// Маршрут для получения аудио по ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      // Ищем аудио по id
      const audio = await Audio.findByPk(id);
      if (!audio) {
        return res.status(404).json({ message: 'Аудиофайл не найден' });
      }
      const filePath = audio.url;  // Путь к файлу из базы данных
      // Проверка, существует ли файл, перед отправкой
      if (!filePath || !path.resolve(filePath)) {
        return res.status(404).json({ message: 'Файл не найден на сервере' });
      }
  
      // Отправка файла клиенту
      res.sendFile(path.resolve(filePath), (err) => {
        if (err) {
          console.error('Ошибка при отправке файла:', err);
          res.status(500).send('Ошибка при отправке файла');
        }
      });
    } catch (error) {
      console.error('Ошибка при получении аудио:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

module.exports = router;