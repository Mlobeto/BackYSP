const {Router} = require("express");

const videosRouter = require("./videosRouter");
const playlistsRouter = require('./playlistsRouter')

const mainRouter = Router();


mainRouter.use('/videos', videosRouter)
mainRouter.use('/listas', playlistsRouter)

module.exports = mainRouter;

