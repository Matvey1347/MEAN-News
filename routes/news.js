const express = require('express');
const router = express.Router();
const controller = require('../controllers/news');
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), controller.create);
router.patch('/:id', upload.single('image'), controller.update);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;