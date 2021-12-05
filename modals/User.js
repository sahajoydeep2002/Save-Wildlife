const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.mongoURI , {useNewUrlParser : true , useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    nickname : String,
    age : Number,
    googleId : String,
    email : String,
    animalId : String,
    avatar : String,
    hasAnimal : Boolean,
});

const User = mongoose.model('user' , userSchema);
module.exports = {User};