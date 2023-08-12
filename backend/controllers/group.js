const Group = require("../models/group")
const UserGroups = require("../models/usergroup")
const User = require("../models/user")
const Message = require("../models/message")



exports.createNewGroups = async(req,res,next)=>{
    try{
        // console.log('bodyy//////',req.body.userId)
        // console.log('user??',req.user.id)
        const result = await Group.create({groupName:req.body.groupName, createdBy:req.user.id})
        await UserGroups.create({groupId:result.id,userId:req.user.id})
        res.status(201).json({msg:"group created"})
    }
    catch(err){
        console.log(err)
        res.status(401).json({msg:"group cannot be creaated"})
    }
}

 exports.getAllGroups = async(req, res, next)=>{
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		const groups = await user.getGroups();

		res.status(201).json(groups);
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: "cannot get groups", err: error });
	}
}

exports.addMember = async(req,res,next)=>{
    try{
        const member = await User.findOne({where:{email:req.body.memberEmail}}) 
        const group = await Group.findOne({where:{id:req.body.groupid}})
        if (!member) {
			return res.status(404).json({ msg: "no user with this email" });
		}

        let memberId = member.id;
		const isMember = await member.hasGroups(group); // whether to find user is associated with group throug userGroup
            // const userGroupAssociation  = await UserGroups.findOne({where:{groupId:group.id,userId:member.id}}) 
                // alternative way to find relationship whether user has relationship with group through UserGroup or Alternative of hasGroup function 
            // const isMember = !!userGroupAssociation //// it will convert to boolean of above value
		if (isMember) {
			return res.status(404).json({ msg: "user is already presesnt in group" });
		}
        // console.log(req.body.groupId)
        await UserGroups.create({ groupId: req.body.groupid, userId: memberId });

        res.status(201).json({msg:"member Added"})        
    }
    catch(error){
        console.log(error)
        res.status(404).json({ msg: "some error occured ,please try again", err: error });

    }
}

exports.kickMember = async(req,res,next)=>{
    try{
        const member = await User.findOne({where:{email: req.body.memberEmail}})
        const group = await Group.findOne({where:{id:req.body.groupid}})
        //   const isCreatedBy = Group.findOne({where:{id:req.body.groupid}})
        console.log(group)
        if(!member){
           return res.json({msg:"no user with this email"})
        }
        const isMember = await member.hasGroups(group)
        if(!isMember){
           return res.json({msg:"This is Email is not present in this group"})
        }
        await UserGroups.destroy({where:{groupId:req.body.groupid,userId:member.id}})
        return res.status(201).json({ msg: "member kicked out" });
    }
    catch(error){
        console.log(error)
        res.status(400).json({ msg: "some error occured while kicking out" });
    }
}

exports.deleteGroup = async(req,res,next)=>{
    try{
        const {id} = req.params
        const group = await Group.findOne({where:{id:id}})
        const isCreatedBy = await Group.findOne({where:{id:id, createdBy:group.createdBy}})
        console.log(isCreatedBy)
        if(!isCreatedBy){
            return res.status(201).json({msg:"This group is not created By You"})
        }
        await Group.destroy({
			where: { id: id },
		});

		await UserGroups.destroy({
			where: { groupId: id },
		});

		await Message.destroy({
			where: { groupId: id },
		});
        return res.status(201).json({msg:"Group Deleted Succesfully"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({ msg: "some error occured, please try again", err: error });
    }
}


exports.changeAdmin = async(req,res,next)=>{
    try {
		let member = await User.findOne({ where: { email: req.body.memberEmail } });
		let group = await Group.findOne({ where: { id: req.body.groupid } });
		if (!member) {
			return res.status(404).json({ msg: "no user with this email" });
		}
		let memberId = member.id;
		const isMember = await member.hasGroups(group);
		if (!isMember) {
			return res.status(404).json({ msg: "before making him admin add him to the group" });
		}
		await Group.update({ createdBy: memberId }, { where: { id: req.body.groupid } });
		res.status(201).json({ msg: "you are no longer an admin" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "some error occured, please try again", err: error });
	}
}