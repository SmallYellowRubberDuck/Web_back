const {Audio, Video} = require('../models/db');

async function getAudio(filters) {
    const { categories, duration_from, duration_to, page = 1, limit = 10 } = filters;
    const where = {};
    if (categories) {
        where.categories = categories;
    }
    if (duration_from){
        where.duration_from  = duration_from;
    }
    if (duration_to){
        where.duration_to = duration_to;
    }
    const offset = (page - 1) * limit;

    try {
        const audios = await Audio.findAndCountAll({
            where,
            limit,
            offset,
            order: [['updated_at', 'DESC']]
        });
        return audios;
    } catch (err) {
        console.error('Ошибка при получении аудио-подкастов', err);
        throw err;
    }
}
async function getVideo(filters) {
    const { categories, duration_from, duration_to, page = 1, limit = 10 } = filters;
    const where = {};
    if (categories) {
        where.categories = categories;
    }
    if (duration_from){
        where.duration_from  = duration_from;
    }
    if (duration_to){
        where.duration_to = duration_to;
    }
    const offset = (page - 1) * limit;

    try {
        const audios = await Video.findAndCountAll({
            where,
            limit,
            offset,
            order: [['updated_at', 'DESC']]
        });
        return audios;
    } catch (err) {
        console.error('Ошибка при получении видео-подкастов', err);
        throw err;
    }
}
module.exports = { getAudio, getVideo };