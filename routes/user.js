const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.patch('/:id', controller.subscribe);

module.exports = router;