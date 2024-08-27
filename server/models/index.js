const { sequelize } = require('../config/db')
const Users = require('./userModels/usersModel');
const UserInfo = require('./userModels/userInfoModel');
const StudentInfo = require('./userModels/studentModel');
const CompanyInfo = require('./userModels/companyModel');
const Project = require('./projectModels/projectModel');
const ProjectMember = require('./projectModels/projectMemberModel');
const Task = require('./projectModels/taskModel');
const TaskMember = require('./projectModels/taskMemberModel');
const Comment = require('./projectModels/commentModel');

const sycnDB = async() => {
    
Users.hasOne(UserInfo, {foreignKey: "userId"})
UserInfo.belongsTo(Users, {foreignKey: "userId"})

UserInfo.hasOne(StudentInfo, { foreignKey: 'user_info_id' });
StudentInfo.belongsTo(UserInfo, { foreignKey: 'user_info_id' });

UserInfo.hasOne(CompanyInfo, { foreignKey: 'user_info_id' });
CompanyInfo.belongsTo(UserInfo, { foreignKey: 'user_info_id' });

Users.hasMany(Project, { foreignKey: 'creator_id' });
Project.belongsTo(Users, { foreignKey: 'creator_id' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

Task.hasMany(Comment, { foreignKey: 'task_id' });
Comment.belongsTo(Task, { foreignKey: 'task_id' });

Users.hasMany(Comment, { foreignKey: 'task_id' });
Comment.belongsTo(Users, { foreignKey: 'task_id' });

Task.hasMany(TaskMember, { foreignKey: 'task_id' });
TaskMember.belongsTo(Task, { foreignKey: 'task_id' });

Project.hasMany(ProjectMember, { foreignKey: 'project_id' });
ProjectMember.belongsTo(Project, { foreignKey: 'project_id' });

Users.hasMany(ProjectMember, { foreignKey: 'Users_id' });
ProjectMember.belongsTo(Users, { foreignKey: 'Users_id' });

Users.hasMany(TaskMember, { foreignKey: 'member_id' });
TaskMember.belongsTo(Users, { foreignKey: 'member_id' });

Task.belongsTo(Task, { as: 'parent', foreignKey: 'parent_id', onDelete: 'CASCADE' });

sequelize.sync({ alter: true })

}

module.exports = {
    Users,
    UserInfo,
    StudentInfo,
    CompanyInfo,
    Project,
    ProjectMember,
    Task,
    TaskMember,
    Comment,
    sycnDB
}
