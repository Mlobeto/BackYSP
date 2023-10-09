const axios = require('axios');

const API_KEY = process.env.API_KEY;

const searchVideosByKeyword = async (keyword, channelId, maxResults = 20, pageToken = '') => {
  try {
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: keyword,
        channelId: channelId,
        maxResults: maxResults,
        pageToken: pageToken, // Agrega el token de página
        key: API_KEY,
      },
    });

    return {
      videos: response.data.items,
      nextPageToken: response.data.nextPageToken, // Token de página para obtener más resultados
      totalResults: response.data.pageInfo.totalResults,
    };
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