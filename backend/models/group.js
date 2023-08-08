const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database')

const Group = sequelize.define('group',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    groupName: {
		type: DataTypes.STRING,
	},
	createdBy:{
		type:DataTypes.INTEGER
	} 

})

module.exports = Group