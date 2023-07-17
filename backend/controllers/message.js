const Message = require('../models/message')
const User = require('../models/user')

exports.messageSent = async(req,res,next)=>{
    try{
        const message = req.body.mess
        const messagExist = await Message.findOne({where:{userId:req.user.id}})
        if(messagExist){
            const response = await Message.update({message:message},{where:{userId:req.user.id}})
            return res.status(200).json({message:'updated',res:response})
        }
        else{
            const response = await Message.create({
            message:message,
            userId : req.user.id
            })
            return res.status(200).json({res:response})
        }
        
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:'message not sent'})
    }

}