const express = require('express');
const path = require('path');
const { Audio } = require('../models/db');  // Импортируем модель Audio
const multer = require('multer');
const fs = require('fs');

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

  const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = 'C:/podcasts/audio';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    })
});

router.post('/upload', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]), (req, res) => {
  try {
      // Доступ к файлам
      const audioFile = req.files['file'] ? req.files['file'][0] : null;
      const coverFile = req.files['cover'] ? req.files['cover'][0] : null;

      // Доступ к полям формы
      const { title, description, tags, username } = req.body;

      console.log('Audio File:', audioFile);
      console.log('Cover File:', coverFile);
      console.log('Title:', title);
      console.log('Description:', description);
      console.log('Tags:', tags);
      console.log('Username:', username);

      // Логика сохранения данных (например, запись в базу данных)
      //TODO

      res.status(200).json({ message: 'Upload successful!' });
  } catch (error) {
      console.error('Error handling upload:', error);
      res.status(500).json({ message: 'Upload failed.', error });
  }
});
module.exports = router;