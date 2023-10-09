const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false } 
);


const VideosModel = require("./models/VideosModel")(sequelize);

const PlaylistModel = require("./models/PlaylistModel")(sequelize);

const {
  Videos,
  Playlist,
} = sequelize.models;












module.exports = {
  conn: sequelize,

  
 
  
  VideosModel,
  
  PlaylistModel,
};
