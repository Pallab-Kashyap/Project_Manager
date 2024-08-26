const Users = require('./usersModel');
const UserInfo = require('./userInfoModel');
const StudentInfo = require('./studentModel');
const CompanyInfo = require('./companyModel');
const { sequelize } = require('../../config/db')

const sycnDB = async() => {
Users.hasOne(UserInfo, {foreignKey: "userId"})
UserInfo.belongsTo(Users, {foreignKey: "userId"})

UserInfo.hasOne(StudentInfo, { foreignKey: 'user_info_id' });
StudentInfo.belongsTo(UserInfo, { foreignKey: 'user_info_id' });

UserInfo.hasOne(CompanyInfo, { foreignKey: 'user_info_id' });
CompanyInfo.belongsTo(UserInfo, { foreignKey: 'user_info_id' });

 sequelize.sync({ alter: true })
    .then(() => console.log('s'))
    .catch((err) => console.log(err))
}

sycnDB()

module.exports = {
    Users,
    UserInfo,
    StudentInfo,
    CompanyInfo
}
