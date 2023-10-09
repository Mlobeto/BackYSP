const { google } = require('googleapis');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const youtube = google.youtube({ version: 'v3', auth: API_KEY });
const { filterVideosByTags, searchVideosByKeyword } = require('../controllers/searchByKeyword ');

const getVideosHandler = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const channelId = 'UCDgXHpJkAlDB5sRz6NrEofw';
    const maxResults = 10; // Número de resultados por página, ajusta según necesites
    const pageToken = req.query.pageToken || ''; // Puede recibir el token de página desde la solicitud

    const { videos, nextPageToken, totalResults } = await searchVideosByKeyword(
      keyword,
      channelId,
      maxResults,
      pageToken
    );

    const targetTags = req.query.tags ? req.query.tags.split(',') : [];
    const filteredVideos = filterVideosByTags(videos, targetTags, channelId);

    res.status(200).json({
      videos: filteredVideos,
      nextPageToken: nextPageToken,
      totalResults: totalResults,
    });
  } catch (error) {
    console.error('Error al obtener los videos:', error);
    res.status(500).json({ error: 'Error al obtener los videos' });
  }
};


const getVideoById = async (videoId, channelId) => {
  try {
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId, 
      channelId: channelId,
    });

    const videoData = response.data.items[0];

    
    const video = {
      id: videoData.id,
      title: videoData.snippet.title,
      url: `https://www.youtube.com/watch?v=${videoData.id}`,
      thumbnailUrl: videoData.snippet.thumbnails.default.url,
      tags: videoData.snippet.tags || [], 
    };

    return video;
  } catch (error) {
    console.error('Error al obtener el video:', error);
    throw new Error('Error al obtener video por ID');
  }
};

const getVideosDetailHandler = async (req, res) => {
  try {
    const videoId = req.params.id;
    const channelId = 'UCDgXHpJkAlDB5sRz6NrEofw'; 

    const video = await getVideoById(videoId, channelId);

    res.status(200).json(video);
  } catch (error) {
    console.error('Error al obtener el video por ID:', error);
    res.status(500).json({ error: 'Error al obtener el video por ID' });
  }
};

module.exports = { getVideosHandler, getVideosDetailHandler };
