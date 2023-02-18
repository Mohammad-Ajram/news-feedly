const News = require("../models/news");

exports.getNews = async(req,res) => {
    const {source, search, pageNo = 1, pageSize = 10} = req.query;
    const filter = {$and:[]};
    if(search) filter["$and"].push({ $text : {$search: search} });
    if(source && Array.isArray(source)) {
        filter["$and"].push({"source.name":{$in : source}})
    } else if(source && typeof source === "string") {
        filter["$and"].push({ "source.name" : source });
    }
    const total = await News.find(filter).count();
    const news = await News.find(filter).skip((pageNo - 1) * pageSize).limit(pageSize);
    res.status(200).json({pageNo,pageSize,total,news});
}
