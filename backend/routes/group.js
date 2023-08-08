// Dependencies
const express = require('express');
const router = express.Router();

const userAuthentication = require('../midleware/auth')
const createNewGroup = require('../controllers/group')

router.post('/groups',userAuthentication.verifyToken,createNewGroup.createNewGroups)


module.exports = router