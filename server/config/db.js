const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const name = process.env.DB_NAME
const password = process.env.DB_PASSWORD
const user = process.env.DB_USER
const host = process.env.DB_HOST

const sequelize = new Sequelize(name, user, password, {
    host: host,
    dialect: 'postgres',
    logging: false
})

const connectDB = async () => {
    try{
    await sequelize.authenticate();
    console.log('DB connected');
}catch(err){
    console.log(err);
    console.log('DB connection failed, re-trying to connect');
    await connectDB()
}
}

module.exports = {
    connectDB,
    sequelize
}