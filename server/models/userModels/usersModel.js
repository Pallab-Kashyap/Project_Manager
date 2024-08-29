const { sequelize } = require("../../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "all fields required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'email already exists'
      },
      validate: {
        notNull: {
          msg: "all fields required",
        },
        isEmail: {
          msg: "Please provide a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "all fields required",
        },
      },
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = Users;
