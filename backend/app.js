const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
    origin:'http://127.0.0.1:5500'
}));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

const sequelize = require('./util/database');
const User = require('./models/user')
const Message  = require('./models/message')

const userRoute = require('./routes/user')
app.use(userRoute)

User.hasMany(Message)
Message.belongsTo(User)


sequelize.sync()
 .then((response)=>app.listen(process.env.PORT||3000))
 .catch(err=>console.log(err))
