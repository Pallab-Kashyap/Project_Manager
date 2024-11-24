import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, urlencoded } from 'express'
import connectDB from './config/dbConfig';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRouter from './routes/authRoute'
import userRouter from './routes/userRoute'
import projectRouter from './routes/projectRoute'
import taskRouter from './routes/taskRoute'
import memberRouter from './routes/memberRoutes'
import docRouter from './routes/docRoute'

import { globalErrorHandler } from './middlewares/globalErrorHandler';
import passport from './services/Oauth'
import session from 'express-session';
import { getEnvVariable } from './utils/getEnvVariable';




const app = express();


connectDB()

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json({ limit: '1mb'}))
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/', (req: Request, res: Response) => { res.status(200).send("<a href='/auth/google/login'>login<a> / <a href='/auth/google/signin'>signin<a>") })
app.get('/auth/google/login', passport.authenticate('google', { scope: ['profile', 'email'], state: 'login' }))
app.get('/auth/google/signin', passport.authenticate('google', { scope: ['profile', 'email'], state: 'signin' }))
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: "/" }), (req: Request, res: Response) => {
    res.redirect('/profile')
})
app.get('/profile', (req: Request, res: Response) => {
    console.log(req.user);
    res.send('hello')
})


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/project', projectRouter)
app.use('/api/v1/task', taskRouter)
app.use('/api/v1/member', memberRouter)
app.use('/upload', docRouter)

app.use(globalErrorHandler)

const PORT : string | number = getEnvVariable('PORT')

app.listen(PORT, () => { console.log(`server started and port: ${PORT}`)})