const Feedback = require('../models/Feedback')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.create = async function (req, res) {
  const feedback = new Feedback({
    message: req.body.message,
    userName: (req.body.userName) ? req.body.userName : 'anonimus'
  });

  try {
    await feedback.save();
    res.status(201).json({
      message: 'Your feedback has been successfully send :)'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getAll = async function (req, res) {
  const feedback = await Feedback.find();
  try {
    res.status(201).json(feedback)
  } catch (e) {
    errorHandler(res, e)
  }
}