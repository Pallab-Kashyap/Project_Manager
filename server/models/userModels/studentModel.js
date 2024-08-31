const { sequelize } = require("../../config/db");
const { Sequelize, DataTypes } = require("sequelize"); // Assuming you have your Sequelize instance defined in a database file
const UserInfo = require('./userInfoModel');  // Import the UserInfo model

const StudentInfo = sequelize.define('StudentInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userInfoId: {
      type: DataTypes.INTEGER,
        references: {
          model: UserInfo, // Name of the model being referenced
          key: 'id'       // Primary key in the UserInfo table
        },
        onDelete: 'CASCADE', // Optional: If a user is deleted, delete related student info
        onUpdate: 'CASCADE'  // Optional: Update userId in student info when it's updated in the users table
      },
  instituteName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stream: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'StudentInfo', // Explicit table name
  timestamps: true          // Optional: Add createdAt and updatedAt fields
});

module.exports = StudentInfo;
