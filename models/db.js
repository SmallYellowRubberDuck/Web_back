const sequelize = require('../config/sequelize.config');
const User = require('./user');
const Audio = require('./audio');
const Video = require('./video');
const Comments = require('./comments');

Audio.belongsTo(User, { foreignKey: "authorEmail", targetKey: "email" });
Audio.hasMany(Comments, { foreignKey: 'audioId' });
Comments.belongsTo(Audio, { foreignKey: 'audioId' });
Comments.belongsTo(User, { foreignKey: 'commentorEmail', targetKey: 'email' });
User.hasMany(Comments, { foreignKey: 'commentorEmail', sourceKey: 'email' });

module.exports = { Audio, User };
module.exports = {sequelize, User, Audio, Video, Comments};