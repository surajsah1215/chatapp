const express = require('express')

const router = express.Router();

const userControler = require('../controllers/user')
const messaControler = require('../controllers/message')
const userAuthentication = require('../midleware/auth')


router.post('/signup',userControler.PostSignUp)
router.post('/login',userControler.PostLogin)

router.post('/messageSend',userAuthentication.verifyToken,messaControler.messageSent)


module.exports = router