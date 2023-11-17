//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  name: String,
  type: String,
});

const Post = mongoose.model('Post', SomeModelSchema);

module.exports = Post;
