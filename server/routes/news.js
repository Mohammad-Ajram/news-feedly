var express = require('express');
var router = express.Router();

//controllers
const {getNews} = require("../controllers/news");

/* GET home page. */
router.get('/news', getNews);

module.exports = router;