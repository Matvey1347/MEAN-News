const News = require('../models/News');
const User = require('../models/User');
const Category = require('../models/Category');
const errorHandler = require('../utils/errorHandler');


module.exports.create = async function (req, res) {
  try {
    const autor = await User.findOne({ _id: req.body.autor, role: 'autor' });
    if (autor) {
      const news = await new News({
        title: req.body.title,
        imageSrc: req.file ? req.file.path : (req.body.url) ? req.body.url : '',
        list: [...req.body.list],
        category: req.body.category,
        autor: req.body.autor,
        comments: []
      }).save();
      res.status(201).json(news);
    } else {
      res.status(409).json({
        message: 'You aren\'t autor!'
      })
    }
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.update = async function (req, res) {
  let autor;
  if (req.body.autor) {
    autor = await User.findById(req.body.autor.toString());
  }

  let sendComments =
    (autor) ? { autor, message: req.body.message } :
    { autor: { name: 'anonimus', imageSrc: '' }, message: req.body.message };

  const updated = {
    comments: sendComments
  }

  try {
    const news = await News.findOneAndUpdate(
      { _id: req.params.id },
      { $push: updated },
      { new: true }
    )
    res.status(201).json(news)
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.getAll = async function (req, res) {
  try {
    const news = await News.find();
    res.status(200).json(news)
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.getById = async function (req, res) {
  try {
    const news = await News.findById(req.params.id);
    const category = await Category.findById(news.category);
    const autor = await User.findById(news.autor);
    res.status(200).json({ ...news._doc, category, autor });
  } catch (e) {
    errorHandler(res, e)
  }
};