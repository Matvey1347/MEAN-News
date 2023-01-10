const express = require('express');
const router = express.Router();
// const passport = require('passport');
const controller = require('../controllers/category');
// const upload = require('../middleware/upload');
//  passport.authenticate('jwt', { session: false }), 

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/user/:user_id', controller.getAll);
router.get('/name', controller.getAllName);
router.get('/:id', controller.getById);

module.exports = router;