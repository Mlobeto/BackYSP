const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getPlaylistsHandler = async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        channelId: 'UCDgXHpJkAlDB5sRz6NrEofw',
        maxResults: 33,
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
     
      res.status(404).json({ error: 'No se encontró ninguna lista de reproducción con ese ID.' });
    } else {
      
      const playlistData = response.data.items[0];
      res.status(200).json(playlistData);
    }
  } catch (error) {
    console.error('Error al obtener la lista de reproducción por ID:', error);
    res.status(500).json({ error: 'Error al obtener la lista de reproducción por ID.' });
  }
};

const getPlaylistItemsHandler = async (req, res) => {
  const playlistId = req.params.id;
  const maxResults = 50; // El máximo permitido por la API de YouTube
  
  try {
    let nextPageToken = null;
    let allPlaylistItems = [];

    do {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          playlistId: playlistId,
          maxResults: maxResults,
          key: API_KEY,
          pageToken: nextPageToken,
        },
      });

      const playlistItemsData = response.data.items;

      if (playlistItemsData.length > 0) {
        allPlaylistItems = allPlaylistItems.concat(playlistItemsData);
        nextPageToken = response.data.nextPageToken;
      } else {
        nextPageToken = null;
      }

    } while (nextPageToken);

    if (allPlaylistItems.length === 0) {
      res.status(404).json({ error: 'No se encontró ningún video en esa lista de reproducción.' });
    } else {
      res.status(200).json(allPlaylistItems);
    }
  } catch (error) {
    console.error('Error al obtener los videos de la lista de reproducción:', error);
    res.status(500).json({ error: 'Error al obtener los videos de la lista de reproducción' });
  }
};

module.exports = { getPlaylistsHandler, getPlaylistByIdHandler, getPlaylistItemsHandler };



