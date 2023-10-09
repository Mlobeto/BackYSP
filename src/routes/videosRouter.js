const { Router } = require("express");
const videosRouter = Router();
const {getVideosHandler, getVideosDetailHandler } = require ('../handlers/videosHandlers');

videosRouter.get("/:id", getVideosDetailHandler);
videosRouter.get("/", getVideosHandler);

module.exports = videosRouter