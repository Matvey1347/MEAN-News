const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const upload = require('../middleware/upload');

router.post('/login', upload.single('image'), controller.login);
router.post('/registration', upload.single('image'), controller.registration);

module.exports = router;