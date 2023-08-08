const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database')

const UserGroups = sequelize.define('UserGroups',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique:true,
        allowNull: false,
        primaryKey:true
    },
})

module.exports = UserGroups