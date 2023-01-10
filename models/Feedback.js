const mongoose = require('mongoose');
const Schema = mongoose.Schema

const feedSchema = new Schema({
  userName: {
    type: String
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('feedback', feedSchema)