const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const name = process.env.DB_NAME
const password = process.env.DB_PASSWORD
const user = process.env.DB_USER
const host = process.env.DB_HOST

const sequelize = new Sequelize(name, user, password, {
    host: host,
    dialect: 'postgres'
})

const connectDB = async () => {
    try{
    await sequelize.authenticate();
    console.log('DB connected');
}catch(err){
    console.log(err);
}
}

module.exports = {
    connectDB,
    sequelize
}