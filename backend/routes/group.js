// Dependencies
const express = require('express');
const router = express.Router();

const userAuthentication = require('../midleware/auth')
const group = require('../controllers/group')

router.post('/groups',userAuthentication.verifyToken,group.createNewGroups)
router.get('/groups',userAuthentication.verifyToken,group.getAllGroups)
router.post('/groups/addmembers',userAuthentication.verifyToken,group.addMember)
router.post('/groups/kickmembers',group.kickMember)
router.delete('/groups/deleteGroup/:id',userAuthentication.verifyToken,group.deleteGroup)
router.patch('/groups/promoteAdmin',group.changeAdmin)

module.exports = router