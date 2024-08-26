const Users = require('../userModels/usersModel');

const { sequelize } = require('../../config/db');
const Project = require('./projectModel');
const ProjectMember = require('./projectMemberModel');
const Task = require('./taskModel');
const TaskMember = require('./taskMemberModel');
const Comment = require('./commentModel');

const sycnDB = async() => {

Users.hasMany(Project, { foreignKey: 'creator_id' });
Project.belongsTo(Users, { foreignKey: 'creator_id' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

Task.hasMany(Comment, { foreignKey: 'task_id' });
Comment.belongsTo(Task, { foreignKey: 'task_id' });

Task.hasMany(TaskMember, { foreignKey: 'task_id' });
TaskMember.belongsTo(Task, { foreignKey: 'task_id' });

Project.hasMany(ProjectMember, { foreignKey: 'project_id' });
ProjectMember.belongsTo(Project, { foreignKey: 'project_id' });

Users.hasMany(ProjectMember, { foreignKey: 'Users_id' });
ProjectMember.belongsTo(Users, { foreignKey: 'Users_id' });

Users.hasMany(TaskMember, { foreignKey: 'member_id' });
TaskMember.belongsTo(Users, { foreignKey: 'member_id' });

Task.belongsTo(Task, { as: 'parent', foreignKey: 'parent_id', onDelete: 'CASCADE' });

await sequelize.sync({ alter: true });
}

// sycnDB()

module.exports = {
    Project,
    ProjectMember,
    Task,
    TaskMember,
    Comment
}


