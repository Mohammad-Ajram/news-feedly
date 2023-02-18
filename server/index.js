const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();
const {saveNewsToDb} = require("./cronJobs");
const newsRouter = require('./routes/news');

// schedule tasks to be run on the server that wiil run everyday
cron.schedule("0 0 * * *",  () => {
    saveNewsToDb();
});

// db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', newsRouter);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
