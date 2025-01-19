const express = require('express');
const { Audio, User } = require('../models/db'); // Импорт модели Audio

const router = express.Router();

router.get("/list", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
      const { rows: audios, count: total } = await Audio.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
          include: [
              {
                  model: User,
                  attributes: ["username"], 
              },
          ],
      });

      const response = audios.map((audio) => ({
          id: audio.id,
          title: audio.title,
          description: audio.description,
          categories: audio.categories,
          url: audio.url,
          duration: audio.duration,
          upload_date: audio.upload_date,
          coverfile: audio.coverfile,
          username: audio.User?.username || "Unknown", 
      }));

      res.status(200).json({
          data: response,
          total,
      });
  } catch (error) {
      console.error("Ошибка при получении списка аудиофайлов:", error);
      res.status(500).json({ error: "Ошибка сервера" });
  }
});
router.get("/cover/:id", async (req, res) => {
  try {
      const { id } = req.params;

      const audio = await Audio.findByPk(id);

      if (!audio || !audio.coverfile) {
          return res.status(404).send("Обложка не найдена");
      }

      const coverPath =  audio.coverfile;
      res.sendFile(coverPath);
  } catch (error) {
    
      console.error("Ошибка при загрузке обложки:", error);
      res.status(500).send("Ошибка сервера");
  }
});

module.exports = router;