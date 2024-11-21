import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db';
import cors from 'cors'

import authRouter from './routes/authRoute'
import userRouter from './routes/userRoute'
import projectRouter from './routes/projectRoute'
import taskRouter from './routes/taskRoute'

const app = express();

dotenv.config()
connectDB()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/task', taskRouter)

const PORT : string | number = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`server started and port: ${PORT}`)})