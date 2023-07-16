const User = require('../models/user')
const bcrypt = require("bcrypt")
const helper = require('./helper')



exports.PostSignUp = async(req,res,next)=>{
    try{
       

    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const pass  = req.body.pass

    const emailExists = await User.findOne({ where: { email: email } });
    if (emailExists ) {
      return res.status(500).json("Email already registered")
    }
    const saltRounds = 10
    bcrypt.genSalt(saltRounds).then(salt=>{
        return bcrypt.hash(pass,salt)
    }).then(hash =>{
        const data =  User.create({
            name:name,
            email:email, 
            phone:phone,
            pass:hash
        })
        res.status(201).json({user:data})
    }).catch(err=>{console.log(err.message)})
    
}catch(err){
    console.log(err)
}

}


exports.PostLogin = async (req,res,next)=>{
    try{
    const email = req.body.email
    const pass = req.body.pass

    const emailExist = await User.findOne({where:{email:email}})
    if(emailExist){
        bcrypt.compare(pass,emailExist.pass,function(err,response){
            if(err){
                return res.json({success: false, message: 'something went wrong'})
            }
            if(response){
                const token = helper.generateAccessToken(emailExist.id)// for converting userid in to hashvalue
               return res.status(200).json({"message": "login succesfully",token:token})
            }
            else{
                return res.status(401).json({"message":"password inncorect"})
            }
        })
        
    }
    else{
        return res.status(404).json({"message":"user not found"})
    }    
}catch(err){
        console.log(err)
    }
}
