const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const User = require('../userModels/userModel');
const { MEMBER_POSITION } = require('../../utils/constant');
const Project = require('./projectModel');

const ProjectMember = sequelize.define('ProjectMember', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    projectId: {
        type: DataTypes.BIGINT,
        references: {
            model: Project, 
            key: 'id'      
          },
          onDelete: 'CASCADE',
        allowNull: false,
    },
    userId: {
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
    access: {
        type: DataTypes.BOOLEAN,
        // defaultValue: false,
    },
    completedTaks: {
        type: DataTypes.INTEGER,
    }
},
{
    tableName: "ProjectMember",
    timestamps: true,
  }
);

module.exports = ProjectMember;