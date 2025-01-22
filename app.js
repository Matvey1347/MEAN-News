
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys.dev')

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const newsRoutes = require('./routes/news');
const autorRoutes = require('./routes/autor');
const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');

mongoose.set('strictQuery', true);
mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB connect'))
  .catch(error => console.log("MongoDB ", error))

app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/news', newsRoutes); 
app.use('/api/autor', autorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/feedback', feedbackRoutes);

module.exports = app;