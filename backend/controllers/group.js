const Group = require("../models/group")
const UserGroups = require("../models/usergroup")



exports.createNewGroups = async(req,res,next)=>{
    try{
        console.log('bodyy//////',req.body.userId)
        console.log('user??',req.user.id)
        const result = await Group.create({groupName:req.body.groupName, createdBy:req.user.id})
        await UserGroups.create({groupId:result.id,userId:req.user.id})
        res.status(201).json({msg:"group created"})
    }
    catch(err){
        console.log(err)
        res.status(401).json({msg:"group cannot be creaated"})
    }
}

