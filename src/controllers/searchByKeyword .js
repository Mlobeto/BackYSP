const axios = require('axios');

const API_KEY = process.env.API_KEY;

const searchVideosByKeyword = async (keyword) => {
  try {
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: keyword,
        channelId: 'UCDgXHpJkAlDB5sRz6NrEofw',
        maxResults: 900, // Cambia esto según tus necesidades
        key: API_KEY,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Error al buscar videos por palabra clave:', error);
    throw new Error('Error al buscar videos por palabra clave');
  }
};

const filterVideosByTags = (videos, targetTags) => {
    const filteredVideos = videos.filter((video) => {
      // Verifica si las etiquetas (tags) en la descripción del video coinciden con las etiquetas objetivo
      const videoTags = video.snippet.description.split(',').map(tag => tag.trim().toLowerCase()); // Asumiendo que las etiquetas están separadas por comas
      return targetTags.every((tag) => videoTags.includes(tag.trim().toLowerCase()));
    });
  
    return filteredVideos;
  };
module.exports= {filterVideosByTags, searchVideosByKeyword}