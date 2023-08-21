const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
app.use(cors());

const socketIO = require("./sockets/socket");
socketIO(io);


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

const sequelize = require('./util/database');
const User = require('./models/user')
const Message  = require('./models/message')
const Group = require('./models/group')

const userRoute = require('./routes/user')
const groupRoute = require('./routes/group')
const chatsRoute = require("./routes/chat");


app.use(userRoute)
app.use(groupRoute)
app.use(chatsRoute)

User.hasMany(Message)
Message.belongsTo(User)

Group.belongsToMany(User, { through: "UserGroups" });
User.belongsToMany(Group, { through: "UserGroups" });

Group.hasMany(Message)
Message.belongsTo(Group)


sequelize.sync()
 .then((response)=>http.listen(process.env.PORT||3000))
 .catch(err=>console.log(err))
