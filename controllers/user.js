const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.subscribe = async function (req, res) {
  const updated = {
    subscriptions: req.body.category_id
  }

  const candidate = await User.findById(req.params.id);
  console.log(candidate)
  let hasAlreadySubscribe = !!candidate.subscriptions.find((category_id) => {
    console.log('category_id', category_id.toString());
    console.log('req.body.category_id', req.body.category_id);
    return category_id.toString() === req.body.category_id;
  });

  try {
    console.log('category_id', req.body)
    if (!hasAlreadySubscribe) {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: updated },
        { new: true }
      )
      res.status(201).json({
        message: 'Subscription successful :)'
      })
    } else {
      res.status(409).json({
        message: 'You can\'t subscribe to this category: you have been subscribed to this category !'
      })
    }
  } catch (e) {
    errorHandler(res, e)
  }
}