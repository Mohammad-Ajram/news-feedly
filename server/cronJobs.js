const News = require("./models/news");
const axios = require("axios")

exports.saveNewsToDb = () => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=in&from=${new Date().toISOString().split('T')[0]}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    )
    .then((response) => {
      News.insertMany(response.data.articles)
        .then(() => console.log("News Saved"))
        .catch((err) => console.log(err));
    })
    .catch((error) => console.log("Error to fetch data\n"));
};
