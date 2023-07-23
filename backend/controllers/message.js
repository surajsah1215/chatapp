const Message = require('../models/message')
const User = require('../models/user')

exports.messageSent = async(req,res,next)=>{
    try{
        const message = req.body.mess
        const messagExist = await Message.findOne({where:{userId:req.user.id}})
        // if(messagExist){
        //     const response = await Message.update({message:message},{where:{userId:req.user.id}})
        //     return res.status(200).json({message:'updated',res:response})
        // }
        // else{
            const response = await Message.create({
            message:message,
            userId : req.user.id
            })
            return res.status(200).json({res:response})
        // }
        
    }
    catch(err){
        console.log(err)
        res.status(404).json({message:'message not sent'})
    }

}


exports.getMessages = async(req,res,next)=>{
    try{
        const messages = await Message.findAll({
            include: [{ model: User, attributes: ['name'] }],
          });
          const messagesWithUserName = messages.map((message) => {
            return {
              id: message.id,
              text: message.message,
              userName: message.user.name,
            };
          });   
        if (res && typeof res === 'object' && res.json) {
            return res.json(messagesWithUserName);
          } else {
            console.error('Invalid response object:', res);
            return res.send('Invalid response object');
          } 
    }
    catch(err){
    
    return res.status(500).json({ error: 'Server error' });
   
  }

    
}