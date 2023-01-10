const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'autor', 'admin'],
    default: 'user'
  },
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      default: ''
    }
  ]
});

module.exports = mongoose.model('users', userSchema)