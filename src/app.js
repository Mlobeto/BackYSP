const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const mainRouter = require("./routes/mainRouter");

const app = express();

app.use(morgan("dev"));

app.use(express.json())
app.use(cors())

app.use(mainRouter);

module.exports = app;
