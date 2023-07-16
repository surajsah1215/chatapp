const User = require('../models/user')
const bcrypt = require("bcrypt")


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