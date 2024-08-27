const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const User = require('../userModels/usersModel');
const { MEMBER_POSITION } = require('../../utils/constant');
const Project = require('./projectModel');

const ProjectMember = sequelize.define('ProjectMember', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    project_id: {
        type: DataTypes.BIGINT,
        references: {
            model: Project, // Name of the model being referenced
            key: 'id'       // Primary key in the UserInfo table
          },
          onDelete: 'CASCADE',
        allowNull: false,
    },
    user_id: {
        type: DataTypes.BIGINT,
        references: {
            model: User, // Name of the model being referenced
            key: 'id'       // Primary key in the UserInfo table
          },
          onDelete: 'CASCADE',
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        defaultValue: MEMBER_POSITION.MEMBER,
        allowNull: false,
    },
    access: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
{
    tableName: "ProjectMember",
    timestamps: true,
  }
);

module.exports = ProjectMember;