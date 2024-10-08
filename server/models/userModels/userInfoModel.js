const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../../config/db')
const Users = require('./userModel')

const UserInfo = sequelize.define('UserInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
        references: {
          model: Users, // Name of the model being referenced
          key: 'id'       // Primary key in the UserInfo table
        },
        unique: true,
        onDelete: 'CASCADE', 
      },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "UserInfo",
    timestamps: true
})

module.exports = UserInfo