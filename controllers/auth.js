const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys.dev')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function (req, res) {
  const candidateUserName = await User.findOne({ name: req.body.name });


  if (candidateUserName) {
    const passwordResult = bcryptjs.compareSync(req.body.password, candidateUserName.password)
    if (passwordResult) {
      const token = jwt.sign({
        userId: candidateUserName._id
      }, keys.jwt, { expiresIn: 60 * 60 })

      res.status(200).json({
        token: `Bearer ${token}`,
        user: {
          ...candidateUserName._doc
        }
      })
    } else {
      res.status(401).json({
        message: 'Password is uncorrect! Try again :)'
      })
    }
  } else {
    res.status(404).json({
      message: 'User with such name is not found'
    })
  }
}

module.exports.registration = async function (req, res) {
  const candidateEmail = await User.findOne({ email: req.body.email });
  const candidateUserName = await User.findOne({ name: req.body.name });

  if (!candidateEmail && !candidateUserName) {
    const saltjs = bcryptjs.genSaltSync(10)
    const password = req.body.password;
    const hash = bcryptjs.hashSync(password, saltjs);
    const data = {
      email: req.body.email,
      password: hash,
      name: req.body.name,
      role: req.body.role,
      imageSrc: (req.file) ? req.file.path : (req.body.url) ? req.body.url : ''
    };

    const user = new User(data);

    try {
      await user.save();
      res.status(201).json({ user });
    } catch (e) {
      errorHandler(res, e)
    }
  } else {
    if (candidateEmail) {
      res.status(409).json({
        message: 'This email has already used!'
      })
    } else if (candidateUserName) {
      res.status(409).json({
        message: 'This name has already used!'
      })
    }
  }
}