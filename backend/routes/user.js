const express = require('express')

const router = express.Router();

const userControler = require('../controllers/user')


router.post('/signup',userControler.PostSignUp)
router.post('/login',userControler.PostLogin)


module.exports = router