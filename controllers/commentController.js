const { Comments, Audio, User } = require('../models/db'); // Импорт моделей

// Получить все комментарии для подкаста по его ID
const getCommentsByAudioId = async (req, res) => {
    const { id } = req.params;
    try {
      // Получаем комментарии для конкретного подкаста с данными о пользователе
      const comments = await Comments.findAll({
        where: { audioId: id },
        include: [
          {
            model: Audio,
            attributes: ['id'], // Например, возвращаем только id подкаста
          },
          {
            model: User,
            attributes: ['username'], // Включаем username автора комментария
          },
        ],
        order: [['createdAt', 'DESC']], // Сортировка по времени создания
      });
  
      // Возвращаем комментарии с username автора
      const commentsWithUsernames = comments.map(comment => ({
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        username: comment.User ? comment.User.username : 'Unknown user', // Получаем username или указываем 'Unknown user'
      }));
  
      res.status(200).json(comments);
    } catch (error) {
      console.error("Ошибка при получении комментариев:", error);
      res.status(500).json({ message: 'Ошибка при получении комментариев' });
    }
  };

// Добавить новый комментарий
const addComment = async (req, res) => {
    const { audioId, username, text } = req.body;
    try {
      // Получаем email пользователя по username
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      const commentorEmail = user.email; // Получаем email пользователя
  
      // Создаем новый комментарий
      const newComment = await Comments.create({
        commentorEmail,
        audioId,
        text,
      });
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
      res.status(500).json({ message: 'Ошибка при добавлении комментария' });
    }
  };

module.exports = {
  getCommentsByAudioId,
  addComment,
};
