const { Router } = require("express");
const playlistsRouter = Router()
const { getPlaylistsHandler, getPlaylistByIdHandler,  } = require('../handlers/playlistsHandler');



playlistsRouter.get("/", getPlaylistsHandler); 
playlistsRouter.get("/:id", getPlaylistByIdHandler)

module.exports = playlistsRouter;
