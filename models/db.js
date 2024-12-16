const sequelize = require('../config/sequelize.config');
const User = require('./user');
const Audio = require('./audio');
const Video = require('./video');
module.exports = {sequelize, User, Audio, Video};