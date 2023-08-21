const express = require('express');
const router = express.Router();

const userAuthentication = require('../midleware/auth')
const messages = require('../controllers/message')
const upload = require('../midleware/fileUpload')

router.post('/chat', userAuthentication.verifyToken, messages.addMsg);
router.get('/chat/:groupId', userAuthentication.verifyToken, messages.getPrevChat);
router.post('/upload/:groupId', upload.fileupload, userAuthentication.verifyToken, messages.uploadFile);


module.exports = router;
