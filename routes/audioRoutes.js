const express = require('express');
const path = require('path');
const { Audio, User } = require('../models/db'); 
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.mp3':
      return 'audio/mpeg';
    case '.wav':
      return 'audio/wav';
    case '.ogg':
      return 'audio/ogg';
    case '.flac':
      return 'audio/flac';
    default:
      return 'application/octet-stream'; 
  }
};


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
router.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('C:/podcasts/audio', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Файл обложки не найден' });
  }

  res.sendFile(filePath);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const audio = await Audio.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['username'], 
        },
      ],});
    if (!audio) {
      return res.status(404).json({ message: 'Аудиофайл не найден' });
    }

    
    const audioData = {
      id: audio.id,
      title: audio.title,
      description: audio.description,
      authorUsername: audio.User.username, 
      categories: audio.categories || [],
      duration: audio.duration,
      url: audio.url, 
      coverFile: path.basename(audio.coverfile), 
    };
    res.status(200).json(audioData);
  } catch (error) {
    console.error('Ошибка при получении информации о подкасте:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/:id/stream', async (req, res) => {
  const { id } = req.params;

  try {
    const audio = await Audio.findByPk(id);
    if (!audio || !fs.existsSync(audio.url)) {
      return res.status(404).json({ message: 'Аудиофайл не найден' });
    }

    const filePath = path.resolve(audio.url);
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': getMimeType(filePath),
      'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error('Ошибка при потоковой загрузке аудио:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/upload', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]), async(req, res) => {
  try {
      const audioFile = req.files['file'] ? req.files['file'][0] : null;
      const coverFile = req.files['cover'] ? req.files['cover'][0] : null;
      if (!audioFile) {
        return res.status(400).json({ message: 'Аудиофайл обязателен для загрузки' });
      }
  
      const { title, description, tags, authorEmail, duration } = req.body;
      const categoriesArray = typeof tags === 'string' 
      ? tags.split(',').map(category => category.trim()) 
      : [];
      console.log('Audio File:', audioFile);
      console.log('Cover File:', coverFile);
      console.log('Title:', title);
      console.log('Description:', description);
      console.log('Tags:', tags);
      console.log('authorEmail:', authorEmail);

      const audioRecord = await Audio.create({
        title: title,
        description: description,
        categories: categoriesArray,
        authorEmail: authorEmail,
        url: audioFile.path,
        duration: duration,
        coverUrl: coverFile ? coverFile.path : "C:\\podcasts\\audio\\cardPhoto.svg"
      });
  

      res.status(200).json({ message: 'Upload successful!' });
  } catch (error) {
      console.error('Error handling upload:', error);
      res.status(500).json({ message: 'Upload failed.', error });
  }
});
module.exports = router;