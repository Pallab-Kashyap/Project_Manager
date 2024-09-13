const { sequelize } = require('../config/db')
const User = require('./userModels/userModel');
const Task = require('./projectModels/taskModel');
const UserInfo = require('./userModels/userInfoModel');
const Comment = require('./projectModels/commentModel');
const Project = require('./projectModels/projectModel');
const CompanyInfo = require('./userModels/companyModel');
const StudentInfo = require('./userModels/studentModel');
const TaskCount = require('./projectModels/taskCountModel')
const TaskMember = require('./projectModels/taskMemberModel');
const ProjectMember = require('./projectModels/projectMemberModel');

const sycnDB = async() => {

User.hasOne(UserInfo, {foreignKey: "userId"})
UserInfo.belongsTo(User, {foreignKey: "userId"})

UserInfo.hasOne(StudentInfo, { foreignKey: 'userInfoId' });
StudentInfo.belongsTo(UserInfo, { foreignKey: 'userInfoId' });

UserInfo.hasOne(CompanyInfo, { foreignKey: 'userInfoId' });
CompanyInfo.belongsTo(UserInfo, { foreignKey: 'userInfoId' });

User.hasMany(Project, { foreignKey: 'creatorId' });
Project.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

User.hasMany(ProjectMember, { foreignKey: 'userId' });
ProjectMember.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(ProjectMember, { foreignKey: 'projectId' });
ProjectMember.belongsTo(Project, { foreignKey: 'projectId' });

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

Task.hasMany(Comment, { foreignKey: 'taskId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });

User.hasMany(Comment, { foreignKey: 'creatorId' });
Comment.belongsTo(User, { foreignKey: 'creatorId' });

Task.hasMany(TaskMember, { foreignKey: 'taskId' });
TaskMember.belongsTo(Task, { foreignKey: 'taskId' });

User.hasMany(Task, {foreignKey: 'creatorId'})
Task.belongsTo(User, {as: 'creator', foreignKey: 'creatorId'})

User.hasMany(TaskMember, { foreignKey: 'userId' });
TaskMember.belongsTo(User, { foreignKey: 'userId' });

Project.hasOne(TaskCount, { foreignKey: 'projectId'})
TaskCount.belongsTo(Project, { foreignKey: 'projectId'})

Task.belongsTo(Task, { as: 'parent', foreignKey: 'parentId', onDelete: 'CASCADE' });

await sequelize.sync({ alter: true })

}

module.exports = {
    User,
    UserInfo,
    StudentInfo,
    CompanyInfo,
    Project,
    ProjectMember,
    Task,
    TaskMember,
    Comment,
    TaskCount,
    sycnDB
}
