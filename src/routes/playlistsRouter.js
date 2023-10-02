const { Router } = require("express");
const playlistsRouter = Router()
const { getPlaylistsHandler, getPlaylistByIdHandler,  } = require('../handlers/playlistsHandler');



playlistsRouter.get("/", getPlaylistsHandler); // Utiliza directamente la función getPlaylists
playlistsRouter.get("/:id", getPlaylistByIdHandler)

module.exports = playlistsRouter;
