const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    source : {
        id : String,
        name : String
    },
    author: String,
    title: {
      type: String,
      text: true,
    },
    description: {
      type: String,
      text: true,
    },
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);