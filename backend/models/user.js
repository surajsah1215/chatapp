const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database')

const User = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    name: DataTypes.STRING,
    email: {
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    pass: DataTypes.STRING,
    phone:DataTypes.STRING


})

module.exports = User