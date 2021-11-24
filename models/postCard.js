import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    status: String,
    gender: String,
    species: String,
    image: String,
})

var postCard = mongoose.model('postCard',postSchema);

export default postCard;