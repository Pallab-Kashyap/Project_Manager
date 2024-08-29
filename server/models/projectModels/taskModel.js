const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db");
const Project = require('./projectModel');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    project_id: {
        type: DataTypes.BIGINT,
        references: {
            model: Project, 
            key: 'id'       
          },
          onDelete: 'CASCADE', 
        allowNull: false,
    },
    parent_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    creator_id: {
        type: DataTypes.BIGINT,
        references: {
            type: DataTypes.BIGINT,
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    task_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    task_visibility: {
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
