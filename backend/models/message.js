const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database')

const Message = sequelize.define('message',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    message: DataTypes.STRING,
    name:{
        type:DataTypes.STRING
    },
    type:{
        type:DataTypes.STRING
    }


})

module.exports = Message