const User = require('../models/User')
const News = require('../models/News')
const errorHandler = require('../utils/errorHandler')

module.exports.getById = async function (req, res) {
  const autor = await User.findOne({ _id: req.params.id })
  const news = await News.find({ autor: req.params.id });
  try {
    res.status(201).json({ ...autor._doc, news })
  } catch (e) {
    errorHandler(res, e)
  }
}