const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const Project = require('./projectModel');

const Task = sequelize.define('Task', {
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
    parentId: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    creatorId: {
        type: DataTypes.BIGINT,
        references: {
            type: DataTypes.BIGINT,
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    visibility: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    tableName: "Task",
    timestamps: true,
  }
);

module.exports = Task;
