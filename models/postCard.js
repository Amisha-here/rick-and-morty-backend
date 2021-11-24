const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    name: String,
    status: String,
    gender: String,
    species: String,
    image: String,
})

var postCard = mongoose.model('postCard',postSchema);

module.exports = postCard;
