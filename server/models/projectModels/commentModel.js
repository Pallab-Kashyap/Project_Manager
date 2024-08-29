const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const User = require('../userModels/usersModel');
const { MEMBER_POSITION } = require('../../utils/constant');
const Task = require('./taskModel');

const Comment = sequelize.define('Comment', {
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
    creator_id: {
        type: DataTypes.BIGINT,
        references: {
            model: User, // Name of the model being referenced
            key: 'id'       // Primary key in the UserInfo table
          },
          onDelete: 'CASCADE',
        allowNull: false,
    },
},
{
    tableName: "Comment",
    timestamps: true,
  }
);

module.exports = Comment;