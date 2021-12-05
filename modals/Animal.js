const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.mongoURI , {useNewUrlParser : true , useUnifiedTopology: true});

const animalSchema = new mongoose.Schema({
    cover : String,
    dp : String,
    name: String,
    subClass: String,
    about : String,
    endCat : String,
    num : String,
    vstoryShort : String,
    vstoryLong: String,
    vimg : String,
    Gallery : [String],
    links : [String],
    maps : [String],
    userid : String, 
    subscribers : [String]
});

const Animal = mongoose.model("animal" , animalSchema);
module.exports = {Animal};
