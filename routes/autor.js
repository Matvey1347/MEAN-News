const express = require('express');
const router = express.Router();
const controller = require('../controllers/autor');

router.get('/:id', controller.getById);

module.exports = router;