const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  saved: [{
    type: ObjectId,
    ref: "postCard"
  }],
});

module.exports = mongoose.model("User", userSchema);