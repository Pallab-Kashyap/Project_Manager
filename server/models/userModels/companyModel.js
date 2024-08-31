const { sequelize } = require("../../config/db");
const { Sequelize, DataTypes } = require("sequelize"); // Assuming you have your Sequelize instance defined in a database file
const UserInfo = require('./userInfoModel');  // Import the UserInfo model

const CompanyInfo = sequelize.define('CompanyInfo', {
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
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companySize: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'CompanyInfo', // Explicit table name
  timestamps: true          // Optional: Add createdAt and updatedAt fields
});


module.exports = CompanyInfo;