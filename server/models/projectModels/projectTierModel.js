const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const User = require('../userModels/userModel');


const ProjectTier = sequelize.define('ProjectTier', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    tier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    free: {
        type: DataTypes.BIGINT,
        references: {
            model: User, // Name of the model being referenced
            key: 'id'       // Primary key in the UserInfo table
          },
          onDelete: 'CASCADE', // Optional: If a user is deleted, delete related student info
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    leader_board: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    project_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pack: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    tableName: "ProjectTier",
    timestamps: true,
  }
);

module.exports = ProjectTier;

