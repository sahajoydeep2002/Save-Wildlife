const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.mongoURI , {useNewUrlParser : true , useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
    name : String,
    Date : String,
    createdAt : {
        type : Date,
        default : Date.now
    },
    dp : String,
    userId : String,
    animalId : String,
    postShort : String,
    postLong : String,
    hashtags : [String],
    gallery : [String]
});

const Post = mongoose.model("post" , postSchema);
module.exports = {Post};