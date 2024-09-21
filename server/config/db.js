const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const name = process.env.DB_NAME
const password = process.env.DB_PASSWORD
const user = process.env.DB_USER
const host = process.env.DB_HOST

// const sequelize = new Sequelize(name, user, password, {
//     host: host,
//     dialect: 'postgres',
//     logging: false
// })

console.log(process.env.DB_URL);

const sequelize = new Sequelize(process.env.DB_URL)

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

// const connectDB = async (retries = 5, delay = 5000) => {
//     try {
//       await sequelize.authenticate();
//       console.log('DB connected successfully');
//     } catch (err) {
//       if (err.name === 'SequelizeConnectionRefusedError') {
//         console.error('DB connection refused, retrying...', err);
  

//         if (retries > 0) {
//           console.log(`Retries left: ${retries}, retrying in ${delay / 1000} seconds...`);
  
//           setTimeout(() => {
//             connectDB(retries - 1, delay); 
//           }, delay);
//         } else {
//           console.error('Failed to connect to the DB after multiple attempts. Exiting...');
//           process.exit(1); 
//         }
//       } else {
//         console.error('DB connection error, not retrying:', err);
//         process.exit(1);
//       }
//     }
//   };

module.exports = {
    connectDB,
    sequelize
}