const { getAudio, getVideo } = reqire('../services/filterService');
async function handleAudioRequest(req, res) {
    const filters = req.query;
    try {
        const audios = await getAudio(filters);
        res.json({
            audios: audios.rows,
            total: audios.count,
            totalPages: Math.ceil(audios.count / filters.limit),
            currentPage: filters.page || 1
        });
    } catch (err) {
        res.status(500).json({error: "Не удалось получить аудио"});
    }
}
async function handleVideoRequest(req, res) {
    const filters = req.query;
    try {
        const audios = await getVideo(filters);
        res.json({
            audios: audios.rows,
            total: audios.count,
            totalPages: Math.ceil(audios.count / filters.limit),
            currentPage: filters.page || 1
        });
    } catch (err) {
        res.status(500).json({error: "Не удалось получить видео"});
    }
}
module.exports = { handleAudioRequest, handleVideoRequest };