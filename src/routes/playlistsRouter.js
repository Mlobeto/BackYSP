// playlistsRouter.js
const { Router } = require("express");
const playlistsRouter = Router();
const { getPlaylistsHandler, getPlaylistByIdHandler, getPlaylistItemsHandler } = require('../handlers/playlistsHandler');

playlistsRouter.get("/", getPlaylistsHandler); 
playlistsRouter.get("/:id", getPlaylistByIdHandler);
playlistsRouter.get("/:id/videos", getPlaylistItemsHandler);

module.exports = playlistsRouter;

