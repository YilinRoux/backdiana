const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const upload = require('../config/multerConfig');

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/', imageController.getImages);

module.exports = router;