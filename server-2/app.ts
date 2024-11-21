import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db';
import userModel from './models/userModel';

const app = express();

dotenv.config()
connectDB()

app.get('/', async(req, res) => {
    res.send('up')
})

const PORT : string | number = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`server started and port: ${PORT}`)})