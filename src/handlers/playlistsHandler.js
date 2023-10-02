const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getPlaylistsHandler = async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        channelId: 'UCDgXHpJkAlDB5sRz6NrEofw',
        maxResults: 10,
        key: API_KEY,
      },
    });

    const playlistsData = response.data.items;

    // Verificar si la respuesta contiene un error
    if (response.data.error) {
      // Manejar el error aquí, por ejemplo, devolver un mensaje personalizado
      console.error('Error en la respuesta de YouTube API:', response.data.error);
      res.status(500).json({ error: 'Error en la respuesta de YouTube API' });
    } else {
      // Si no hay error, responder con los datos de las listas de reproducción
      res.status(200).json(playlistsData);
    }
  } catch (error) {
    console.error('Error al obtener las listas de reproducción:', error);
    res.status(500).json({ error: 'Error al obtener las listas de reproducción' });
  }
};


const getPlaylistByIdHandler = async (req, res) => {
  const playlistId = req.params.id; // Obtener el ID de la lista de reproducción desde los parámetros de la solicitud
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        id: playlistId,
        key: API_KEY,
      },
    });

    if (response.data.items.length === 0) {
      // Si no se encuentra ninguna lista de reproducción con ese ID, devolver un mensaje de error
      res.status(404).json({ error: 'No se encontró ninguna lista de reproducción con ese ID.' });
    } else {
      // Si se encuentra la lista de reproducción, responder con sus datos
      const playlistData = response.data.items[0]; // Obtener la primera lista de reproducción (debería ser solo una)
      res.status(200).json(playlistData);
    }
  } catch (error) {
    console.error('Error al obtener la lista de reproducción por ID:', error);
    res.status(500).json({ error: 'Error al obtener la lista de reproducción por ID.' });
  }
};

module.exports = { getPlaylistsHandler, getPlaylistByIdHandler };


