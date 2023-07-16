const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.generateAccessToken = function(id){
    const secretKey = process.env.TOKEN
    return jwt.sign({id},`${secretKey}`)
}