const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: ''
  },
  list: [
    String
  ],
  comments: [
    {
      autor: {
        name: {
          type: String
        },
        imageSrc: {
          type: String
        }
      },
      message: String
    }
  ],
  category: {
    ref: 'categories',
    type: Schema.Types.ObjectId
  },
  autor: {
    ref: 'user',
    type: Schema.Types.ObjectId
  },
})

module.exports = mongoose.model('news', newsSchema);