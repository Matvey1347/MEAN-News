
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

// const passport = require('passport')
// const path = require('path')
// const authRoutes = require('./routes/auth');
// const analyticsRoutes = require('./routes/analytics');
// const categoryRoutes = require('./routes/category');
// const orderRoutes = require('./routes/order');
// const positionRoutes = require('./routes/position');
// const frilanceRouters = require('./routes/frilanceRouters');
mongoose.set('strictQuery', true);
mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB connect'))
  .catch(error => console.log(error))
// app.use(passport.initialize())
// require('./middleware/passport')(passport)

app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());
app.use(require('morgan')('dev'));


// app.use('/api/auth', authRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/order', orderRoutes);
// app.use('/api/position', positionRoutes);
// app.use('/api/frilance', frilanceRouters);


app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/news', newsRoutes); 
app.use('/api/autor', autorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/feedback', feedbackRoutes);
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/dist/client'));

//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(
//         __dirname, 'client', 'dist', 'client', 'index.html'
//       )
//     )
//   })
// }

module.exports = app;