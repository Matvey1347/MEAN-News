const Category = require('../models/Category')
const News = require('../models/News')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')


module.exports.create = async function (req, res) {
  const category = new Category({
    name: req.body.name
  })

  try {
    await category.save();
    res.status(201).json({
      message: 'New category has been created :)'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getAll = async function (req, res) {
  try {
    let user;
    let userSubscriptions = [];

    console.log(req.params.user_id)
    if (req.params.user_id) {
      user = await User.findById(req.params.user_id);
      console.log(user.subscriptions)
      userSubscriptions = user.subscriptions;
      console.log(user._doc)
    }

    const categories = await Category.find();
    const data = [];
    for (let i = 0; i < categories.length; i++) {
      console.log('userSubscriptions', userSubscriptions)
      const hasSubsctiptionToThisCategory = !!userSubscriptions.find(category_id =>  category_id === categories[i]._id.toString());
      const news = await News.find({ category: categories[i]._id.toString() });
      data.push({ ...categories[i]._doc, subscribe: (req.params.user_id) ? hasSubsctiptionToThisCategory : false, news })
    }
    res.status(200).json(data)
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.getAllName = async function (req, res) {
  try {
    const categories = await Category.find().limit(+req.query.limit);;
    const categoriesName = [];
    
    categories.forEach((category) => {
      categoriesName.push({ name: category.name, id: category._id });
    })

    res.status(200).json(categoriesName)
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id);
    const data = [];
    const news = await News.find({ category: req.params.id });
    data.push({ ...category._doc, news })
    res.status(200).json({...category._doc, news})
  } catch (e) {
    errorHandler(res, e)
  }
}