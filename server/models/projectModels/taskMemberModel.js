const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const User = require('../userModels/usersModel');
const { MEMBER_POSITION } = require('../../utils/constant');
const Task = require('./taskModel');

const TaskMember = sequelize.define('TaskMember', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    task_id: {
        type: DataTypes.BIGINT,
        type: DataTypes.BIGINT,
        references: {
            model: Task, // Name of the model being referenced
            key: 'id'       // Primary key in the UserInfo table
          },
          onDelete: 'CASCADE',
        allowNull: false,
    },
    user_id: {
        type: DataTypes.BIGINT,
        references: {
            model: User, 
            key: 'id'   
          },
          onDelete: 'CASCADE',
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        defaultValue: MEMBER_POSITION.MEMBER,
        allowNull: false,
    },
},
{
    tableName: "TaskMember",
    timestamps: true,
  }
);

module.exports = TaskMember;