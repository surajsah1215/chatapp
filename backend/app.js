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
const Group = require('./models/group')

const userRoute = require('./routes/user')
const groupRoute = require('./routes/group')

app.use(userRoute)
app.use(groupRoute)

User.hasMany(Message)
Message.belongsTo(User)

Group.belongsToMany(User, { through: "UserGroups" });
User.belongsToMany(Group, { through: "UserGroups" });

Group.hasMany(Message)
Message.belongsTo(Group)


sequelize.sync()
 .then((response)=>app.listen(process.env.PORT||3000))
 .catch(err=>console.log(err))
