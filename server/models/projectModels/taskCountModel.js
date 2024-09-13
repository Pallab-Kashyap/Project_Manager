const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Project = require("./projectModel");


const TaskCount = sequelize.define('TaskCount', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    projectId: {
        type: DataTypes.BIGINT,
        references: {
            model: Project,
            key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: true,
    },
    totalTask: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    completedTask: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
},
{
    tableName: 'TaskCount',
    timestamps: true,
})

module.exports = TaskCount